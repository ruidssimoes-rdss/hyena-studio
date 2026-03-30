"use client"

import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  PropsTable,
  LabelPill,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"

// ================================================================== //
// SHARED                                                               //
// ================================================================== //

const avatarBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#F0F0F0",
  border: "0.8px solid rgba(0,0,0,0.06)",
  color: "#838383",
  fontWeight: 500,
  flexShrink: 0,
}

function Avatar({
  size = 32,
  fontSize = 13,
  initials = "RS",
  radius = "50%",
  bg,
  style,
  children,
}: {
  size?: number
  fontSize?: number
  initials?: string
  radius?: string
  bg?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}) {
  return (
    <div
      style={{
        ...avatarBase,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: radius,
        fontSize: `${fontSize}px`,
        ...(bg ? { background: bg } : {}),
        ...style,
      }}
    >
      {children ?? initials}
    </div>
  )
}

// ================================================================== //
// SECTION 1: SIZES                                                     //
// ================================================================== //

function SizesSection() {
  const sizes = [
    { label: "xl", size: 48, fs: 18, initials: "RS" },
    { label: "lg", size: 40, fs: 16, initials: "RS" },
    { label: "default", size: 32, fs: 13, initials: "RS" },
    { label: "sm", size: 28, fs: 11, initials: "RS" },
    { label: "xs", size: 20, fs: 9, initials: "R" },
  ]
  return (
    <PreviewSection label="Sizes">
      {sizes.map((s) => (
        <Avatar key={s.label} size={s.size} fontSize={s.fs} initials={s.initials} />
      ))}
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 2: FALLBACK                                                  //
// ================================================================== //

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5.5" r="2.5" fill="#838383" />
      <path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" fill="#838383" />
    </svg>
  )
}

function FallbackSection() {
  return (
    <PreviewSection label="Fallback">
      {/* With image (simulated as solid dark bg) */}
      <Avatar size={32} fontSize={13} bg="#262626" style={{ border: "none", color: "#262626" }} initials="" />
      {/* With initials */}
      <Avatar size={32} fontSize={13} initials="AB" />
      {/* With icon */}
      <Avatar size={32} fontSize={13} initials="">
        <UserIcon />
      </Avatar>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 3: SHAPES                                                    //
// ================================================================== //

function ShapesSection() {
  return (
    <PreviewSection label="Shapes">
      <Avatar size={32} fontSize={13} initials="RS" radius="50%" />
      <Avatar size={32} fontSize={13} initials="RS" radius="8px" />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 4: WITH STATUS                                               //
// ================================================================== //

function AvatarWithStatus({
  initials,
  statusColor,
}: {
  initials: string
  statusColor: string
}) {
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <Avatar size={32} fontSize={13} initials={initials} />
      <div
        style={{
          position: "absolute",
          bottom: "-1px",
          right: "-1px",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: statusColor,
          border: "2px solid #FFFFFF",
        }}
      />
    </div>
  )
}

function WithStatusSection() {
  return (
    <PreviewSection label="With Status">
      <AvatarWithStatus initials="RS" statusColor="#14B8A6" />
      <AvatarWithStatus initials="JD" statusColor="#F97316" />
      <AvatarWithStatus initials="MK" statusColor="#D4D4D4" />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 5: GROUP                                                     //
// ================================================================== //

function AvatarGroup({ items }: { items: Array<{ initials: string; bg: string }> }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : "-8px",
            zIndex: items.length - i,
          }}
        >
          <Avatar
            size={32}
            fontSize={13}
            initials={item.initials}
            bg={item.bg}
            style={{ border: "2px solid #FFFFFF" }}
          />
        </div>
      ))}
    </div>
  )
}

function GroupSection() {
  return (
    <PreviewSection label="Group">
      {/* Small group */}
      <AvatarGroup
        items={[
          { initials: "RS", bg: "#F0F0F0" },
          { initials: "JD", bg: "#E8E0F0" },
          { initials: "MK", bg: "#E0F0F0" },
          { initials: "AB", bg: "#F0E8E0" },
        ]}
      />
      {/* With overflow */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        {[
          { initials: "RS", bg: "#F0F0F0" },
          { initials: "JD", bg: "#E8E0F0" },
          { initials: "MK", bg: "#E0F0F0" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              marginLeft: i === 0 ? 0 : "-8px",
              zIndex: 4 - i,
            }}
          >
            <Avatar
              size={32}
              fontSize={13}
              initials={item.initials}
              bg={item.bg}
              style={{ border: "2px solid #FFFFFF" }}
            />
          </div>
        ))}
        <div
          style={{
            marginLeft: "-8px",
            zIndex: 0,
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#F0F0F0",
            border: "2px solid #FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 500,
            color: "#838383",
          }}
        >
          +5
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 6: WITH RING                                                 //
// ================================================================== //

function WithRingSection() {
  return (
    <PreviewSection label="With Ring">
      {/* Active ring via box-shadow */}
      <Avatar
        size={32}
        fontSize={13}
        initials="RS"
        style={{ boxShadow: "0 0 0 2px #FFFFFF, 0 0 0 4px #14B8A6" }}
      />
      {/* Story ring via gradient wrapper */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #F97316, #D5143E, #B392F0)",
          padding: "2px",
        }}
      >
        <Avatar
          size={32}
          fontSize={13}
          initials="JD"
          style={{ border: "2px solid #FFFFFF" }}
        />
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 7: WITH BADGE                                                //
// ================================================================== //

function AvatarWithBadge({ initials, badge }: { initials: string; badge: string }) {
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <Avatar size={32} fontSize={13} initials={initials} />
      <div
        style={{
          position: "absolute",
          top: "-4px",
          right: "-4px",
          minWidth: "16px",
          height: "16px",
          borderRadius: "8px",
          background: "#D5143E",
          color: "#FFFFFF",
          fontSize: "9px",
          fontWeight: 600,
          padding: "0 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #FFFFFF",
        }}
      >
        {badge}
      </div>
    </div>
  )
}

function WithBadgeSection() {
  return (
    <PreviewSection label="With Badge">
      <AvatarWithBadge initials="RS" badge="3" />
      <AvatarWithBadge initials="JD" badge="99+" />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 8: LOADING                                                   //
// ================================================================== //

function LoadingSection() {
  return (
    <PreviewSection label="Loading">
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "#F0F0F0",
          border: "0.8px solid rgba(0,0,0,0.06)",
          animation: "avatar-pulse 1.8s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes avatar-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </PreviewSection>
  )
}

// ================================================================== //
// PREVIEW TAB                                                          //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <SizesSection />
      <FallbackSection />
      <ShapesSection />
      <WithStatusSection />
      <GroupSection />
      <WithRingSection />
      <WithBadgeSection />
      <LoadingSection />
    </div>
  )
}

// ================================================================== //
// CODE TAB                                                             //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/avatar"
      importCode={`import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"`}
      usageCode={`<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>RS</AvatarFallback>
</Avatar>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const AVATAR_PROPS: PropDef[] = [
  { prop: "size", type: '"xs" | "sm" | "default" | "lg" | "xl"', defaultVal: '"default"' },
  { prop: "shape", type: '"circle" | "square"', defaultVal: '"circle"' },
  { prop: "className", type: "string", defaultVal: "—" },
]

const AVATAR_IMAGE_PROPS: PropDef[] = [
  { prop: "src", type: "string", defaultVal: "—" },
  { prop: "alt", type: "string", defaultVal: "—" },
]

const AVATAR_FALLBACK_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <div>
      <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#262626", marginBottom: "4px" }}>
        Avatar
      </h2>
      <p style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272", lineHeight: 1.6, marginBottom: "24px" }}>
        A circular image element with fallback support for initials or icons.
      </p>

      <LabelPill text="Avatar Props" />
      <div style={{ marginTop: "12px", width: "100%", marginBottom: "24px" }}>
        <PropsTable props={AVATAR_PROPS} />
      </div>

      <LabelPill text="AvatarImage Props" />
      <div style={{ marginTop: "12px", width: "100%", marginBottom: "24px" }}>
        <PropsTable props={AVATAR_IMAGE_PROPS} />
      </div>

      <LabelPill text="AvatarFallback Props" />
      <div style={{ marginTop: "12px", width: "100%" }}>
        <PropsTable props={AVATAR_FALLBACK_PROPS} />
      </div>
    </div>
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "8",
  sizes: "5 (xs, sm, default, lg, xl)",
  deps: "cn",
  related: [
    { label: "Badge", href: "/components/badge" },
    { label: "Tooltip", href: "/components/tooltip" },
    { label: "Skeleton", href: "/components/skeleton" },
  ],
  tokens: [
    { name: "--secondary", color: "#F0F0F0", border: true },
    { name: "--muted-fg", color: "#838383" },
    { name: "--success", color: "#14B8A6" },
    { name: "--warning", color: "#F97316" },
    { name: "--error", color: "#D5143E" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function AvatarPage() {
  return (
    <ComponentPageLayout
      name="Avatar"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
