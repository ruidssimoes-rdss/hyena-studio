"use client"

import { useState, useEffect, useRef, useCallback } from "react"
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
import { CheckCircle, XCircle, AlertTriangle, Info, X, Loader2 } from "lucide-react"

// ================================================================== //
// SHARED STYLES                                                        //
// ================================================================== //

const toastCardStyle: React.CSSProperties = {
  width: 320,
  background: "#FFFFFF",
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
  padding: "12px 16px",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  position: "relative",
}

const outlineBtn: React.CSSProperties = {
  height: 24,
  fontSize: 11,
  borderRadius: 8,
  border: "0.8px solid #F0F0F0",
  background: "white",
  color: "#262626",
  padding: "0 10px",
  cursor: "pointer",
  fontWeight: 500,
}

function ToastCard({
  title,
  titleColor,
  description,
  icon,
  showClose,
  actions,
  children,
}: {
  title: string
  titleColor?: string
  description?: string
  icon?: React.ReactNode
  showClose?: boolean
  actions?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div style={toastCardStyle}>
      {showClose && (
        <button
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "none",
            border: "none",
            padding: 2,
            cursor: "pointer",
            color: "#A1A1A1",
          }}
        >
          <X size={12} />
        </button>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {icon}
        <span style={{ fontWeight: 500, fontSize: 13, color: titleColor || "#262626" }}>{title}</span>
      </div>
      {description && (
        <span style={{ fontWeight: 400, fontSize: 12.3, color: "#838383" }}>{description}</span>
      )}
      {children}
      {actions && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: 4 }}>
          {actions}
        </div>
      )}
    </div>
  )
}

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default" wrapClassName="flex flex-col items-center">
      <ToastCard
        title="Event has been created"
        description="Monday, January 3rd at 6:00pm"
        showClose
      />
    </PreviewSection>
  )
}

function StatusSection() {
  return (
    <PreviewSection label="Status" wrapClassName="flex flex-col items-center">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <ToastCard
          title="Changes saved"
          titleColor="#14B8A6"
          description="Your profile has been updated."
          icon={<CheckCircle size={16} color="#14B8A6" />}
        />
        <ToastCard
          title="Something went wrong"
          titleColor="#D5143E"
          description="Please try again later."
          icon={<XCircle size={16} color="#D5143E" />}
        />
        <ToastCard
          title="Storage almost full"
          titleColor="#F97316"
          description="You've used 90% of your storage."
          icon={<AlertTriangle size={16} color="#F97316" />}
        />
        <ToastCard
          title="New update available"
          titleColor="#3B82F6"
          description="Version 2.4 is ready to install."
          icon={<Info size={16} color="#3B82F6" />}
        />
      </div>
    </PreviewSection>
  )
}

function WithActionSection() {
  return (
    <PreviewSection label="With Action" wrapClassName="flex flex-col items-center">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <ToastCard
          title="File deleted"
          description="report-q3.pdf was moved to trash."
          actions={<button style={outlineBtn}>Undo</button>}
        />
        <ToastCard
          title="Invite sent"
          description="An invitation was sent to rui@hyena.studio."
          actions={
            <>
              <button style={outlineBtn}>View</button>
              <button style={{ ...outlineBtn, color: "#838383", border: "none" }}>Dismiss</button>
            </>
          }
        />
      </div>
    </PreviewSection>
  )
}

function LoadingSuccessSection() {
  return (
    <PreviewSection label="Loading → Success" wrapClassName="flex flex-col items-center">
      <style>{`@keyframes hyena-spin { to { transform: rotate(360deg) } }`}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <ToastCard
          title="Uploading file..."
          icon={
            <Loader2
              size={16}
              color="#262626"
              style={{ animation: "hyena-spin 1s linear infinite" }}
            />
          }
        />
        <ToastCard
          title="Upload complete"
          titleColor="#14B8A6"
          description="report-q3.pdf uploaded successfully."
          icon={<CheckCircle size={16} color="#14B8A6" />}
        />
        <ToastCard
          title="Upload failed"
          titleColor="#D5143E"
          description="Check your connection and try again."
          icon={<XCircle size={16} color="#D5143E" />}
          actions={<button style={outlineBtn}>Retry</button>}
        />
      </div>
    </PreviewSection>
  )
}

function StackedSection() {
  return (
    <PreviewSection label="Stacked" wrapClassName="flex flex-col items-center">
      <div style={{ position: "relative", height: 120, width: 320 }}>
        {/* Back */}
        <div
          style={{
            ...toastCardStyle,
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%) translateY(-16px) scale(0.94)",
            opacity: 0.4,
            zIndex: 1,
          }}
        >
          <span style={{ fontWeight: 500, fontSize: 13, color: "#262626" }}>File saved</span>
        </div>
        {/* Middle */}
        <div
          style={{
            ...toastCardStyle,
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%) translateY(-8px) scale(0.97)",
            opacity: 0.7,
            zIndex: 2,
          }}
        >
          <span style={{ fontWeight: 500, fontSize: 13, color: "#262626" }}>Invite sent</span>
        </div>
        {/* Front */}
        <div
          style={{
            ...toastCardStyle,
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
          }}
        >
          <span style={{ fontWeight: 500, fontSize: 13, color: "#262626" }}>Payment confirmed</span>
          <span style={{ fontWeight: 400, fontSize: 12.3, color: "#838383" }}>$49.00 charged.</span>
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// INTERACTIVE                                                          //
// ================================================================== //

interface LiveToast {
  id: number
  title: string
  description?: string
  status?: "success" | "error" | "warning" | "info" | "loading"
  action?: string
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  success: { icon: <CheckCircle size={16} color="#14B8A6" />, color: "#14B8A6" },
  error: { icon: <XCircle size={16} color="#D5143E" />, color: "#D5143E" },
  warning: { icon: <AlertTriangle size={16} color="#F97316" />, color: "#F97316" },
  info: { icon: <Info size={16} color="#3B82F6" />, color: "#3B82F6" },
}

function InteractiveSection() {
  const [toasts, setToasts] = useState<LiveToast[]>([])
  const timeoutsRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())
  const nextIdRef = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timeout = timeoutsRef.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      timeoutsRef.current.delete(id)
    }
  }, [])

  const addToast = useCallback(
    (toast: Omit<LiveToast, "id">, duration = 5000) => {
      const id = nextIdRef.current++
      setToasts((prev) => [...prev, { ...toast, id }])
      const timeout = setTimeout(() => dismiss(id), duration)
      timeoutsRef.current.set(id, timeout)
      return id
    },
    [dismiss],
  )

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t))
    }
  }, [])

  const triggerBtnStyle: React.CSSProperties = {
    height: 28,
    padding: "0 14px",
    fontSize: 12.3,
    borderRadius: 10,
    border: "0.8px solid #F0F0F0",
    background: "white",
    color: "#262626",
    cursor: "pointer",
    fontWeight: 500,
  }

  const showDefault = () => {
    addToast({ title: "Event has been created", description: "Monday, January 3rd at 6:00pm" })
  }

  const showSuccess = () => {
    addToast({ title: "Changes saved", status: "success" })
  }

  const showError = () => {
    addToast({
      title: "Something went wrong",
      description: "Please try again later.",
      status: "error",
      action: "Retry",
    })
  }

  const showLoading = () => {
    const id = addToast({ title: "Uploading file...", status: "loading" }, 10000)
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, title: "Upload complete", status: "success" as const, description: undefined }
            : t,
        ),
      )
    }, 2000)
  }

  const showStacked = () => {
    addToast({ title: "File saved" })
    setTimeout(() => addToast({ title: "Invite sent" }), 200)
    setTimeout(() => addToast({ title: "Payment confirmed", description: "$49.00 charged." }), 400)
  }

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-center">
      <style>{`@keyframes hyena-spin { to { transform: rotate(360deg) } }
@keyframes hyena-toast-in { from { transform: translateY(16px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }`}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button style={triggerBtnStyle} onClick={showDefault}>Show default</button>
        <button style={triggerBtnStyle} onClick={showSuccess}>Show success</button>
        <button style={triggerBtnStyle} onClick={showError}>Show error</button>
        <button style={triggerBtnStyle} onClick={showLoading}>Show loading</button>
        <button style={triggerBtnStyle} onClick={showStacked}>Show stacked</button>
      </div>

      {/* Fixed toast container */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 50,
          display: "flex",
          flexDirection: "column-reverse",
          gap: 8,
        }}
      >
        {toasts.map((t) => {
          const cfg = t.status && t.status !== "loading" ? statusConfig[t.status] : null
          return (
            <div
              key={t.id}
              style={{ animation: "hyena-toast-in 250ms ease-out" }}
            >
              <div style={toastCardStyle}>
                <button
                  onClick={() => dismiss(t.id)}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "none",
                    border: "none",
                    padding: 2,
                    cursor: "pointer",
                    color: "#A1A1A1",
                  }}
                >
                  <X size={12} />
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {t.status === "loading" && (
                    <Loader2
                      size={16}
                      color="#262626"
                      style={{ animation: "hyena-spin 1s linear infinite" }}
                    />
                  )}
                  {cfg && cfg.icon}
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 13,
                      color: cfg ? cfg.color : "#262626",
                    }}
                  >
                    {t.title}
                  </span>
                </div>
                {t.description && (
                  <span style={{ fontWeight: 400, fontSize: 12.3, color: "#838383" }}>
                    {t.description}
                  </span>
                )}
                {t.action && (
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: 4 }}>
                    <button style={outlineBtn}>{t.action}</button>
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

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: 28 }}>
      <DefaultSection />
      <StatusSection />
      <WithActionSection />
      <LoadingSuccessSection />
      <StackedSection />
      <InteractiveSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/toast"
      importCode={`import { ToastProvider, toast } from "@/components/ui/toast"`}
      usageCode={`// In your layout\n<ToastProvider position="bottom-right">\n  {children}\n</ToastProvider>\n\n// Trigger toasts anywhere\ntoast({ title: "Event created" })\n\ntoast({\n  title: "Saved",\n  status: "success",\n})\n\ntoast({\n  title: "File deleted",\n  description: "report.pdf moved to trash.",\n  action: { label: "Undo", onClick: () => restore() },\n})\n\ntoast.promise(uploadFile(), {\n  loading: "Uploading...",\n  success: "Upload complete",\n  error: "Upload failed",\n})`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const TOAST_PROVIDER_PROPS: PropDef[] = [
  { prop: "position", type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', defaultVal: '"bottom-right"' },
  { prop: "duration", type: "number (ms)", defaultVal: "5000" },
  { prop: "maxToasts", type: "number", defaultVal: "3" },
]

const TOAST_OPTIONS_PROPS: PropDef[] = [
  { prop: "title", type: "string", defaultVal: "—" },
  { prop: "description", type: "string", defaultVal: "—" },
  { prop: "status", type: '"default" | "success" | "error" | "warning" | "info"', defaultVal: '"default"' },
  { prop: "duration", type: "number (ms)", defaultVal: "5000" },
  { prop: "action", type: '{ label: string, onClick: () => void }', defaultVal: "—" },
  { prop: "dismissible", type: "boolean", defaultVal: "true" },
]

const TOAST_PROMISE_PROPS: PropDef[] = [
  { prop: "loading", type: "string", defaultVal: "—" },
  { prop: "success", type: "string", defaultVal: "—" },
  { prop: "error", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Toast"
      description="A temporary notification system for informing users of action results, with auto-dismiss, stacking, and status variants."
      props={TOAST_PROVIDER_PROPS}
      extraSections={
        <>
          <div style={{ marginTop: "28px" }}>
            <LabelPill text="toast() Options" />
            <div style={{ marginTop: "12px", width: "100%" }}>
              <PropsTable props={TOAST_OPTIONS_PROPS} />
            </div>
          </div>
          <div style={{ marginTop: "28px" }}>
            <LabelPill text="toast.promise() Options" />
            <div style={{ marginTop: "12px", width: "100%" }}>
              <PropsTable props={TOAST_PROMISE_PROPS} />
            </div>
          </div>
        </>
      }
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "6",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Alert", href: "/components/alert" },
    { label: "Popover", href: "/components/popover" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function ToastPage() {
  return (
    <ComponentPageLayout
      name="Toast"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
