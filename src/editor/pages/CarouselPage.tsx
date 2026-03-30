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
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Image,
  Layout,
  Palette,
  Code2,
  Sparkles,
} from "lucide-react"

// ================================================================== //
// HELPERS                                                              //
// ================================================================== //

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right" | "up" | "down"
  onClick: () => void
  disabled?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const icons = {
    left: ChevronLeft,
    right: ChevronRight,
    up: ChevronUp,
    down: ChevronDown,
  }
  const Icon = icons[direction]
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        background: hovered && !disabled ? "#F0F0F0" : "#FFFFFF",
        border: "0.8px solid #F0F0F0",
        boxShadow:
          hovered && !disabled
            ? "0 2px 10px rgba(0,0,0,0.08)"
            : "0 2px 8px rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "all 150ms ease",
        padding: 0,
        flexShrink: 0,
      }}
    >
      <Icon size={16} style={{ color: "#262626" }} />
    </button>
  )
}

function DotIndicators({
  total,
  active,
  onDotClick,
  vertical,
}: {
  total: number
  active: number
  onDotClick?: (i: number) => void
  vertical?: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        gap: 6,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          onClick={() => onDotClick?.(i)}
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            background: i === active ? "#262626" : "#E5E5E5",
            cursor: onDotClick ? "pointer" : "default",
            transition: "background 150ms ease",
          }}
        />
      ))}
    </div>
  )
}

// ================================================================== //
// HORIZONTAL CAROUSEL                                                  //
// ================================================================== //

interface CarouselProps {
  slides: React.ReactNode[]
  showArrows?: boolean
  showDots?: boolean
  loop?: boolean
  autoplay?: boolean
  autoplayInterval?: number
  itemsPerView?: number
  gap?: number
  slideHeight?: number
}

function HorizontalCarousel({
  slides,
  showArrows = true,
  showDots = true,
  loop = false,
  autoplay = false,
  autoplayInterval = 4000,
  itemsPerView = 1,
  gap = 0,
  slideHeight,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const hoveredRef = useRef(false)

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const effectiveWidth = containerWidth || 540
  const maxIndex =
    itemsPerView > 1
      ? Math.max(0, slides.length - itemsPerView)
      : slides.length - 1

  const itemWidth =
    itemsPerView > 1
      ? (effectiveWidth - (itemsPerView - 1) * gap) / itemsPerView
      : effectiveWidth

  const offset =
    itemsPerView > 1
      ? activeIndex * (itemWidth + gap)
      : activeIndex * effectiveWidth

  const goTo = useCallback(
    (idx: number) => {
      if (loop) {
        setActiveIndex(((idx % slides.length) + slides.length) % slides.length)
      } else {
        setActiveIndex(Math.max(0, Math.min(idx, maxIndex)))
      }
    },
    [loop, slides.length, maxIndex],
  )

  const prev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex])
  const next = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex])

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(() => {
      if (!hoveredRef.current) {
        goTo(activeIndex + 1)
      }
    }, autoplayInterval)
    return () => clearInterval(id)
  }, [autoplay, autoplayInterval, activeIndex, goTo])

  const dotCount = itemsPerView > 1 ? maxIndex + 1 : slides.length

  return (
    <div
      style={{ position: "relative", width: "100%" }}
      onMouseEnter={() => {
        hoveredRef.current = true
      }}
      onMouseLeave={() => {
        hoveredRef.current = false
      }}
    >
      <div
        ref={containerRef}
        style={{ overflow: "hidden", borderRadius: 10, width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            gap: itemsPerView > 1 ? gap : 0,
            transition: "transform 300ms ease",
            transform: `translateX(-${offset}px)`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: itemWidth,
                height: slideHeight,
              }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: -16,
              transform: "translateY(-50%)",
            }}
          >
            <ArrowButton
              direction="left"
              onClick={prev}
              disabled={!loop && activeIndex === 0}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: -16,
              transform: "translateY(-50%)",
            }}
          >
            <ArrowButton
              direction="right"
              onClick={next}
              disabled={!loop && activeIndex >= maxIndex}
            />
          </div>
        </>
      )}

      {showDots && (
        <div style={{ marginTop: 12 }}>
          <DotIndicators
            total={dotCount}
            active={activeIndex}
            onDotClick={goTo}
          />
        </div>
      )}
    </div>
  )
}

// ================================================================== //
// VERTICAL CAROUSEL                                                    //
// ================================================================== //

function VerticalCarousel({
  slides,
  slideHeight = 200,
}: {
  slides: React.ReactNode[]
  slideHeight?: number
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  const offset = activeIndex * slideHeight

  function prev() {
    setActiveIndex((i) => Math.max(0, i - 1))
  }

  function next() {
    setActiveIndex((i) => Math.min(slides.length - 1, i + 1))
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{
          overflow: "hidden",
          borderRadius: 10,
          width: "100%",
          height: slideHeight,
        }}
      >
        <div
          style={{
            transition: "transform 300ms ease",
            transform: `translateY(-${offset}px)`,
          }}
        >
          {slides.map((slide, i) => (
            <div key={i} style={{ height: slideHeight, width: "100%" }}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Top arrow */}
      <div
        style={{
          position: "absolute",
          top: -16,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ArrowButton
          direction="up"
          onClick={prev}
          disabled={activeIndex === 0}
        />
      </div>

      {/* Bottom arrow */}
      <div
        style={{
          position: "absolute",
          bottom: -16,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ArrowButton
          direction="down"
          onClick={next}
          disabled={activeIndex === slides.length - 1}
        />
      </div>

      {/* Vertical dots on right */}
      <div
        style={{
          position: "absolute",
          right: -20,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <DotIndicators
          total={slides.length}
          active={activeIndex}
          onDotClick={setActiveIndex}
          vertical
        />
      </div>
    </div>
  )
}

// ================================================================== //
// PREVIEW SECTIONS                                                     //
// ================================================================== //

function DefaultSection() {
  const slides = Array.from({ length: 5 }, (_, i) => (
    <div
      style={{
        height: 200,
        background: "#FAFAFA",
        border: "0.8px solid #F0F0F0",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        fontWeight: 500,
        color: "#838383",
      }}
    >
      {i + 1}
    </div>
  ))

  return (
    <PreviewSection
      label="Default"
      wrapClassName="flex flex-col items-stretch w-full"
    >
      <HorizontalCarousel slides={slides} slideHeight={200} />
    </PreviewSection>
  )
}

function WithCardsSection() {
  const cards = [
    {
      title: "Button",
      desc: "Versatile button component with 8 interaction states",
    },
    {
      title: "Dialog",
      desc: "Modal dialog with form, loading, and success lifecycle",
    },
    {
      title: "Toast",
      desc: "Notification system with 6 variant types",
    },
    {
      title: "Command",
      desc: "Command palette with search and keyboard navigation",
    },
    {
      title: "Calendar",
      desc: "Date selection with range, presets, and disabled dates",
    },
    {
      title: "Menu",
      desc: "Dropdown menu with groups, shortcuts, and danger zone",
    },
    {
      title: "Form",
      desc: "Complete form with validation and submission flow",
    },
  ]

  const slides = cards.map((card) => (
    <div
      style={{
        background: "#FFFFFF",
        border: "0.8px solid #F0F0F0",
        borderRadius: 10,
        padding: 16,
        minHeight: 160,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}>
        {card.title}
      </div>
      <div
        style={{
          fontSize: 12.3,
          fontWeight: 400,
          color: "#838383",
          marginTop: 4,
        }}
      >
        {card.desc}
      </div>
    </div>
  ))

  return (
    <PreviewSection
      label="With Cards"
      wrapClassName="flex flex-col items-stretch w-full"
    >
      <HorizontalCarousel
        slides={slides}
        itemsPerView={3}
        gap={12}
        slideHeight={160}
      />
    </PreviewSection>
  )
}

function AutoplaySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const hoveredRef = useRef(false)

  const colorSlides = [
    { bg: "rgba(59,130,246,0.06)", text: "#3B82F6" },
    { bg: "rgba(20,184,166,0.06)", text: "#14B8A6" },
    { bg: "rgba(249,115,22,0.06)", text: "#F97316" },
    { bg: "rgba(139,92,246,0.06)", text: "#8B5CF6" },
  ]

  const goTo = useCallback(
    (idx: number) => {
      const next =
        ((idx % colorSlides.length) + colorSlides.length) % colorSlides.length
      setActiveIndex(next)
      setProgressKey((k) => k + 1)
    },
    [colorSlides.length],
  )

  useEffect(() => {
    const id = setInterval(() => {
      if (!hoveredRef.current) {
        goTo(activeIndex + 1)
      }
    }, 4000)
    return () => clearInterval(id)
  }, [activeIndex, goTo])

  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const effectiveWidth = containerWidth || 540
  const offset = activeIndex * effectiveWidth

  return (
    <PreviewSection
      label="Autoplay"
      wrapClassName="flex flex-col items-stretch w-full"
    >
      <div
        style={{ position: "relative", width: "100%" }}
        onMouseEnter={() => {
          hoveredRef.current = true
          setPaused(true)
        }}
        onMouseLeave={() => {
          hoveredRef.current = false
          setPaused(false)
        }}
      >
        <div
          ref={containerRef}
          style={{ overflow: "hidden", borderRadius: 10, width: "100%" }}
        >
          <div
            style={{
              display: "flex",
              transition: "transform 300ms ease",
              transform: `translateX(-${offset}px)`,
            }}
          >
            {colorSlides.map((slide, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: effectiveWidth,
                  height: 200,
                  background: slide.bg,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 500,
                  color: slide.text,
                }}
              >
                {slide.text}
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: -16,
            transform: "translateY(-50%)",
          }}
        >
          <ArrowButton
            direction="left"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: -16,
            transform: "translateY(-50%)",
          }}
        >
          <ArrowButton
            direction="right"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === colorSlides.length - 1}
          />
        </div>
      </div>

      {/* Dots */}
      <div style={{ marginTop: 12 }}>
        <DotIndicators
          total={colorSlides.length}
          active={activeIndex}
          onDotClick={goTo}
        />
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: 2,
          background: "#F0F0F0",
          borderRadius: 1,
          marginTop: 8,
          overflow: "hidden",
        }}
      >
        <style>{`@keyframes hyena-progress { from { width: 0% } to { width: 100% } }`}</style>
        <div
          key={progressKey}
          style={{
            height: 2,
            background: "#262626",
            borderRadius: 1,
            animation: "hyena-progress 4s linear",
            animationPlayState: paused ? "paused" : "running",
            animationFillMode: "forwards",
          }}
        />
      </div>
    </PreviewSection>
  )
}

function VerticalSection() {
  const slides = Array.from({ length: 4 }, (_, i) => (
    <div
      style={{
        height: 200,
        width: "100%",
        background: "#FAFAFA",
        border: "0.8px solid #F0F0F0",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        fontWeight: 500,
        color: "#838383",
      }}
    >
      {i + 1}
    </div>
  ))

  return (
    <PreviewSection
      label="Vertical"
      wrapClassName="flex flex-col items-stretch w-full"
    >
      <VerticalCarousel slides={slides} slideHeight={200} />
    </PreviewSection>
  )
}

function LoopSection() {
  const slides = Array.from({ length: 4 }, (_, i) => (
    <div
      style={{
        height: 200,
        background: "#FAFAFA",
        border: "0.8px solid #F0F0F0",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        fontWeight: 500,
        color: "#838383",
      }}
    >
      {i + 1}
    </div>
  ))

  return (
    <PreviewSection
      label="Loop"
      wrapClassName="flex flex-col items-stretch w-full"
    >
      <HorizontalCarousel slides={slides} slideHeight={200} loop />
    </PreviewSection>
  )
}

function InteractiveSection() {
  const [autoplayOn, setAutoplayOn] = useState(false)
  const [loopOn, setLoopOn] = useState(false)
  const [dotsOn, setDotsOn] = useState(true)

  const iconSlides: {
    icon: React.ElementType
    label: string
    color: string
    bg: string
  }[] = [
    {
      icon: Image,
      label: "Gallery",
      color: "#3B82F6",
      bg: "rgba(59,130,246,0.06)",
    },
    {
      icon: Layout,
      label: "Layouts",
      color: "#14B8A6",
      bg: "rgba(20,184,166,0.06)",
    },
    {
      icon: Palette,
      label: "Themes",
      color: "#F97316",
      bg: "rgba(249,115,22,0.06)",
    },
    {
      icon: Code2,
      label: "Code",
      color: "#8B5CF6",
      bg: "rgba(139,92,246,0.06)",
    },
    {
      icon: Sparkles,
      label: "Magic",
      color: "#EC4899",
      bg: "rgba(236,72,153,0.06)",
    },
  ]

  const slides = iconSlides.map((s) => {
    const IconComp = s.icon
    return (
      <div
        style={{
          height: 200,
          background: s.bg,
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <IconComp size={48} style={{ color: s.color }} />
        <span style={{ fontSize: 14, fontWeight: 500, color: s.color }}>
          {s.label}
        </span>
      </div>
    )
  })

  function Toggle({
    label,
    checked,
    onChange,
  }: {
    label: string
    checked: boolean
    onChange: (v: boolean) => void
  }) {
    return (
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => onChange(!checked)}
      >
        <div
          style={{
            width: 36,
            height: 20,
            borderRadius: 10,
            background: checked ? "#262626" : "#E5E5E5",
            position: "relative",
            transition: "background 150ms ease",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              background: "#FFFFFF",
              boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
              position: "absolute",
              top: 2,
              left: checked ? 18 : 2,
              transition: "left 150ms ease",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 400,
            color: "#838383",
            marginLeft: 6,
          }}
        >
          {label}
        </span>
      </div>
    )
  }

  return (
    <PreviewSection
      label="Interactive"
      wrapClassName="flex flex-col items-stretch w-full"
    >
      <HorizontalCarousel
        slides={slides}
        slideHeight={200}
        autoplay={autoplayOn}
        autoplayInterval={4000}
        loop={loopOn}
        showDots={dotsOn}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 16,
          flexWrap: "wrap",
          marginTop: 12,
          alignItems: "center",
        }}
      >
        <Toggle
          label="Autoplay"
          checked={autoplayOn}
          onChange={setAutoplayOn}
        />
        <Toggle label="Loop" checked={loopOn} onChange={setLoopOn} />
        <Toggle label="Dots" checked={dotsOn} onChange={setDotsOn} />
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
      <WithCardsSection />
      <AutoplaySection />
      <VerticalSection />
      <LoopSection />
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
      packageName="@hyena/carousel"
      importCode={`import {\n  Carousel,\n  CarouselContent,\n  CarouselItem,\n  CarouselPrevious,\n  CarouselNext,\n  CarouselDots,\n} from "@/components/ui/carousel"`}
      usageCode={`<Carousel>\n  <CarouselContent>\n    <CarouselItem>Slide 1</CarouselItem>\n    <CarouselItem>Slide 2</CarouselItem>\n    <CarouselItem>Slide 3</CarouselItem>\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n  <CarouselDots />\n</Carousel>\n\n// Multiple items\n<Carousel itemsPerView={3} gap={12}>\n  ...\n</Carousel>\n\n// Autoplay\n<Carousel autoplay autoplayInterval={4000} pauseOnHover>\n  ...\n</Carousel>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const CAROUSEL_PROPS: PropDef[] = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    defaultVal: '"horizontal"',
  },
  { prop: "loop", type: "boolean", defaultVal: "false" },
  { prop: "autoplay", type: "boolean", defaultVal: "false" },
  { prop: "autoplayInterval", type: "number", defaultVal: "4000" },
  { prop: "pauseOnHover", type: "boolean", defaultVal: "true" },
  { prop: "itemsPerView", type: "number", defaultVal: "1" },
  { prop: "gap", type: "number", defaultVal: "0" },
  { prop: "startIndex", type: "number", defaultVal: "0" },
  { prop: "onSlideChange", type: "(index: number) => void", defaultVal: "\u2014" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Carousel"
      description="An image/content slider with dots, arrow navigation, and autoplay support."
      props={CAROUSEL_PROPS}
    />
  )
}

// ================================================================== //
// CAP DATA                                                             //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Display",
  variants: "6",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Card", href: "/components/card" },
    { label: "Scroll Area", href: "/components/scroll-area" },
    { label: "Tabs", href: "/components/tabs" },
  ],
  tokens: [
    { name: "--carousel-arrow-bg", color: "#FFFFFF", border: true },
    { name: "--carousel-arrow-border", color: "#F0F0F0", border: true },
    { name: "--carousel-dot-active", color: "#262626" },
    { name: "--carousel-dot-inactive", color: "#E5E5E5", border: true },
    { name: "--carousel-progress-fill", color: "#262626" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function CarouselPage() {
  return (
    <ComponentPageLayout
      name="Carousel"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
