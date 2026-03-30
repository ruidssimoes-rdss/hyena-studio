import { create } from "zustand"
import { persist } from "zustand/middleware"
import { tokensToCssVars, cssVarsToStyleObject } from "@/tokens/css"
import {
  DEFAULT_DENSITY,
  DEFAULT_SPACING,
  DEFAULT_TYPOGRAPHY,
  DEFAULT_USER_COLORS,
  RADIUS_PRESETS,
} from "@/tokens/defaults"
import { generateTokenSet } from "@/tokens/generator"
import type {
  DensityLevel,
  RadiusPreset,
  SpacingTokens,
  TokenSet,
  TypographyTokens,
  UserColorInputs,
} from "@/tokens/types"
import { evaluate } from "@/rules/engine"
import type { RuleReport } from "@/rules/types"

// ------------------------------------------------------------------ //
// Store shape                                                          //
// ------------------------------------------------------------------ //

interface TokenState {
  // User inputs
  userColors: UserColorInputs
  radiusPreset: RadiusPreset
  spacing: SpacingTokens
  typography: TypographyTokens
  density: DensityLevel

  // Derived (computed on every input change)
  tokens: TokenSet
  cssVars: Record<string, string>
  styleObject: React.CSSProperties
  ruleReport: RuleReport

  // Actions
  setColors: (colors: UserColorInputs) => void
  setColor: (key: keyof UserColorInputs, value: string) => void
  setRadiusPreset: (preset: RadiusPreset) => void
  setSpacing: (spacing: SpacingTokens) => void
  setTypography: (typography: TypographyTokens) => void
  setDensity: (density: DensityLevel) => void
  resetAll: () => void
}

// ------------------------------------------------------------------ //
// Helpers                                                              //
// ------------------------------------------------------------------ //

function computeDerived(inputs: {
  colors: UserColorInputs
  radiusPreset: RadiusPreset
  spacing: SpacingTokens
  typography: TypographyTokens
  density: DensityLevel
}) {
  const tokens = generateTokenSet({
    colors: inputs.colors,
    radiusPreset: inputs.radiusPreset,
    spacing: inputs.spacing,
    typography: inputs.typography,
    density: inputs.density,
  })
  const cssVars = tokensToCssVars(tokens)
  const styleObject = cssVarsToStyleObject(cssVars)
  const ruleReport = evaluate(tokens)
  return { tokens, cssVars, styleObject, ruleReport }
}

const DEFAULT_INPUTS = {
  colors: DEFAULT_USER_COLORS,
  radiusPreset: "soft" as RadiusPreset,
  spacing: DEFAULT_SPACING,
  typography: DEFAULT_TYPOGRAPHY,
  density: DEFAULT_DENSITY,
}

const initialDerived = computeDerived({
  colors: DEFAULT_INPUTS.colors,
  radiusPreset: DEFAULT_INPUTS.radiusPreset,
  spacing: DEFAULT_INPUTS.spacing,
  typography: DEFAULT_INPUTS.typography,
  density: DEFAULT_INPUTS.density,
})

// ------------------------------------------------------------------ //
// Store                                                                //
// ------------------------------------------------------------------ //

export const useTokenStore = create<TokenState>()(
  persist(
    (set, get) => ({
      // User inputs
      userColors: DEFAULT_INPUTS.colors,
      radiusPreset: DEFAULT_INPUTS.radiusPreset,
      spacing: DEFAULT_INPUTS.spacing,
      typography: DEFAULT_INPUTS.typography,
      density: DEFAULT_INPUTS.density,

      // Derived
      ...initialDerived,

      // Actions
      setColors: (colors) => {
        const state = get()
        const derived = computeDerived({
          colors,
          radiusPreset: state.radiusPreset,
          spacing: state.spacing,
          typography: state.typography,
          density: state.density,
        })
        set({ userColors: colors, ...derived })
      },

      setColor: (key, value) => {
        const state = get()
        const colors = { ...state.userColors, [key]: value }
        const derived = computeDerived({
          colors,
          radiusPreset: state.radiusPreset,
          spacing: state.spacing,
          typography: state.typography,
          density: state.density,
        })
        set({ userColors: colors, ...derived })
      },

      setRadiusPreset: (preset) => {
        const state = get()
        const derived = computeDerived({
          colors: state.userColors,
          radiusPreset: preset,
          spacing: state.spacing,
          typography: state.typography,
          density: state.density,
        })
        set({ radiusPreset: preset, ...derived })
      },

      setSpacing: (spacing) => {
        const state = get()
        const derived = computeDerived({
          colors: state.userColors,
          radiusPreset: state.radiusPreset,
          spacing,
          typography: state.typography,
          density: state.density,
        })
        set({ spacing, ...derived })
      },

      setTypography: (typography) => {
        const state = get()
        const derived = computeDerived({
          colors: state.userColors,
          radiusPreset: state.radiusPreset,
          spacing: state.spacing,
          typography,
          density: state.density,
        })
        set({ typography, ...derived })
      },

      setDensity: (density) => {
        const state = get()
        const derived = computeDerived({
          colors: state.userColors,
          radiusPreset: state.radiusPreset,
          spacing: state.spacing,
          typography: state.typography,
          density,
        })
        set({ density, ...derived })
      },

      resetAll: () => {
        const derived = computeDerived({
          colors: DEFAULT_INPUTS.colors,
          radiusPreset: DEFAULT_INPUTS.radiusPreset,
          spacing: DEFAULT_INPUTS.spacing,
          typography: DEFAULT_INPUTS.typography,
          density: DEFAULT_INPUTS.density,
        })
        set({
          userColors: DEFAULT_INPUTS.colors,
          radiusPreset: DEFAULT_INPUTS.radiusPreset,
          spacing: DEFAULT_INPUTS.spacing,
          typography: DEFAULT_INPUTS.typography,
          density: DEFAULT_INPUTS.density,
          ...derived,
        })
      },
    }),
    {
      name: "hyena-tokens",
      // Only persist user inputs, not derived state
      partialize: (state) => ({
        userColors: state.userColors,
        radiusPreset: state.radiusPreset,
        spacing: state.spacing,
        typography: state.typography,
        density: state.density,
      }),
      // Rehydrate derived state from persisted inputs
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const derived = computeDerived({
          colors: state.userColors,
          radiusPreset: state.radiusPreset,
          spacing: state.spacing,
          typography: state.typography,
          density: state.density,
        })
        // Merge derived state back
        Object.assign(state, derived)
      },
    }
  )
)

// ------------------------------------------------------------------ //
// Convenience selectors                                                //
// ------------------------------------------------------------------ //

/** Use inside components that just need the CSS style object */
export const useTokenStyle = () => useTokenStore((s) => s.styleObject)

/** Use inside components that need the rule report */
export const useRuleReport = () => useTokenStore((s) => s.ruleReport)

/** Use inside components that need the raw TokenSet */
export const useTokenSet = () => useTokenStore((s) => s.tokens)

/** Use inside components that need the CSS vars record */
export const useCssVars = () => useTokenStore((s) => s.cssVars)
