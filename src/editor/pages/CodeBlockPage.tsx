"use client"

import { useState, useCallback } from "react"
import { Copy, Check } from "lucide-react"
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
// TOKENIZER                                                            //
// ================================================================== //

const KEYWORDS = new Set([
  "import", "export", "function", "const", "let", "var", "return", "from",
  "if", "else", "new", "class", "extends", "default", "type", "interface",
  "as", "true", "false", "null", "undefined", "void",
])

function tokenizeLine(line: string): Array<{ text: string; color: string }> {
  const tokens: Array<{ text: string; color: string }> = []
  let i = 0

  while (i < line.length) {
    // Comments
    if (line[i] === "/" && line[i + 1] === "/") {
      tokens.push({ text: line.slice(i), color: "#838383" })
      break
    }
    // Strings
    if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
      const quote = line[i]
      let j = i + 1
      while (j < line.length && line[j] !== quote) {
        if (line[j] === "\\") j++
        j++
      }
      tokens.push({ text: line.slice(i, j + 1), color: "#14B8A6" })
      i = j + 1
      continue
    }
    // Numbers
    if (/\d/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
      let j = i
      while (j < line.length && /[\d.]/.test(line[j])) j++
      tokens.push({ text: line.slice(i, j), color: "#D5143E" })
      i = j
      continue
    }
    // Words
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i
      while (j < line.length && /[\w$]/.test(line[j])) j++
      const word = line.slice(i, j)
      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, color: "#8B5CF6" })
      } else if (j < line.length && line[j] === "=") {
        tokens.push({ text: word, color: "#F97316" })
      } else if (/^[A-Z]/.test(word)) {
        tokens.push({ text: word, color: "#2B7FFF" })
      } else {
        tokens.push({ text: word, color: "#262626" })
      }
      i = j
      continue
    }
    // Punctuation and other
    tokens.push({ text: line[i], color: "#838383" })
    i++
  }
  return tokens
}

// ================================================================== //
// CODE BLOCK DISPLAY                                                   //
// ================================================================== //

interface CodeBlockDisplayProps {
  code: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  showCopyButton?: boolean
}

function CodeBlockDisplay({
  code,
  filename,
  showLineNumbers = false,
  highlightLines = [],
  showCopyButton = true,
}: CodeBlockDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  const lines = code.split("\n")
  const highlightSet = new Set(highlightLines)

  return (
    <div
      style={{
        background: "#FAFAFA",
        border: "0.8px solid #F0F0F0",
        borderRadius: filename ? "0 0 10px 10px" : "10px",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {filename && (
        <div
          style={{
            height: "36px",
            background: "#F0F0F0",
            borderBottom: "0.8px solid #E5E5E5",
            borderRadius: "10px 10px 0 0",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 12.3, fontWeight: 500, color: "#838383" }}>
            {filename}
          </span>
          {showCopyButton && (
            <button
              onClick={handleCopy}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {copied ? (
                <Check size={13} style={{ color: "#14B8A6" }} />
              ) : (
                <Copy size={13} style={{ color: "#838383" }} />
              )}
            </button>
          )}
        </div>
      )}
      <pre
        style={{
          padding: "14px 16px",
          margin: 0,
          overflowX: "auto",
          position: "relative",
          fontFamily: "'Geist Mono', ui-monospace, monospace",
          fontSize: 13,
          lineHeight: 1.6,
          color: "#262626",
          tabSize: 2,
          whiteSpace: "pre",
        }}
      >
        {!filename && showCopyButton && (
          <button
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 24,
              height: 24,
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: hovered ? 1 : 0,
              transition: "opacity 150ms",
            }}
          >
            {copied ? (
              <Check size={13} style={{ color: "#14B8A6" }} />
            ) : (
              <Copy size={13} style={{ color: "#838383" }} />
            )}
          </button>
        )}
        {lines.map((line, idx) => {
          const lineNum = idx + 1
          const isHighlighted = highlightSet.has(lineNum)
          const tokenized = tokenizeLine(line)

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                background: isHighlighted ? "rgba(43,127,255,0.06)" : undefined,
                margin: isHighlighted ? "0 -16px" : undefined,
                padding: isHighlighted ? "0 16px" : undefined,
              }}
            >
              {showLineNumbers && (
                <span
                  style={{
                    width: 32,
                    paddingRight: 12,
                    textAlign: "right" as const,
                    fontSize: 12.3,
                    color: isHighlighted ? "#2B7FFF" : "#C0C0C0",
                    userSelect: "none" as const,
                    flexShrink: 0,
                  }}
                >
                  {lineNum}
                </span>
              )}
              <span style={{ paddingLeft: showLineNumbers ? 16 : undefined }}>
                {tokenized.length > 0 ? (
                  tokenized.map((tok, ti) => (
                    <span key={ti} style={{ color: tok.color }}>
                      {tok.text}
                    </span>
                  ))
                ) : (
                  "\n"
                )}
              </span>
            </div>
          )
        })}
      </pre>
    </div>
  )
}

// ================================================================== //
// SAMPLE CODE                                                          //
// ================================================================== //

const CODE_DEFAULT = `const greeting = "Hello, Hyena";
console.log(greeting);`

const CODE_FILENAME = `export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}`

const CODE_LINE_NUMBERS = `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`

const CODE_HIGHLIGHT = `import { useState } from "react";

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(v => !v);
  return [value, toggle] as const;
}`

const CODE_TSX = `export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge">{children}</span>;
}`

const CODE_CSS = `.badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--color-muted);
}`

const CODE_SHELL = `npm install @hyena-studio/ui
npx hyena-studio init`

const LANGUAGE_SAMPLES: Record<string, { code: string; filename: string }> = {
  typescript: { code: CODE_LINE_NUMBERS, filename: "counter.tsx" },
  javascript: {
    code: `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`,
    filename: "counter.jsx",
  },
  css: { code: CODE_CSS, filename: "styles.css" },
  shell: { code: CODE_SHELL, filename: "install.sh" },
}

// ================================================================== //
// PREVIEW SECTIONS                                                     //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default" wrapClassName="flex flex-col items-stretch w-full">
      <CodeBlockDisplay code={CODE_DEFAULT} />
    </PreviewSection>
  )
}

function FilenameSection() {
  return (
    <PreviewSection label="With Filename" wrapClassName="flex flex-col items-stretch w-full">
      <CodeBlockDisplay code={CODE_FILENAME} filename="utils.ts" />
    </PreviewSection>
  )
}

function LineNumbersSection() {
  return (
    <PreviewSection label="With Line Numbers" wrapClassName="flex flex-col items-stretch w-full">
      <CodeBlockDisplay code={CODE_LINE_NUMBERS} showLineNumbers />
    </PreviewSection>
  )
}

function HighlightSection() {
  return (
    <PreviewSection label="With Highlighting" wrapClassName="flex flex-col items-stretch w-full">
      <CodeBlockDisplay code={CODE_HIGHLIGHT} showLineNumbers highlightLines={[4, 5, 6]} />
    </PreviewSection>
  )
}

function LanguagesSection() {
  return (
    <PreviewSection label="Languages" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <CodeBlockDisplay code={CODE_TSX} filename="component.tsx" />
        <CodeBlockDisplay code={CODE_CSS} filename="styles.css" />
        <CodeBlockDisplay code={CODE_SHELL} filename="install.sh" />
      </div>
    </PreviewSection>
  )
}

function InteractiveSection() {
  const [language, setLanguage] = useState("typescript")

  const sample = LANGUAGE_SAMPLES[language]

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-stretch w-full">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          height: 28,
          width: 160,
          border: "0.8px solid #F0F0F0",
          borderRadius: 10,
          fontSize: 12.3,
          padding: "0 10px",
          marginBottom: 10,
          outline: "none",
          background: "white",
          cursor: "pointer",
        }}
      >
        <option value="typescript">TypeScript</option>
        <option value="javascript">JavaScript</option>
        <option value="css">CSS</option>
        <option value="shell">Shell</option>
      </select>
      <CodeBlockDisplay code={sample.code} filename={sample.filename} showLineNumbers />
    </PreviewSection>
  )
}

// ================================================================== //
// CODE TAB                                                             //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/code-block"
      importCode={`import { CodeBlock } from "@/components/ui/code-block"`}
      usageCode={`<CodeBlock language="typescript">\n  {\`const x = 42;\`}\n</CodeBlock>\n\n// With filename\n<CodeBlock language="typescript" filename="utils.ts">\n  {\`export function cn(...inputs) { ... }\`}\n</CodeBlock>\n\n// With line numbers and highlighting\n<CodeBlock\n  language="typescript"\n  filename="hook.ts"\n  showLineNumbers\n  highlightLines={[4, 5, 6]}\n>\n  {code}\n</CodeBlock>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const CODE_BLOCK_PROPS: PropDef[] = [
  { prop: "children", type: "string", defaultVal: "\u2014" },
  { prop: "language", type: '"typescript" | "javascript" | "css" | "html" | "json" | "shell"', defaultVal: '"typescript"' },
  { prop: "filename", type: "string", defaultVal: "\u2014" },
  { prop: "showLineNumbers", type: "boolean", defaultVal: "false" },
  { prop: "highlightLines", type: "number[]", defaultVal: "[]" },
  { prop: "showCopyButton", type: "boolean", defaultVal: "true" },
  { prop: "maxHeight", type: "string", defaultVal: "\u2014" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Code Block"
      description="A syntax-highlighted code display with copy button, optional line numbers, and filename header."
      props={CODE_BLOCK_PROPS}
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
    { label: "Copy Button", href: "/components/copy-button" },
    { label: "Kbd", href: "/components/kbd" },
    { label: "Tabs", href: "/components/tabs" },
  ],
  tokens: [
    { name: "--code-bg", color: "#FAFAFA" },
    { name: "--code-border", color: "#F0F0F0", border: true },
    { name: "--syntax-keyword", color: "#8B5CF6" },
    { name: "--syntax-string", color: "#14B8A6" },
    { name: "--syntax-type", color: "#2B7FFF" },
    { name: "--syntax-property", color: "#F97316" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function CodeBlockPage() {
  return (
    <ComponentPageLayout
      name="Code Block"
      previewContent={
        <div className="flex flex-col" style={{ gap: "28px" }}>
          <DefaultSection />
          <FilenameSection />
          <LineNumbersSection />
          <HighlightSection />
          <LanguagesSection />
          <InteractiveSection />
        </div>
      }
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
