"use client"

import { useState, useRef, useCallback, useEffect } from "react"
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
// OTPInput — reusable across all sections                             //
// ================================================================== //

type OTPSize = "sm" | "default" | "lg"

interface OTPInputProps {
  length?: number
  size?: OTPSize
  disabled?: boolean
  separatorAfter?: number
  separatorStyle?: "dash" | "text"
  onComplete?: (value: string) => void
  initialValues?: string[]
}

const SIZE_CONFIG: Record<OTPSize, { width: number; height: number; fontSize: number; gap: number }> = {
  sm: { width: 28, height: 32, fontSize: 13, gap: 4 },
  default: { width: 36, height: 40, fontSize: 16, gap: 6 },
  lg: { width: 44, height: 48, fontSize: 20, gap: 8 },
}

function OTPInput({
  length = 6,
  size = "default",
  disabled = false,
  separatorAfter = 3,
  separatorStyle = "dash",
  onComplete,
  initialValues,
}: OTPInputProps) {
  const [values, setValues] = useState<string[]>(() =>
    initialValues
      ? [...initialValues, ...Array(length).fill("")].slice(0, length)
      : Array(length).fill("")
  )
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const config = SIZE_CONFIG[size]

  const handleChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      const char = e.target.value.replace(/[^0-9]/g, "").slice(-1)
      setValues((prev) => {
        const next = [...prev]
        next[index] = char
        if (char && next.every((v) => v !== "")) {
          onComplete?.(next.join(""))
        }
        return next
      })
      if (char && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [disabled, length, onComplete],
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return
      if (e.key === "Backspace" && !values[index] && index > 0) {
        e.preventDefault()
        setValues((prev) => {
          const next = [...prev]
          next[index - 1] = ""
          return next
        })
        inputRefs.current[index - 1]?.focus()
      }
    },
    [disabled, values],
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled) return
      e.preventDefault()
      const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length)
      if (!pasted) return
      setValues((prev) => {
        const next = [...prev]
        for (let i = 0; i < pasted.length; i++) {
          next[i] = pasted[i]
        }
        if (next.every((v) => v !== "")) {
          onComplete?.(next.join(""))
        }
        return next
      })
      const focusIdx = Math.min(pasted.length, length) - 1
      inputRefs.current[focusIdx]?.focus()
    },
    [disabled, length, onComplete],
  )

  const handleFocus = useCallback((index: number, e: React.FocusEvent<HTMLInputElement>) => {
    setFocusedIndex(index)
    e.target.select()
  }, [])

  const handleBlur = useCallback(() => {
    setFocusedIndex(-1)
  }, [])

  useEffect(() => {
    if (initialValues) {
      setValues([...initialValues, ...Array(length).fill("")].slice(0, length))
    }
  }, [initialValues, length])

  const slots: React.ReactNode[] = []

  for (let i = 0; i < length; i++) {
    const isFocused = focusedIndex === i && !disabled

    slots.push(
      <input
        key={i}
        ref={(el) => { inputRefs.current[i] = el }}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={values[i]}
        disabled={disabled}
        onChange={(e) => handleChange(i, e)}
        onKeyDown={(e) => handleKeyDown(i, e)}
        onPaste={handlePaste}
        onFocus={(e) => handleFocus(i, e)}
        onBlur={handleBlur}
        style={{
          width: config.width,
          height: config.height,
          fontSize: config.fontSize,
          border: `0.8px solid ${isFocused ? "#262626" : "#F0F0F0"}`,
          borderRadius: 8,
          textAlign: "center" as const,
          fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
          fontWeight: 500,
          color: "#262626",
          outline: "none",
          background: disabled ? "#FAFAFA" : "#FFFFFF",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
          boxShadow: isFocused ? "0 0 0 2px rgba(0,0,0,0.05)" : "none",
          transition: "border-color 150ms, box-shadow 150ms",
        }}
      />
    )

    if (i === separatorAfter - 1 && i < length - 1) {
      if (separatorStyle === "dash") {
        slots.push(
          <div
            key={`sep-${i}`}
            style={{
              width: 8,
              height: 0.8,
              background: "#D4D4D4",
              margin: "0 4px",
            }}
          />
        )
      } else {
        slots.push(
          <span
            key={`sep-${i}`}
            style={{
              fontSize: 16,
              color: "#D4D4D4",
              fontWeight: 400,
              margin: "0 4px",
            }}
          >
            —
          </span>
        )
      }
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: config.gap }}>
      {slots}
    </div>
  )
}

// ================================================================== //
// Sections                                                            //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <OTPInput
        length={6}
        size="default"
        separatorAfter={3}
        separatorStyle="dash"
        initialValues={["1", "2", "3", "", "", ""]}
      />
    </PreviewSection>
  )
}

function WithSeparatorSection() {
  return (
    <PreviewSection label="With Separator">
      <OTPInput
        length={6}
        size="default"
        separatorAfter={3}
        separatorStyle="text"
      />
    </PreviewSection>
  )
}

function SizesSection() {
  return (
    <PreviewSection label="Sizes" wrapClassName="flex flex-col items-center gap-[16px] w-full">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <OTPInput length={6} size="sm" />
        <span style={{ fontSize: 11, color: "#838383", textAlign: "center" as const, marginTop: 6 }}>sm</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <OTPInput length={6} size="default" />
        <span style={{ fontSize: 11, color: "#838383", textAlign: "center" as const, marginTop: 6 }}>default</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <OTPInput length={6} size="lg" />
        <span style={{ fontSize: 11, color: "#838383", textAlign: "center" as const, marginTop: 6 }}>lg</span>
      </div>
    </PreviewSection>
  )
}

function AutoSubmitSection() {
  const [status, setStatus] = useState<"idle" | "verifying" | "verified">("idle")
  const [resetKey, setResetKey] = useState(0)

  const handleComplete = useCallback((_value: string) => {
    setStatus("verifying")
    setTimeout(() => {
      setStatus("verified")
      setTimeout(() => {
        setStatus("idle")
        setResetKey((k) => k + 1)
      }, 2000)
    }, 1500)
  }, [])

  return (
    <PreviewSection label="With Auto-Submit">
      <style>{`@keyframes otp-spin { to { transform: rotate(360deg) } }`}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <OTPInput
          key={resetKey}
          length={6}
          size="default"
          separatorAfter={3}
          onComplete={handleComplete}
        />
        <div
          style={{
            marginTop: 8,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {status === "verifying" && (
            <>
              <div
                style={{
                  width: 14,
                  height: 14,
                  border: "1.5px solid transparent",
                  borderTopColor: "#262626",
                  borderRadius: "50%",
                  animation: "otp-spin 0.6s linear infinite",
                }}
              />
              <span style={{ fontSize: 12, color: "#838383" }}>Verifying...</span>
            </>
          )}
          {status === "verified" && (
            <span style={{ fontSize: 12, color: "#14B8A6", fontWeight: 500 }}>Verified ✓</span>
          )}
        </div>
      </div>
    </PreviewSection>
  )
}

function DisabledSection() {
  return (
    <PreviewSection label="Disabled">
      <OTPInput
        length={6}
        size="default"
        separatorAfter={3}
        disabled
        initialValues={["0", "0", "0", "0", "0", "0"]}
      />
    </PreviewSection>
  )
}

// ================================================================== //
// Code Tab                                                            //
// ================================================================== //

const IMPORT_CODE = `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"`

const USAGE_CODE = `<InputOTP length={6} onComplete={handleVerify}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`

// ================================================================== //
// API Tab                                                             //
// ================================================================== //

const API_PROPS: PropDef[] = [
  { prop: "length", type: "number", defaultVal: "6" },
  { prop: "onComplete", type: "(value: string) => void", defaultVal: "—" },
  { prop: "autoSubmit", type: "boolean", defaultVal: "false" },
  { prop: "separator", type: "number", defaultVal: "3" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

// ================================================================== //
// CAP                                                                 //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "5",
  sizes: "3 (sm, default, lg)",
  deps: "cn",
  related: [
    { label: "Input", href: "/components/input" },
    { label: "Field", href: "/components/field" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--success", color: "#14B8A6" },
  ],
}

// ================================================================== //
// Page                                                                //
// ================================================================== //

export function InputOTPPage() {
  return (
    <ComponentPageLayout
      name="Input OTP"
      capContent={<ComponentCAP data={CAP_DATA} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: "28px" }}>
          <DefaultSection />
          <WithSeparatorSection />
          <SizesSection />
          <AutoSubmitSection />
          <DisabledSection />
        </div>
      }
      codeContent={
        <StandardCodeTab
          packageName="@hyena/input-otp"
          importCode={IMPORT_CODE}
          usageCode={USAGE_CODE}
        />
      }
      apiContent={
        <StandardApiTab
          name="InputOTP"
          description="One-time password input with auto-focus management, paste support, and completion callback."
          props={API_PROPS}
        />
      }
    />
  )
}
