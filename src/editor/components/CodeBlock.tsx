"use client"

import { useState, useCallback } from "react"

// ------------------------------------------------------------------ //
// Simple syntax highlighter                                           //
// ------------------------------------------------------------------ //

interface Token {
  text: string
  type: "keyword" | "string" | "identifier" | "comment" | "tag" | "default"
}

const KEYWORDS = new Set([
  "import", "export", "from", "const", "let", "var", "function",
  "return", "default", "async", "await", "if", "else", "new", "true", "false",
])

function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  const src = code

  while (i < src.length) {
    // Comments
    if (src[i] === "/" && src[i + 1] === "/") {
      const end = src.indexOf("\n", i)
      const text = end === -1 ? src.slice(i) : src.slice(i, end)
      tokens.push({ text, type: "comment" })
      i += text.length
      continue
    }

    // Strings
    if (src[i] === '"' || src[i] === "'" || src[i] === "`") {
      const quote = src[i]
      let j = i + 1
      while (j < src.length && src[j] !== quote) {
        if (src[j] === "\\") j++
        j++
      }
      j++ // closing quote
      tokens.push({ text: src.slice(i, j), type: "string" })
      i = j
      continue
    }

    // JSX tags: <Component> or </Component> or <Component
    if (src[i] === "<" && (src[i + 1] === "/" || /[A-Z]/.test(src[i + 1] || ""))) {
      let j = i
      // find the end of the tag
      while (j < src.length && src[j] !== ">") j++
      if (j < src.length) j++ // include >
      tokens.push({ text: src.slice(i, j), type: "tag" })
      i = j
      continue
    }

    // Words
    if (/[a-zA-Z_$]/.test(src[i])) {
      let j = i
      while (j < src.length && /[a-zA-Z0-9_$]/.test(src[j])) j++
      const word = src.slice(i, j)
      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, type: "keyword" })
      } else if (/^[A-Z]/.test(word)) {
        tokens.push({ text: word, type: "identifier" })
      } else {
        tokens.push({ text: word, type: "default" })
      }
      i = j
      continue
    }

    // Everything else
    tokens.push({ text: src[i], type: "default" })
    i++
  }

  return tokens
}

const TOKEN_COLORS: Record<Token["type"], string> = {
  keyword: "#c586c0",
  string: "#ce9178",
  identifier: "#9cdcfe",
  comment: "#6a9955",
  tag: "#569cd6",
  default: "#d4d4d4",
}

function HighlightedCode({ code }: { code: string }) {
  const tokens = tokenize(code)
  return (
    <>
      {tokens.map((t, i) => (
        <span key={i} style={{ color: TOKEN_COLORS[t.type] }}>
          {t.text}
        </span>
      ))}
    </>
  )
}

// ------------------------------------------------------------------ //
// CodeBlock component                                                 //
// ------------------------------------------------------------------ //

interface CodeBlockProps {
  filename: string
  code: string
  highlight?: boolean
}

export function CodeBlock({ filename, code, highlight = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [code])

  return (
    <div
      style={{
        background: "#1a1a1a",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          className="font-mono"
          style={{ fontSize: "12px", color: "#a1a1a1" }}
        >
          {filename}
        </span>
        <button
          onClick={handleCopy}
          className="font-medium transition-colors duration-150"
          style={{
            height: "24px",
            padding: "0 8px",
            borderRadius: "4px",
            fontSize: "11px",
            color: copied ? "#00bb7f" : "#a1a1a1",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)"
              e.currentTarget.style.color = "#e5e5e5"
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.background = "transparent"
              e.currentTarget.style.color = "#a1a1a1"
            }
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code area */}
      <pre
        className="font-mono"
        style={{
          padding: "12px",
          fontSize: "12px",
          lineHeight: 1.6,
          color: "#d4d4d4",
          whiteSpace: "pre",
          overflowX: "auto",
          margin: 0,
        }}
      >
        {highlight ? <HighlightedCode code={code} /> : code}
      </pre>
    </div>
  )
}
