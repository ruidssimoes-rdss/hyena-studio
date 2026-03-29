// ------------------------------------------------------------------ //
// Triple-nested main content container                                //
// DESIGN-SPEC.md Section 4.3 — DO NOT flatten to two layers           //
//                                                                     //
// Layer 3 (inner) uses a flex column layout:                          //
//   - Sticky header zone (breadcrumb + tabs) with fade mask           //
//   - Scrollable content body                                         //
// ------------------------------------------------------------------ //

export function ContentArea({ children }: { children: React.ReactNode }) {
  return (
    /* Layer 1: Outer wrapper */
    <div
      className="w-full h-full overflow-hidden"
      style={{
        maxWidth: "926px",
        background: "rgba(240, 240, 240, 0.5)",
        border: "1px solid #f0f0f0",
        borderRadius: "12px",
        padding: "4px",
      }}
    >
      {/* Layer 2: Middle container */}
      <div
        className="h-full overflow-hidden"
        style={{
          background: "white",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          borderRadius: "14px",
        }}
      >
        {/* Layer 3: Inner content panel */}
        <div
          className="h-full overflow-y-auto relative"
          style={{
            background: "white",
            border: "1px solid #f0f0f0",
            borderRadius: "10px",
            padding: "0 126px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
