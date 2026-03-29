// ------------------------------------------------------------------ //
// Color math: hex ↔ RGB ↔ HSL, contrast ratio, palette generation    //
// All pure functions — no React, no side effects.                    //
// ------------------------------------------------------------------ //

// -- Hex / RGB conversions -------------------------------------------

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, "0")
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// -- HSL conversions -------------------------------------------------

export function rgbToHsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l * 100]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return [h * 360, s * 100, l * 100]
}

export function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  h /= 360
  s /= 100
  l /= 100
  if (s === 0) {
    const v = Math.round(l * 255)
    return [v, v, v]
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ]
}

export function hexToHsl(hex: string): [number, number, number] {
  return rgbToHsl(...hexToRgb(hex))
}

export function hslToHex(h: number, s: number, l: number): string {
  return rgbToHex(...hslToRgb(h, s, l))
}

// -- Contrast ratio (WCAG 2.1) --------------------------------------

/** Relative luminance per WCAG 2.1 */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Contrast ratio between two hex colors (1–21) */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1)
  const l2 = relativeLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// -- Hue extraction --------------------------------------------------

/** Extract hue in degrees (0–360) from hex */
export function hue(hex: string): number {
  return hexToHsl(hex)[0]
}

// -- Color manipulation ----------------------------------------------

/** Adjust lightness by delta percentage points */
export function adjustLightness(hex: string, delta: number): string {
  const [h, s, l] = hexToHsl(hex)
  return hslToHex(h, s, Math.max(0, Math.min(100, l + delta)))
}

/** Composite a color at a given opacity onto a background */
export function compositeOnSurface(
  fgHex: string,
  bgHex: string,
  opacity: number
): string {
  const [fr, fg, fb] = hexToRgb(fgHex)
  const [br, bg_, bb] = hexToRgb(bgHex)
  return rgbToHex(
    fr * opacity + br * (1 - opacity),
    fg * opacity + bg_ * (1 - opacity),
    fb * opacity + bb * (1 - opacity)
  )
}

/** Choose black or white for maximum contrast */
export function contrastingTextColor(bgHex: string): string {
  return relativeLuminance(bgHex) > 0.179 ? "#000000" : "#FFFFFF"
}

/** Apply opacity to a hex color, return rgba string */
export function hexWithOpacity(hex: string, opacity: number): string {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// -- Delta E (CIE76 approximation via Lab) ---------------------------

function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  // sRGB → linear
  let rl = r / 255
  let gl = g / 255
  let bl = b / 255
  rl = rl > 0.04045 ? Math.pow((rl + 0.055) / 1.055, 2.4) : rl / 12.92
  gl = gl > 0.04045 ? Math.pow((gl + 0.055) / 1.055, 2.4) : gl / 12.92
  bl = bl > 0.04045 ? Math.pow((bl + 0.055) / 1.055, 2.4) : bl / 12.92

  // linear RGB → XYZ (D65)
  let x = (rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375) / 0.95047
  let y = rl * 0.2126729 + gl * 0.7151522 + bl * 0.072175
  let z = (rl * 0.0193339 + gl * 0.119192 + bl * 0.9503041) / 1.08883

  // XYZ → Lab
  const f = (t: number) =>
    t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116
  x = f(x)
  y = f(y)
  z = f(z)

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)]
}

/** CIE76 Delta E between two hex colors */
export function deltaE(hex1: string, hex2: string): number {
  const [l1, a1, b1] = rgbToLab(...hexToRgb(hex1))
  const [l2, a2, b2] = rgbToLab(...hexToRgb(hex2))
  return Math.sqrt((l1 - l2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2)
}

// -- Surface-derived neutrals ----------------------------------------

/** Darken surface by a percentage for container variants */
export function darkenSurface(surfaceHex: string, percent: number): string {
  const [h, s, l] = hexToHsl(surfaceHex)
  return hslToHex(h, Math.min(100, s + 1), Math.max(0, l - percent))
}

/**
 * Generate neutral text shades from a surface.
 * Returns [on-surface, muted, subtle, faint] hex values.
 */
export function generateNeutralText(
  surfaceHex: string
): [string, string, string, string] {
  const lum = relativeLuminance(surfaceHex)
  if (lum > 0.179) {
    // Light surface → dark text
    return ["#111111", "#6B6B76", "#9D9DAA", "#CCCCD4"]
  }
  // Dark surface → light text
  return ["#EEEEEE", "#9D9DAA", "#6B6B76", "#444450"]
}

/**
 * Generate border shades from a surface.
 * Returns [outline, outline-variant, outline-hover] hex values.
 */
export function generateOutlines(
  surfaceHex: string
): [string, string, string] {
  const lum = relativeLuminance(surfaceHex)
  if (lum > 0.179) {
    return ["#E4E4E7", "#F0F0F3", "#D4D4D8"]
  }
  return ["#3F3F46", "#27272A", "#52525B"]
}
