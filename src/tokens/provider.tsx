"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { cssVarsToStyleObject, tokensToCssVars } from "./css"
import {
  DEFAULT_DENSITY,
  DEFAULT_SPACING,
  DEFAULT_TYPOGRAPHY,
  DEFAULT_USER_COLORS,
} from "./defaults"
import {
  generateTokenSet,
  type GeneratorInputs,
} from "./generator"
import type {
  DensityLevel,
  RadiusPreset,
  SpacingTokens,
  TokenSet,
  TypographyTokens,
  UserColorInputs,
} from "./types"

// ------------------------------------------------------------------ //
// localStorage persistence                                            //
// ------------------------------------------------------------------ //

const STORAGE_KEY = "hyena-tokens"

interface PersistedState {
  colors: UserColorInputs
  radiusPreset: RadiusPreset
  spacing: SpacingTokens
  typography: TypographyTokens
  density: DensityLevel
}

function loadFromStorage(): Partial<PersistedState> {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Partial<PersistedState>
  } catch {
    return {}
  }
}

function saveToStorage(state: PersistedState): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore storage errors (quota, private mode, etc.)
  }
}

// ------------------------------------------------------------------ //
// Context types                                                       //
// ------------------------------------------------------------------ //

interface TokenContextValue {
  tokens: TokenSet
  cssVars: Record<string, string>
  styleObject: React.CSSProperties

  // User-facing setters
  setColors: (colors: UserColorInputs) => void
  setRadiusPreset: (preset: RadiusPreset) => void
  setSpacing: (spacing: SpacingTokens) => void
  setTypography: (typography: TypographyTokens) => void
  setDensity: (density: DensityLevel) => void

  // Current user inputs (for editor controls)
  userColors: UserColorInputs
  radiusPreset: RadiusPreset
  spacing: SpacingTokens
  typography: TypographyTokens
  density: DensityLevel
}

const TokenContext = createContext<TokenContextValue | null>(null)

// ------------------------------------------------------------------ //
// Provider                                                            //
// ------------------------------------------------------------------ //

interface TokenProviderProps {
  children: React.ReactNode
}

function getInitialState() {
  const saved = loadFromStorage()
  return {
    colors: saved.colors ?? DEFAULT_USER_COLORS,
    radiusPreset: saved.radiusPreset ?? ("soft" as RadiusPreset),
    spacing: saved.spacing ?? DEFAULT_SPACING,
    typography: saved.typography ?? DEFAULT_TYPOGRAPHY,
    density: saved.density ?? DEFAULT_DENSITY,
  }
}

export function TokenProvider({ children }: TokenProviderProps) {
  const initial = useMemo(() => getInitialState(), [])

  const [userColors, setUserColors] = useState<UserColorInputs>(initial.colors)
  const [radiusPreset, setRadiusPresetState] = useState<RadiusPreset>(initial.radiusPreset)
  const [spacing, setSpacingState] = useState<SpacingTokens>(initial.spacing)
  const [typography, setTypographyState] = useState<TypographyTokens>(initial.typography)
  const [density, setDensityState] = useState<DensityLevel>(initial.density)

  // Persist to localStorage on change
  useEffect(() => {
    saveToStorage({ colors: userColors, radiusPreset, spacing, typography, density })
  }, [userColors, radiusPreset, spacing, typography, density])

  const inputs: GeneratorInputs = useMemo(
    () => ({
      colors: userColors,
      radiusPreset,
      spacing,
      typography,
      density,
    }),
    [userColors, radiusPreset, spacing, typography, density]
  )

  const tokens = useMemo(() => generateTokenSet(inputs), [inputs])
  const cssVars = useMemo(() => tokensToCssVars(tokens), [tokens])
  const styleObject = useMemo(() => cssVarsToStyleObject(cssVars), [cssVars])

  const setColors = useCallback((c: UserColorInputs) => setUserColors(c), [])
  const setRadiusPreset = useCallback(
    (p: RadiusPreset) => setRadiusPresetState(p),
    []
  )
  const setSpacing = useCallback(
    (s: SpacingTokens) => setSpacingState(s),
    []
  )
  const setTypography = useCallback(
    (t: TypographyTokens) => setTypographyState(t),
    []
  )
  const setDensity = useCallback(
    (d: DensityLevel) => setDensityState(d),
    []
  )

  const value: TokenContextValue = useMemo(
    () => ({
      tokens,
      cssVars,
      styleObject,
      setColors,
      setRadiusPreset,
      setSpacing,
      setTypography,
      setDensity,
      userColors,
      radiusPreset,
      spacing,
      typography,
      density,
    }),
    [
      tokens,
      cssVars,
      styleObject,
      setColors,
      setRadiusPreset,
      setSpacing,
      setTypography,
      setDensity,
      userColors,
      radiusPreset,
      spacing,
      typography,
      density,
    ]
  )

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  )
}

// ------------------------------------------------------------------ //
// Hook                                                                //
// ------------------------------------------------------------------ //

export function useTokens(): TokenContextValue {
  const ctx = useContext(TokenContext)
  if (!ctx) {
    throw new Error("useTokens must be used within a TokenProvider")
  }
  return ctx
}
