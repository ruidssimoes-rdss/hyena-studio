"use client"

import { useState, useCallback } from "react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"

// ================================================================== //
// SLIDER STYLES                                                        //
// ================================================================== //

const sliderStyles = `
  .hyena-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 300px;
    height: 4px;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }
  .hyena-slider::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 2px;
    background: #F0F0F0;
  }
  .hyena-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    border: 0.8px solid #F0F0F0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    margin-top: -6px;
    cursor: pointer;
  }
  .hyena-slider::-moz-range-track {
    height: 4px;
    border-radius: 2px;
    background: #F0F0F0;
  }
  .hyena-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    border: 0.8px solid #F0F0F0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    cursor: pointer;
  }
`

// ================================================================== //
// SLIDER COMPONENT                                                     //
// ================================================================== //

function PreviewSlider({
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  style: extraStyle,
}: {
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  style?: React.CSSProperties
}) {
  const [value, setValue] = useState(defaultValue)
  const pct = ((value - min) / (max - min)) * 100

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value)
      setValue(v)
      onChange?.(v)
    },
    [onChange]
  )

  return (
    <div style={{ position: "relative", width: "300px", ...extraStyle }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          height: "4px",
          width: `${pct}%`,
          borderRadius: "2px",
          background: "#262626",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <input
        type="range"
        className="hyena-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        style={{
          position: "relative",
          zIndex: 2,
          background: "transparent",
        }}
      />
    </div>
  )
}

// ================================================================== //
// PREVIEW SECTIONS                                                     //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <div className="flex items-center justify-center">
        <PreviewSlider defaultValue={50} />
      </div>
    </PreviewSection>
  )
}

function WithValueSection() {
  const [value, setValue] = useState(50)

  return (
    <PreviewSection label="With Value">
      <div className="flex items-center justify-center" style={{ gap: "16px" }}>
        <PreviewSlider defaultValue={50} onChange={setValue} />
        <span
          style={{
            fontSize: "12px",
            color: "#838383",
            fontFamily: "var(--font-geist-mono), monospace",
            minWidth: "28px",
            textAlign: "right",
          }}
        >
          {value}
        </span>
      </div>
    </PreviewSection>
  )
}

function RangeSection() {
  const [minVal, setMinVal] = useState(20)
  const [maxVal, setMaxVal] = useState(80)

  return (
    <PreviewSection label="Range">
      <div className="flex items-center justify-center" style={{ gap: "32px" }}>
        <div className="flex flex-col items-center" style={{ gap: "8px" }}>
          <PreviewSlider defaultValue={20} onChange={setMinVal} />
          <span
            style={{
              fontSize: "12px",
              color: "#838383",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            Min: {minVal}
          </span>
        </div>
        <div className="flex flex-col items-center" style={{ gap: "8px" }}>
          <PreviewSlider defaultValue={80} onChange={setMaxVal} />
          <span
            style={{
              fontSize: "12px",
              color: "#838383",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            Max: {maxVal}
          </span>
        </div>
      </div>
    </PreviewSection>
  )
}

function StepsSection() {
  const [value, setValue] = useState(50)
  const steps = Array.from({ length: 11 }, (_, i) => i * 10)

  return (
    <PreviewSection label="Steps">
      <div className="flex flex-col items-center" style={{ gap: "4px" }}>
        <div className="flex items-center" style={{ gap: "16px" }}>
          <div style={{ position: "relative" }}>
            <PreviewSlider defaultValue={50} step={10} min={0} max={100} onChange={setValue} />
            <div
              className="flex justify-between"
              style={{
                position: "absolute",
                left: "8px",
                right: "8px",
                top: "calc(50% + 10px)",
              }}
            >
              {steps.map((s) => (
                <div
                  key={s}
                  style={{
                    width: "1px",
                    height: "4px",
                    background: "#D4D4D4",
                  }}
                />
              ))}
            </div>
          </div>
          <span
            style={{
              fontSize: "12px",
              color: "#838383",
              fontFamily: "var(--font-geist-mono), monospace",
              minWidth: "28px",
              textAlign: "right",
            }}
          >
            {value}
          </span>
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// DATA                                                                 //
// ================================================================== //

const capData: CAPData = {
  type: "Primitive",
  variants: "4",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Number Field", href: "/components/number-field" },
    { label: "Progress", href: "/components/progress" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--track", color: "#F0F0F0", border: true },
    { name: "--muted-fg", color: "#838383" },
  ],
}

const apiProps: PropDef[] = [
  { prop: "value", type: "number[]", defaultVal: "—" },
  { prop: "defaultValue", type: "number[]", defaultVal: "[0]" },
  { prop: "min", type: "number", defaultVal: "0" },
  { prop: "max", type: "number", defaultVal: "100" },
  { prop: "step", type: "number", defaultVal: "1" },
  { prop: "onValueChange", type: "(value: number[]) => void", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

// ================================================================== //
// PAGE                                                                 //
// ================================================================== //

export function SliderPage() {
  return (
    <>
      <style>{sliderStyles}</style>
      <ComponentPageLayout
        name="Slider"
        capContent={<ComponentCAP data={capData} />}
        previewContent={
          <div className="flex flex-col" style={{ gap: "20px" }}>
            <DefaultSection />
            <WithValueSection />
            <RangeSection />
            <StepsSection />
          </div>
        }
        codeContent={
          <StandardCodeTab
            packageName="@hyena/slider"
            importCode={`import { Slider } from "@/components/ui/slider"`}
            usageCode={`<Slider defaultValue={[50]} max={100} step={1} />`}
          />
        }
        apiContent={
          <StandardApiTab
            name="Slider"
            description="An input where the user selects a value from within a given range."
            props={apiProps}
          />
        }
      />
    </>
  )
}
