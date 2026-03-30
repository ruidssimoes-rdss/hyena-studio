"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  LabelPill,
  PropsTable,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"
import { Plus, ChevronDown } from "lucide-react"

// ================================================================== //
// COLOR MATH                                                          //
// ================================================================== //

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let r1 = 0, g1 = 0, b1 = 0
  if (h < 60) { r1 = c; g1 = x }
  else if (h < 120) { r1 = x; g1 = c }
  else if (h < 180) { g1 = c; b1 = x }
  else if (h < 240) { g1 = x; b1 = c }
  else if (h < 300) { r1 = x; b1 = c }
  else { r1 = c; b1 = x }
  return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)]
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("").toUpperCase()
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + 6) % 6 * 60
    else if (max === g) h = ((b - r) / d + 2) * 60
    else h = ((r - g) / d + 4) * 60
  }
  const s = max === 0 ? 0 : d / max
  return [h, s, max]
}

function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex)
}

// ================================================================== //
// SHARED SUB-COMPONENTS                                               //
// ================================================================== //

function SaturationArea({
  hue,
  sat,
  val,
  onChange,
  disabled,
}: {
  hue: number
  sat: number
  val: number
  onChange: (s: number, v: number) => void
  disabled?: boolean
}) {
  const areaRef = useRef<HTMLDivElement>(null)

  const handlePointer = useCallback(
    (e: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
      if (disabled) return
      const rect = areaRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
      onChange(x, 1 - y)
    },
    [disabled, onChange],
  )

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return
      e.currentTarget.setPointerCapture(e.pointerId)
      handlePointer(e)
    },
    [disabled, handlePointer],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.buttons === 0) return
      handlePointer(e)
    },
    [handlePointer],
  )

  return (
    <div
      ref={areaRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      style={{
        position: "relative",
        width: "100%",
        height: 160,
        borderRadius: 8,
        cursor: disabled ? "default" : "crosshair",
        background: `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`,
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: `${sat * 100}%`,
          top: `${(1 - val) * 100}%`,
          width: 14,
          height: 14,
          borderRadius: "50%",
          border: "2px solid #FFFFFF",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}

function HueSlider({
  hue,
  onChange,
}: {
  hue: number
  onChange: (h: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const handlePointer = useCallback(
    (e: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
      const rect = trackRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      onChange(x * 360)
    },
    [onChange],
  )

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      handlePointer(e)
    },
    [handlePointer],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.buttons === 0) return
      handlePointer(e)
    },
    [handlePointer],
  )

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      style={{
        position: "relative",
        width: "100%",
        height: 12,
        borderRadius: 6,
        background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
        cursor: "pointer",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: `${(hue / 360) * 100}%`,
          top: "50%",
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#FFFFFF",
          border: "2px solid #FFFFFF",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}

function OpacitySlider({
  color,
  opacity,
  onChange,
}: {
  color: string
  opacity: number
  onChange: (o: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const handlePointer = useCallback(
    (e: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
      const rect = trackRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      onChange(x)
    },
    [onChange],
  )

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      handlePointer(e)
    },
    [handlePointer],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.buttons === 0) return
      handlePointer(e)
    },
    [handlePointer],
  )

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      style={{
        position: "relative",
        width: "100%",
        height: 12,
        borderRadius: 6,
        backgroundImage:
          "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "8px 8px",
        backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
        cursor: "pointer",
        userSelect: "none",
        touchAction: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 6,
          background: `linear-gradient(to right, transparent, ${color})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${opacity * 100}%`,
          top: "50%",
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#FFFFFF",
          border: "2px solid #FFFFFF",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  )
}

// ================================================================== //
// COLOR PICKER PANEL                                                  //
// ================================================================== //

function ColorPickerPanel({
  initialColor = "#3B82F6",
  showOpacity = true,
  showSwatches = false,
  swatches,
  activeSwatch,
  onSwatchClick,
  rgbMode = false,
  showModeToggle = false,
  onColorChange,
  children,
}: {
  initialColor?: string
  showOpacity?: boolean
  showSwatches?: boolean
  swatches?: string[]
  activeSwatch?: string | null
  onSwatchClick?: (color: string) => void
  rgbMode?: boolean
  showModeToggle?: boolean
  onColorChange?: (hex: string) => void
  children?: React.ReactNode
}) {
  const [rgb] = useState(() => hexToRgb(initialColor))
  const [hsv, setHsv] = useState<[number, number, number]>(() => rgbToHsv(...rgb))
  const [hue, setHue] = useState(hsv[0])
  const [sat, setSat] = useState(hsv[1])
  const [val, setVal] = useState(hsv[2])
  const [opacity, setOpacity] = useState(1)
  const [hexInput, setHexInput] = useState(initialColor)
  const [showRgb, setShowRgb] = useState(rgbMode)
  const [rInput, setRInput] = useState(() => String(rgb[0]))
  const [gInput, setGInput] = useState(() => String(rgb[1]))
  const [bInput, setBInput] = useState(() => String(rgb[2]))

  const currentRgb = hsvToRgb(hue, sat, val)
  const currentHex = rgbToHex(...currentRgb)

  // Sync hex input when color changes via drag
  const prevHexRef = useRef(currentHex)
  if (prevHexRef.current !== currentHex) {
    prevHexRef.current = currentHex
  }

  useEffect(() => {
    setHexInput(currentHex)
    setRInput(String(currentRgb[0]))
    setGInput(String(currentRgb[1]))
    setBInput(String(currentRgb[2]))
    onColorChange?.(currentHex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHex])

  const handleSatVal = useCallback((s: number, v: number) => {
    setSat(s)
    setVal(v)
  }, [])

  const handleHue = useCallback((h: number) => {
    setHue(h)
  }, [])

  const handleOpacity = useCallback((o: number) => {
    setOpacity(o)
  }, [])

  const handleHexBlur = useCallback(() => {
    if (isValidHex(hexInput)) {
      const [r, g, b] = hexToRgb(hexInput)
      const [h, s, v] = rgbToHsv(r, g, b)
      setHue(h)
      setSat(s)
      setVal(v)
    } else {
      setHexInput(currentHex)
    }
  }, [hexInput, currentHex])

  const handleRgbBlur = useCallback(() => {
    const r = Math.max(0, Math.min(255, parseInt(rInput) || 0))
    const g = Math.max(0, Math.min(255, parseInt(gInput) || 0))
    const b = Math.max(0, Math.min(255, parseInt(bInput) || 0))
    const [h, s, v] = rgbToHsv(r, g, b)
    setHue(h)
    setSat(s)
    setVal(v)
    setRInput(String(r))
    setGInput(String(g))
    setBInput(String(b))
  }, [rInput, gInput, bInput])

  const handleSwatchClickInternal = useCallback(
    (color: string) => {
      const [r, g, b] = hexToRgb(color)
      const [h, s, v] = rgbToHsv(r, g, b)
      setHue(h)
      setSat(s)
      setVal(v)
      onSwatchClick?.(color)
    },
    [onSwatchClick],
  )

  const swatchPreviewBg =
    opacity < 1 ? `rgba(${currentRgb[0]}, ${currentRgb[1]}, ${currentRgb[2]}, ${opacity})` : currentHex

  const inputBase: React.CSSProperties = {
    height: 28,
    border: "0.8px solid #F0F0F0",
    borderRadius: 8,
    padding: "0 8px",
    fontSize: 12.3,
    fontFamily: "monospace",
    color: "#262626",
    outline: "none",
    background: "white",
  }

  return (
    <div
      style={{
        width: 280,
        background: "white",
        border: "0.8px solid #F0F0F0",
        borderRadius: 10,
        padding: 12,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SaturationArea hue={hue} sat={sat} val={val} onChange={handleSatVal} />
        <HueSlider hue={hue} onChange={handleHue} />
        {showOpacity && <OpacitySlider color={currentHex} opacity={opacity} onChange={handleOpacity} />}

        {/* Input row */}
        {!showRgb ? (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: swatchPreviewBg,
                border: "0.8px solid #F0F0F0",
                flexShrink: 0,
              }}
            />
            <input
              style={{ ...inputBase, flex: 1 }}
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value.toUpperCase())}
              onBlur={handleHexBlur}
              onKeyDown={(e) => { if (e.key === "Enter") handleHexBlur() }}
              spellCheck={false}
            />
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: swatchPreviewBg,
                border: "0.8px solid #F0F0F0",
                flexShrink: 0,
              }}
            />
            {[
              { label: "R", value: rInput, set: setRInput },
              { label: "G", value: gInput, set: setGInput },
              { label: "B", value: bInput, set: setBInput },
            ].map((field) => (
              <div key={field.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 500, color: "#838383", marginBottom: 2 }}>
                  {field.label}
                </span>
                <input
                  style={{ ...inputBase, width: 56, textAlign: "center" }}
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  onBlur={handleRgbBlur}
                  onKeyDown={(e) => { if (e.key === "Enter") handleRgbBlur() }}
                  spellCheck={false}
                />
              </div>
            ))}
          </div>
        )}

        {showModeToggle && (
          <button
            onClick={() => setShowRgb(!showRgb)}
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "#2B7FFF",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              fontFamily: "inherit",
              textAlign: "left",
            }}
          >
            {"HEX \u2194 RGB"}
          </button>
        )}

        {showSwatches && swatches && (
          <div>
            <div style={{ fontSize: 11, color: "#838383", marginBottom: 6 }}>Presets</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {swatches.map((sw) => (
                <button
                  key={sw}
                  onClick={() => handleSwatchClickInternal(sw)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: sw,
                    border: sw === "#FFFFFF" ? "0.8px solid #F0F0F0" : "none",
                    cursor: "pointer",
                    outline: activeSwatch === sw ? "2px solid #262626" : "none",
                    outlineOffset: 2,
                    padding: 0,
                    transition: "transform 100ms",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)" }}
                />
              ))}
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

// ================================================================== //
// PRESET SWATCHES                                                     //
// ================================================================== //

const PRESET_SWATCHES = [
  "#262626", "#838383", "#D5143E", "#F97316", "#EAB308",
  "#14B8A6", "#3B82F6", "#8B5CF6", "#EC4899", "#FFFFFF",
]

// ================================================================== //
// PREVIEW SECTIONS                                                    //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ColorPickerPanel initialColor="#3B82F6" />
      </div>
    </PreviewSection>
  )
}

function WithSwatchesSection() {
  const [active, setActive] = useState<string | null>("#3B82F6")

  return (
    <PreviewSection label="With Swatches">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ColorPickerPanel
          initialColor="#3B82F6"
          showSwatches
          swatches={PRESET_SWATCHES}
          activeSwatch={active}
          onSwatchClick={setActive}
        />
      </div>
    </PreviewSection>
  )
}

function RgbModeSection() {
  return (
    <PreviewSection label="RGB Mode">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ColorPickerPanel initialColor="#3B82F6" rgbMode showModeToggle />
      </div>
    </PreviewSection>
  )
}

function CompactSection() {
  const [active, setActive] = useState<string | null>("#3B82F6")
  const [showPicker, setShowPicker] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showPicker) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPicker(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [showPicker])

  const handleSwatchClick = useCallback((color: string) => {
    setActive(color)
  }, [])

  const handlePickerColor = useCallback((hex: string) => {
    setActive(hex)
  }, [])

  return (
    <PreviewSection label="Compact">
      <div ref={containerRef} style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {PRESET_SWATCHES.map((sw) => (
              <button
                key={sw}
                onClick={() => handleSwatchClick(sw)}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: sw,
                  border: sw === "#FFFFFF" ? "0.8px solid #F0F0F0" : "none",
                  cursor: "pointer",
                  outline: active === sw ? "2px solid #262626" : "none",
                  outlineOffset: 2,
                  padding: 0,
                  transition: "transform 100ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)" }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)" }}
              />
            ))}
            <button
              onClick={() => setShowPicker(!showPicker)}
              style={{
                width: 24,
                height: 24,
                border: "1.5px dashed #E5E5E5",
                borderRadius: 6,
                color: "#838383",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "white",
                padding: 0,
              }}
            >
              <Plus size={12} />
            </button>
          </div>
          {showPicker && (
            <div style={{ position: "absolute", zIndex: 10, marginTop: 6 }}>
              <ColorPickerPanel
                initialColor={active || "#3B82F6"}
                showOpacity={false}
                onColorChange={handlePickerColor}
              />
            </div>
          )}
        </div>
      </div>
    </PreviewSection>
  )
}

function PopoverTriggerSection() {
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState("#3B82F6")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <PreviewSection label="Popover Trigger">
      <div ref={containerRef} style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              height: 28,
              display: "flex",
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              border: "0.8px solid #F0F0F0",
              borderRadius: 8,
              padding: "0 10px",
              background: "white",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: color,
                border: "0.8px solid #F0F0F0",
              }}
            />
            <span style={{ fontSize: 12.3, fontFamily: "monospace", color: "#262626" }}>{color}</span>
            <ChevronDown size={12} color="#838383" />
          </button>
          {open && (
            <div style={{ position: "absolute", zIndex: 10, marginTop: 6 }}>
              <ColorPickerPanel initialColor={color} onColorChange={setColor} />
            </div>
          )}
        </div>
      </div>
    </PreviewSection>
  )
}

function InteractiveSection() {
  const [color, setColor] = useState("#3B82F6")

  return (
    <PreviewSection label="Interactive">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
        <div
          style={{
            width: "100%",
            height: 80,
            borderRadius: 10,
            background: color,
            transition: "background 100ms",
          }}
        />
        <ColorPickerPanel initialColor="#3B82F6" onColorChange={setColor} />
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// DATA                                                                //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Input",
  variants: "6",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Input", href: "/components/input" },
    { label: "Popover", href: "/components/popover" },
    { label: "Slider", href: "/components/slider" },
  ],
  tokens: [
    { name: "--picker-border", color: "#F0F0F0", border: true },
    { name: "--picker-thumb-shadow", color: "rgba(0,0,0,0.15)" },
    { name: "--picker-swatch-ring", color: "#262626" },
  ],
}

const COLOR_PICKER_PROPS: PropDef[] = [
  { prop: "value", type: "string", defaultVal: '"#000000"' },
  { prop: "onChange", type: "(color: string) => void", defaultVal: "\u2014" },
  { prop: "variant", type: '"default" | "compact"', defaultVal: '"default"' },
  { prop: "showOpacity", type: "boolean", defaultVal: "true" },
  { prop: "showSwatches", type: "boolean", defaultVal: "false" },
  { prop: "swatches", type: "string[]", defaultVal: "default palette" },
  { prop: "mode", type: '"hex" | "rgb"', defaultVal: '"hex"' },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

const POPOVER_PROPS: PropDef[] = [
  { prop: "value", type: "string", defaultVal: '"#000000"' },
  { prop: "onChange", type: "(color: string) => void", defaultVal: "\u2014" },
  { prop: "align", type: '"start" | "center" | "end"', defaultVal: '"start"' },
]

// ================================================================== //
// PAGE                                                                //
// ================================================================== //

export function ColorPickerPage() {
  return (
    <ComponentPageLayout
      name="Color Picker"
      capContent={<ComponentCAP data={CAP_DATA} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: "28px" }}>
          <DefaultSection />
          <WithSwatchesSection />
          <RgbModeSection />
          <CompactSection />
          <PopoverTriggerSection />
          <InteractiveSection />
        </div>
      }
      codeContent={
        <StandardCodeTab
          packageName="@hyena/color-picker"
          importCode={`import { ColorPicker } from "@/components/ui/color-picker"`}
          usageCode={`<ColorPicker value="#3B82F6" onChange={(color) => console.log(color)} />\n\n// With swatches\n<ColorPicker\n  value={color}\n  onChange={setColor}\n  swatches={["#D5143E", "#F97316", "#14B8A6", "#3B82F6"]}\n/>\n\n// In a popover\n<ColorPickerPopover value={color} onChange={setColor} />\n\n// Compact\n<ColorPicker variant="compact" value={color} onChange={setColor} />`}
        />
      }
      apiContent={
        <StandardApiTab
          name="Color Picker"
          description="A color selection input with saturation/brightness area, hue slider, opacity slider, hex/rgb input, and swatch palette."
          props={COLOR_PICKER_PROPS}
          extraSections={
            <div style={{ marginTop: 28 }}>
              <LabelPill text="ColorPickerPopover" />
              <div style={{ marginTop: 12, width: "100%" }}>
                <PropsTable props={POPOVER_PROPS} />
              </div>
            </div>
          }
        />
      }
    />
  )
}
