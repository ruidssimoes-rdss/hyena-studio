"use client"

import { useState } from "react"
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
// SHARED FORM STYLES                                                   //
// ================================================================== //

const formContainer: React.CSSProperties = {
  width: 380,
  display: "flex",
  flexDirection: "column",
  gap: 14,
}

const fieldGroup: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
}

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: "#262626",
}

const requiredStar: React.CSSProperties = {
  color: "#D5143E",
  marginLeft: 2,
}

const inputStyle: React.CSSProperties = {
  height: 28,
  padding: "0 10px",
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  fontSize: 13,
  fontWeight: 400,
  color: "#262626",
  outline: "none",
  background: "white",
  width: "100%",
}

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  border: "0.8px solid #D5143E",
}

const textareaStyle: React.CSSProperties = {
  padding: "6px 10px",
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  fontSize: 13,
  fontWeight: 400,
  color: "#262626",
  outline: "none",
  background: "white",
  width: "100%",
  resize: "vertical" as const,
  fontFamily: "inherit",
}

const hintStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 400,
  color: "#838383",
}

const errorStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 400,
  color: "#D5143E",
}

const outlineBtn: React.CSSProperties = {
  height: 28,
  padding: "0 14px",
  borderRadius: 10,
  border: "0.8px solid #F0F0F0",
  background: "white",
  fontSize: 12.3,
  fontWeight: 500,
  color: "#262626",
  cursor: "pointer",
}

const primaryBtn: React.CSSProperties = {
  height: 28,
  padding: "0 14px",
  borderRadius: 10,
  border: "none",
  background: "#262626",
  fontSize: 12.3,
  fontWeight: 500,
  color: "#FFFFFF",
  cursor: "pointer",
}

// ================================================================== //
// HELPER COMPONENTS                                                    //
// ================================================================== //

function FormField({ label, required, hint, error, children }: {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div style={fieldGroup}>
      <label style={labelStyle}>
        {label}
        {required && <span style={requiredStar}>*</span>}
      </label>
      {children}
      {error && <span style={errorStyle}>{error}</span>}
      {!error && hint && <span style={hintStyle}>{hint}</span>}
    </div>
  )
}

function RadioOption({ label, checked, name }: { label: string; checked?: boolean; name: string }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 400, color: "#262626", cursor: "pointer" }}>
      <div style={{
        width: 16, height: 16, borderRadius: 8,
        border: checked ? "none" : "0.8px solid #D4D4D4",
        background: checked ? "#262626" : "white",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {checked && <div style={{ width: 6, height: 6, borderRadius: 3, background: "white" }} />}
      </div>
      <input type="radio" name={name} defaultChecked={checked} style={{ display: "none" }} />
      {label}
    </label>
  )
}

function CheckboxOption({ label, checked }: { label: string; checked?: boolean }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 400, color: "#262626", cursor: "pointer" }}>
      <div style={{
        width: 16, height: 16, borderRadius: 4,
        border: checked ? "none" : "0.8px solid #D4D4D4",
        background: checked ? "#262626" : "white",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <input type="checkbox" defaultChecked={checked} style={{ display: "none" }} />
      {label}
    </label>
  )
}

function SwitchControl({ checked }: { checked?: boolean }) {
  return (
    <div style={{
      width: 38, height: 20, borderRadius: 10,
      background: checked ? "#262626" : "#F0F0F0",
      position: "relative", cursor: "pointer", flexShrink: 0,
    }}>
      <div style={{
        position: "absolute",
        width: 16, height: 16, borderRadius: 8,
        background: "white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        top: 2,
        left: checked ? 20 : 2,
        transition: "left 200ms",
      }} />
    </div>
  )
}

// ================================================================== //
// SECTIONS                                                             //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default" wrapClassName="flex flex-col items-center w-full">
      <div style={formContainer}>
        <FormField label="Name" required>
          <input style={inputStyle} placeholder="Your full name" readOnly />
        </FormField>
        <FormField label="Email" required hint="We&apos;ll never share your email.">
          <input style={inputStyle} type="email" placeholder="you@example.com" readOnly />
        </FormField>
        <FormField label="Message">
          <textarea style={{ ...textareaStyle, height: 80 }} placeholder="How can we help?" readOnly />
        </FormField>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
          <button style={outlineBtn}>Cancel</button>
          <button style={primaryBtn}>Send message</button>
        </div>
      </div>
    </PreviewSection>
  )
}

function ValidationSection() {
  return (
    <PreviewSection label="With Validation Errors" wrapClassName="flex flex-col items-center w-full">
      <div style={formContainer}>
        <FormField label="Name" required error="Name must be at least 2 characters.">
          <input style={inputErrorStyle} defaultValue="R" readOnly />
        </FormField>
        <FormField label="Email" required error="Please enter a valid email address.">
          <input style={inputErrorStyle} defaultValue="not-email" readOnly />
        </FormField>
        <FormField label="Message">
          <textarea style={{ ...textareaStyle, height: 80 }} placeholder="How can we help?" readOnly />
        </FormField>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
          <button style={outlineBtn}>Cancel</button>
          <button style={primaryBtn}>Send message</button>
        </div>
      </div>
    </PreviewSection>
  )
}

function ComplexFormSection() {
  return (
    <PreviewSection label="Complex Form" wrapClassName="flex flex-col items-center w-full">
      <div style={formContainer}>
        <FormField label="Project name" required>
          <input style={inputStyle} placeholder="My project" readOnly />
        </FormField>
        <FormField label="Description">
          <textarea style={{ ...textareaStyle, height: 60 }} placeholder="Describe your project..." readOnly />
        </FormField>
        <FormField label="Visibility">
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 2 }}>
            <RadioOption label="Public" checked name="visibility" />
            <RadioOption label="Private" name="visibility" />
          </div>
        </FormField>
        <FormField label="Notifications">
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 2 }}>
            <CheckboxOption label="Email notifications" checked />
            <CheckboxOption label="Push notifications" />
          </div>
        </FormField>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={labelStyle}>Auto-deploy</span>
            <span style={{ fontSize: 11, fontWeight: 400, color: "#838383" }}>Automatically deploy on push to main.</span>
          </div>
          <SwitchControl checked />
        </div>
        <button style={{ ...primaryBtn, width: "100%", height: 36 }}>Create project</button>
      </div>
    </PreviewSection>
  )
}

function InteractiveSection() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = () => {
    const newErrors: { email?: string; password?: string } = {}
    if (!email) newErrors.email = "Email is required."
    else if (!email.includes("@")) newErrors.email = "Please enter a valid email."
    if (!password) newErrors.password = "Password is required."
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters."

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-center w-full">
      <div style={formContainer}>
        <FormField label="Email" required error={errors.email}>
          <input
            style={errors.email ? inputErrorStyle : inputStyle}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })) }}
          />
        </FormField>
        <FormField label="Password" required error={errors.password}>
          <input
            style={errors.password ? inputErrorStyle : inputStyle}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: undefined })) }}
          />
        </FormField>
        <button
          style={{ ...primaryBtn, width: "100%", opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        {success && (
          <div style={{ fontSize: 12.3, fontWeight: 500, color: "#14B8A6", textAlign: "center" }}>
            Signed in successfully
          </div>
        )}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// TABS                                                                 //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <ValidationSection />
      <ComplexFormSection />
      <InteractiveSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/form"
      importCode={`import { Form } from "@/components/ui/form"\nimport { Field, FieldLabel, FieldError } from "@/components/ui/field"\nimport { Input } from "@/components/ui/input"\nimport { Button } from "@/components/ui/button"`}
      usageCode={`<Form onSubmit={handleSubmit}>\n  <Field>\n    <FieldLabel required>Email</FieldLabel>\n    <Input name="email" type="email" required />\n    <FieldError>Please enter a valid email.</FieldError>\n  </Field>\n  <Button type="submit">Submit</Button>\n</Form>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const FORM_PROPS: PropDef[] = [
  { prop: "onSubmit", type: "(e: FormEvent) => void", defaultVal: "—" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Form"
      description="A form wrapper that provides layout, validation, and submission management for Hyena form controls."
      props={FORM_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "4",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Field", href: "/components/field" },
    { label: "Input", href: "/components/input" },
    { label: "Select", href: "/components/select" },
    { label: "Checkbox", href: "/components/checkbox" },
    { label: "Radio Group", href: "/components/radio-group" },
    { label: "Switch", href: "/components/switch" },
    { label: "Textarea", href: "/components/textarea" },
  ],
  tokens: [
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
    { name: "--error", color: "#D5143E" },
    { name: "--border", color: "#F0F0F0", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function FormPage() {
  return (
    <ComponentPageLayout
      name="Form"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
