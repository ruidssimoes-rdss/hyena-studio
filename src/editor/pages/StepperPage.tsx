"use client"

import React, { useState } from "react"
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
import { Check, X, Sparkles } from "lucide-react"

// ================================================================== //
// HELPERS                                                              //
// ================================================================== //

type StepStatus = "completed" | "active" | "upcoming" | "error"

function StepCircle({ status, stepNum }: { status: StepStatus; stepNum: number }) {
  const base: React.CSSProperties = {
    width: 28,
    height: 28,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: 12.3,
    fontWeight: 500,
    transition: "all 200ms ease",
  }

  const styles: Record<StepStatus, React.CSSProperties> = {
    completed: { ...base, background: "#14B8A6", color: "white" },
    active: { ...base, background: "#262626", color: "white" },
    upcoming: { ...base, background: "transparent", border: "1.5px solid #E5E5E5", color: "#838383" },
    error: { ...base, background: "rgba(213,20,62,0.08)", border: "1.5px solid #D5143E", color: "#D5143E" },
  }

  return (
    <div style={styles[status]}>
      {status === "completed" ? (
        <Check size={12} />
      ) : status === "error" ? (
        <X size={12} />
      ) : (
        stepNum
      )}
    </div>
  )
}

function Connector({
  status,
  dashed,
}: {
  status?: "completed" | "error" | "default"
  dashed?: boolean
}) {
  const color =
    status === "completed" ? "#14B8A6" : status === "error" ? "#D5143E" : "#E5E5E5"
  return (
    <div
      style={{
        flex: 1,
        height: 2,
        background: dashed ? "transparent" : color,
        borderTop: dashed ? `2px dashed ${color}` : "none",
        alignSelf: "center",
        margin: "0 4px",
      }}
    />
  )
}

interface StepDef {
  label: string
  description?: string
  status: StepStatus
}

function getConnectorStatus(
  stepBefore: StepDef
): "completed" | "error" | "default" {
  if (stepBefore.status === "completed") return "completed"
  if (stepBefore.status === "error") return "error"
  return "default"
}

function HorizontalStepper({
  steps,
  showDescriptions,
  clickable,
  onStepClick,
  dashedAfterError,
}: {
  steps: StepDef[]
  showDescriptions?: boolean
  clickable?: boolean
  onStepClick?: (index: number) => void
  dashedAfterError?: boolean
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Find error index for dashed connector logic
  const errorIndex = dashedAfterError
    ? steps.findIndex((s) => s.status === "error")
    : -1

  return (
    <div style={{ width: "100%" }}>
      {/* Row 1: circles + connectors */}
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        {steps.map((step, i) => {
          const isClickable =
            clickable && step.status === "completed" && onStepClick
          const isHovered = hoveredIndex === i

          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <Connector
                  status={getConnectorStatus(steps[i - 1])}
                  dashed={dashedAfterError && errorIndex !== -1 && i - 1 >= errorIndex}
                />
              )}
              <div
                style={{
                  cursor: isClickable ? "pointer" : "default",
                  transform: isClickable && isHovered ? "scale(1.1)" : "scale(1)",
                  transition: "transform 150ms ease",
                }}
                onMouseEnter={() => isClickable && setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => isClickable && onStepClick(i)}
              >
                <StepCircle status={step.status} stepNum={i + 1} />
              </div>
            </React.Fragment>
          )
        })}
      </div>
      {/* Row 2: labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 8,
        }}
      >
        {steps.map((step, i) => {
          const isClickable =
            clickable && step.status === "completed" && onStepClick
          const isHovered = hoveredIndex === i

          return (
            <div
              key={i}
              style={{ textAlign: "center", flex: 1, minWidth: 0 }}
              onMouseEnter={() => isClickable && setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => isClickable && onStepClick(i)}
            >
              <div
                style={{
                  fontSize: 12.3,
                  fontWeight: 500,
                  color:
                    step.status === "upcoming"
                      ? "#838383"
                      : step.status === "error"
                        ? "#D5143E"
                        : "#262626",
                  cursor: isClickable ? "pointer" : "default",
                  textDecoration: isClickable && isHovered ? "underline" : "none",
                }}
              >
                {step.label}
              </div>
              {showDescriptions && step.description && (
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    color: "#838383",
                    marginTop: 2,
                    maxWidth: 120,
                    margin: "2px auto 0",
                  }}
                >
                  {step.description}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ================================================================== //
// PREVIEW SECTIONS                                                     //
// ================================================================== //

function DefaultSection() {
  const steps: StepDef[] = [
    { label: "Account", status: "completed" },
    { label: "Profile", status: "active" },
    { label: "Preferences", status: "upcoming" },
    { label: "Complete", status: "upcoming" },
  ]

  return (
    <PreviewSection label="Default">
      <HorizontalStepper steps={steps} />
    </PreviewSection>
  )
}

function WithDescriptionsSection() {
  const steps: StepDef[] = [
    { label: "Details", description: "Enter your information", status: "completed" },
    { label: "Address", description: "Shipping location", status: "completed" },
    { label: "Payment", description: "Add payment method", status: "active" },
    { label: "Review", description: "Confirm your order", status: "upcoming" },
  ]

  return (
    <PreviewSection label="With Descriptions">
      <HorizontalStepper steps={steps} showDescriptions />
    </PreviewSection>
  )
}

function CompactSection() {
  const total = 5
  const activeIndex = 1 // Step 2 of 5 (0-based)

  return (
    <PreviewSection label="Compact">
      <div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {Array.from({ length: total }, (_, i) => {
            const isCompleted = i < activeIndex
            const isActive = i === activeIndex
            const size = isActive ? 10 : 8

            return (
              <div
                key={i}
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  background: isCompleted
                    ? "#14B8A6"
                    : isActive
                      ? "#262626"
                      : "#E5E5E5",
                  transition: "all 200ms ease",
                }}
              />
            )
          })}
        </div>
        <div
          style={{
            fontSize: 12.3,
            fontWeight: 400,
            color: "#838383",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          Step 2 of 5
        </div>
      </div>
    </PreviewSection>
  )
}

function VerticalSection() {
  const steps = [
    {
      label: "Create account",
      description: "Sign up with email or OAuth",
      status: "completed" as StepStatus,
    },
    {
      label: "Set up profile",
      description: "Add your name and avatar",
      status: "active" as StepStatus,
    },
    {
      label: "Configure settings",
      description: "Choose your preferences",
      status: "upcoming" as StepStatus,
    },
    {
      label: "Get started",
      description: "You're all set",
      status: "upcoming" as StepStatus,
    },
  ]

  return (
    <PreviewSection
      label="Vertical"
      wrapClassName="flex flex-col items-stretch w-full"
    >
      <div style={{ width: "100%" }}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1

          return (
            <div key={i} style={{ display: "flex" }}>
              {/* Left: circle + vertical connector */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <StepCircle status={step.status} stepNum={i + 1} />
                {!isLast && (
                  <div
                    style={{
                      width: 2,
                      flex: 1,
                      background:
                        step.status === "completed"
                          ? "#14B8A6"
                          : step.status === "error"
                            ? "#D5143E"
                            : "#E5E5E5",
                    }}
                  />
                )}
              </div>
              {/* Right: content */}
              <div
                style={{
                  marginLeft: 16,
                  paddingBottom: isLast ? 0 : 20,
                  flex: 1,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color:
                      step.status === "upcoming"
                        ? "#838383"
                        : step.status === "error"
                          ? "#D5143E"
                          : "#262626",
                  }}
                >
                  {step.label}
                </div>
                <div
                  style={{
                    fontSize: 12.3,
                    fontWeight: 400,
                    color: "#838383",
                    marginTop: 2,
                  }}
                >
                  {step.description}
                </div>
                {step.status === "active" && (
                  <div
                    style={{
                      marginTop: 12,
                      width: "100%",
                      height: 60,
                      border: "1.5px dashed #E5E5E5",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#838383",
                      fontSize: 12.3,
                    }}
                  >
                    Profile form content here
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </PreviewSection>
  )
}

function WithErrorSection() {
  const steps: StepDef[] = [
    { label: "Upload", status: "completed" },
    { label: "Validate", status: "error" },
    { label: "Process", status: "upcoming" },
    { label: "Complete", status: "upcoming" },
  ]

  return (
    <PreviewSection label="With Error">
      <HorizontalStepper steps={steps} dashedAfterError />
    </PreviewSection>
  )
}

function ClickableSection() {
  const steps: StepDef[] = [
    { label: "Details", status: "completed" },
    { label: "Shipping", status: "completed" },
    { label: "Payment", status: "active" },
    { label: "Review", status: "upcoming" },
  ]

  return (
    <PreviewSection label="Clickable">
      <HorizontalStepper steps={steps} clickable onStepClick={() => {}} />
    </PreviewSection>
  )
}

function InteractiveSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [finished, setFinished] = useState(false)

  const stepLabels = ["Account", "Profile", "Settings", "Complete"]

  const steps: StepDef[] = stepLabels.map((label, i) => ({
    label,
    status: finished
      ? "completed"
      : i < activeStep
        ? "completed"
        : i === activeStep
          ? "active"
          : "upcoming",
  }))

  function handleNext() {
    if (activeStep === 3) {
      setFinished(true)
    } else {
      setActiveStep((s) => s + 1)
    }
  }

  function handleBack() {
    if (finished) {
      setFinished(false)
      setActiveStep(3)
    } else if (activeStep > 0) {
      setActiveStep((s) => s - 1)
    }
  }

  function handleStepClick(index: number) {
    setFinished(false)
    setActiveStep(index)
  }

  const btnBase: React.CSSProperties = {
    height: 28,
    padding: "0 14px",
    borderRadius: 10,
    fontSize: 12.3,
    fontWeight: 500,
    cursor: "pointer",
    transition: "opacity 150ms ease",
  }

  const backBtn: React.CSSProperties = {
    ...btnBase,
    border: "0.8px solid #F0F0F0",
    background: "white",
    color: "#262626",
    opacity: activeStep === 0 && !finished ? 0.5 : 1,
    cursor: activeStep === 0 && !finished ? "not-allowed" : "pointer",
  }

  const nextBtn: React.CSSProperties = {
    ...btnBase,
    background: "#262626",
    color: "white",
    border: "none",
  }

  return (
    <PreviewSection
      label="Interactive"
      wrapClassName="flex flex-col items-stretch w-full"
    >
      <div style={{ width: "100%" }}>
        <HorizontalStepper
          steps={steps}
          clickable
          onStepClick={handleStepClick}
        />

        {/* Content panel */}
        <div
          style={{
            background: "#FAFAFA",
            border: "0.8px solid #F0F0F0",
            borderRadius: 10,
            padding: 20,
            minHeight: 120,
            marginTop: 16,
          }}
        >
          <div
            key={finished ? "finished" : activeStep}
            style={{ transition: "opacity 200ms ease" }}
          >
            {finished ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 80,
                }}
              >
                <Sparkles size={24} color="#14B8A6" />
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#14B8A6",
                    marginTop: 8,
                  }}
                >
                  You&apos;re all set!
                </div>
              </div>
            ) : activeStep === 0 ? (
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}>
                  Enter your email and create a password
                </div>
                <div style={{ fontSize: 12.3, fontWeight: 500, color: "#262626", marginTop: 12 }}>
                  Email
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 28,
                    border: "0.8px solid #F0F0F0",
                    borderRadius: 10,
                    marginTop: 8,
                    background: "white",
                  }}
                />
                <div style={{ fontSize: 12.3, fontWeight: 500, color: "#262626", marginTop: 12 }}>
                  Password
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 28,
                    border: "0.8px solid #F0F0F0",
                    borderRadius: 10,
                    marginTop: 8,
                    background: "white",
                  }}
                />
              </div>
            ) : activeStep === 1 ? (
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}>
                  Tell us about yourself
                </div>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    background: "#F0F0F0",
                    marginTop: 8,
                  }}
                />
                <div
                  style={{
                    width: "100%",
                    height: 28,
                    border: "0.8px solid #F0F0F0",
                    borderRadius: 10,
                    marginTop: 8,
                    background: "white",
                  }}
                />
              </div>
            ) : activeStep === 2 ? (
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}>
                  Configure your preferences
                </div>
                {["Dark mode", "Notifications"].map((label) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <span style={{ fontSize: 12.3, fontWeight: 400, color: "#262626" }}>
                      {label}
                    </span>
                    <div
                      style={{
                        width: 36,
                        height: 20,
                        borderRadius: 10,
                        background: "#E5E5E5",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          background: "white",
                          position: "absolute",
                          top: 2,
                          left: 2,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 80,
                }}
              >
                <Sparkles size={24} color="#14B8A6" />
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#14B8A6",
                    marginTop: 8,
                  }}
                >
                  You&apos;re all set!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <button
            style={backBtn}
            onClick={handleBack}
            disabled={activeStep === 0 && !finished}
          >
            Back
          </button>
          <button style={nextBtn} onClick={handleNext}>
            {activeStep === 3 && !finished ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// PREVIEW TAB                                                          //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <WithDescriptionsSection />
      <CompactSection />
      <VerticalSection />
      <WithErrorSection />
      <ClickableSection />
      <InteractiveSection />
    </div>
  )
}

// ================================================================== //
// CODE TAB                                                             //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/stepper"
      importCode={`import {\n  Stepper,\n  StepperItem,\n  StepperTrigger,\n  StepperContent,\n  StepperSeparator,\n} from "@/components/ui/stepper"`}
      usageCode={`<Stepper activeStep={1}>\n  <StepperItem>\n    <StepperTrigger>Account</StepperTrigger>\n  </StepperItem>\n  <StepperSeparator />\n  <StepperItem>\n    <StepperTrigger>Profile</StepperTrigger>\n  </StepperItem>\n  <StepperSeparator />\n  <StepperItem>\n    <StepperTrigger>Complete</StepperTrigger>\n  </StepperItem>\n</Stepper>\n\n// Controlled\nconst [step, setStep] = useState(0);\n\n<Stepper activeStep={step} onStepChange={setStep}>\n  ...\n</Stepper>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const STEPPER_PROPS: PropDef[] = [
  { prop: "activeStep", type: "number", defaultVal: "0" },
  { prop: "orientation", type: '"horizontal" | "vertical"', defaultVal: '"horizontal"' },
  { prop: "onStepChange", type: "(step: number) => void", defaultVal: "\u2014" },
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

const STEPPER_ITEM_PROPS: PropDef[] = [
  { prop: "status", type: '"completed" | "active" | "upcoming" | "error"', defaultVal: "auto" },
  { prop: "clickable", type: "boolean", defaultVal: "true (completed)" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
]

const STEPPER_TRIGGER_PROPS: PropDef[] = [
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
  { prop: "description", type: "string", defaultVal: "\u2014" },
  { prop: "icon", type: "ReactNode", defaultVal: "\u2014" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Stepper"
      description="A multi-step wizard indicator with connected dots, completion states, and optional content panels."
      props={STEPPER_PROPS}
      extraSections={
        <>
          <div style={{ marginTop: 24 }}>
            <LabelPill text="StepperItem" />
            <div style={{ marginTop: 12, width: "100%" }}>
              <PropsTable props={STEPPER_ITEM_PROPS} />
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <LabelPill text="StepperTrigger" />
            <div style={{ marginTop: 12, width: "100%" }}>
              <PropsTable props={STEPPER_TRIGGER_PROPS} />
            </div>
          </div>
        </>
      }
    />
  )
}

// ================================================================== //
// CAP DATA                                                             //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Navigation",
  variants: "7",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Timeline", href: "/components/timeline" },
    { label: "Progress", href: "/components/progress" },
    { label: "Tabs", href: "/components/tabs" },
    { label: "Pagination", href: "/components/pagination" },
  ],
  tokens: [
    { name: "--stepper-completed", color: "#14B8A6" },
    { name: "--stepper-active", color: "#262626" },
    { name: "--stepper-upcoming", color: "#E5E5E5", border: true },
    { name: "--stepper-error", color: "#D5143E" },
    { name: "--stepper-label-active", color: "#262626" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function StepperPage() {
  return (
    <ComponentPageLayout
      name="Stepper"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
