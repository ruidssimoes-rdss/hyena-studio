"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import {
  Upload, FileText, ImageIcon, File, X, Check, AlertCircle,
} from "lucide-react"
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
// SHARED STYLES                                                        //
// ================================================================== //

const dropzoneBase: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "1.5px dashed #E5E5E5",
  borderRadius: "10px",
  background: "transparent",
  cursor: "pointer",
  transition: "background 150ms, border-color 150ms",
}

const fileRowStyle: React.CSSProperties = {
  padding: "10px 12px",
  background: "#FAFAFA",
  border: "0.8px solid #F0F0F0",
  borderRadius: "8px",
}

// ================================================================== //
// SECTION 1 — Default                                                  //
// ================================================================== //

function DefaultSection() {
  const [highlight, setHighlight] = useState(false)

  return (
    <PreviewSection label="Default" wrapClassName="flex flex-col items-stretch w-full">
      <div
        style={{
          ...dropzoneBase,
          height: "160px",
          background: highlight ? "rgba(43,127,255,0.02)" : "transparent",
          borderColor: highlight ? "#C0C0C0" : "#E5E5E5",
        }}
        onMouseEnter={() => setHighlight(true)}
        onMouseLeave={() => setHighlight(false)}
        onClick={() => {
          setHighlight(true)
          setTimeout(() => setHighlight(false), 300)
        }}
      >
        <Upload style={{ width: "32px", height: "32px", color: "#C0C0C0", marginBottom: "12px" }} />
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
          Drag &amp; drop files here
        </span>
        <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#838383", marginTop: "4px" }}>
          or click to browse
        </span>
        <span style={{ fontSize: "11px", fontWeight: 400, color: "#C0C0C0", marginTop: "6px" }}>
          PNG, JPG, PDF up to 10MB
        </span>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 2 — With File List                                           //
// ================================================================== //

interface SampleFile {
  id: string
  name: string
  size: string
  type: "doc" | "image" | "generic"
}

const INITIAL_FILES: SampleFile[] = [
  { id: "1", name: "design-spec.pdf", size: "2.4 MB", type: "doc" },
  { id: "2", name: "screenshot.png", size: "856 KB", type: "image" },
  { id: "3", name: "readme.md", size: "12 KB", type: "generic" },
]

function FileIcon({ type, size = 16 }: { type: SampleFile["type"]; size?: number }) {
  const style = { width: `${size}px`, height: `${size}px`, color: "#838383", flexShrink: 0 }
  if (type === "doc") return <FileText style={style} />
  if (type === "image") return <ImageIcon style={style} />
  return <File style={style} />
}

function FileListSection() {
  const [files, setFiles] = useState<SampleFile[]>(INITIAL_FILES)

  return (
    <PreviewSection label="With File List" wrapClassName="flex flex-col items-stretch w-full">
      <div
        style={{ ...dropzoneBase, height: "120px" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(43,127,255,0.02)"
          e.currentTarget.style.borderColor = "#C0C0C0"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent"
          e.currentTarget.style.borderColor = "#E5E5E5"
        }}
      >
        <Upload style={{ width: "32px", height: "32px", color: "#C0C0C0", marginBottom: "8px" }} />
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
          Drag &amp; drop files here
        </span>
        <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#838383", marginTop: "4px" }}>
          or click to browse
        </span>
      </div>

      <div className="flex flex-col" style={{ gap: "8px", marginTop: "12px" }}>
        {files.map((file) => (
          <div key={file.id} className="flex items-center" style={fileRowStyle}>
            <FileIcon type={file.type} />
            <div className="flex flex-col" style={{ marginLeft: "10px", flex: 1, minWidth: 0 }}>
              <span style={{
                fontSize: "12.3px", fontWeight: 500, color: "#262626",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {file.name}
              </span>
              <span style={{ fontSize: "11px", fontWeight: 400, color: "#838383" }}>
                {file.size}
              </span>
            </div>
            <button
              onClick={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: "4px",
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "4px", transition: "color 150ms",
              }}
              onMouseEnter={(e) => { (e.currentTarget.firstChild as SVGElement).style.color = "#D5143E" }}
              onMouseLeave={(e) => { (e.currentTarget.firstChild as SVGElement).style.color = "#C0C0C0" }}
              aria-label={`Remove ${file.name}`}
            >
              <X style={{ width: "12px", height: "12px", color: "#C0C0C0", transition: "color 150ms" }} />
            </button>
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 3 — With Progress                                            //
// ================================================================== //

interface ProgressFile {
  id: string
  name: string
  size: string
  type: SampleFile["type"]
  progress: number
  complete: boolean
}

const PROGRESS_FILES: ProgressFile[] = [
  { id: "p1", name: "report.pdf", size: "1.8 MB", type: "doc", progress: 100, complete: true },
  { id: "p2", name: "photo.jpg", size: "3.2 MB", type: "image", progress: 65, complete: false },
  { id: "p3", name: "data.csv", size: "420 KB", type: "generic", progress: 20, complete: false },
]

function ProgressSection() {
  return (
    <PreviewSection label="With Progress" wrapClassName="flex flex-col items-stretch w-full">
      <div
        style={{ ...dropzoneBase, height: "120px" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(43,127,255,0.02)"
          e.currentTarget.style.borderColor = "#C0C0C0"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent"
          e.currentTarget.style.borderColor = "#E5E5E5"
        }}
      >
        <Upload style={{ width: "32px", height: "32px", color: "#C0C0C0", marginBottom: "8px" }} />
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
          Drag &amp; drop files here
        </span>
      </div>

      <div className="flex flex-col" style={{ gap: "8px", marginTop: "12px" }}>
        {PROGRESS_FILES.map((file) => (
          <div key={file.id} style={fileRowStyle}>
            <div className="flex items-center">
              <FileIcon type={file.type} />
              <div className="flex flex-col" style={{ marginLeft: "10px", flex: 1, minWidth: 0 }}>
                <span style={{
                  fontSize: "12.3px", fontWeight: 500, color: "#262626",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {file.name}
                </span>
                <span style={{ fontSize: "11px", fontWeight: 400, color: "#838383" }}>
                  {file.size}
                </span>
              </div>
              <div className="flex items-center" style={{ gap: "4px" }}>
                {file.complete ? (
                  <>
                    <Check style={{ width: "12px", height: "12px", color: "#14B8A6" }} />
                    <span style={{ fontSize: "11px", fontWeight: 500, color: "#14B8A6" }}>Complete</span>
                  </>
                ) : (
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "#838383" }}>{file.progress}%</span>
                )}
              </div>
            </div>
            <div style={{
              width: "100%", height: "4px", background: "#F0F0F0",
              borderRadius: "2px", marginTop: "6px", overflow: "hidden",
            }}>
              <div style={{
                width: `${file.progress}%`, height: "100%",
                background: file.complete ? "#14B8A6" : "#3B82F6",
                borderRadius: "2px", transition: "width 300ms",
              }} />
            </div>
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 4 — With Preview                                             //
// ================================================================== //

interface PreviewImage {
  id: string
  name: string
  gradient: string
}

const INITIAL_PREVIEWS: PreviewImage[] = [
  { id: "img1", name: "hero-banner.png", gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)" },
  { id: "img2", name: "icon-set.png", gradient: "linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)" },
  { id: "img3", name: "bg-pattern.png", gradient: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)" },
]

function PreviewImagesSection() {
  const [previews, setPreviews] = useState<PreviewImage[]>(INITIAL_PREVIEWS)

  return (
    <PreviewSection label="With Preview" wrapClassName="flex flex-col items-stretch w-full">
      <div
        style={{ ...dropzoneBase, height: "120px" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(43,127,255,0.02)"
          e.currentTarget.style.borderColor = "#C0C0C0"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent"
          e.currentTarget.style.borderColor = "#E5E5E5"
        }}
      >
        <Upload style={{ width: "32px", height: "32px", color: "#C0C0C0", marginBottom: "8px" }} />
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
          Drag &amp; drop images here
        </span>
      </div>

      <div className="grid grid-cols-3" style={{ gap: "8px", marginTop: "12px" }}>
        {previews.map((img) => (
          <div
            key={img.id}
            className="relative"
            style={{
              aspectRatio: "1", borderRadius: "8px", overflow: "hidden",
              background: img.gradient,
            }}
          >
            {/* Remove button */}
            <button
              onClick={() => setPreviews((prev) => prev.filter((p) => p.id !== img.id))}
              className="absolute flex items-center justify-center"
              style={{
                top: "6px", right: "6px", width: "20px", height: "20px",
                borderRadius: "10px", background: "rgba(0,0,0,0.5)",
                border: "none", cursor: "pointer", transition: "background 150ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(213,20,62,0.8)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.5)" }}
              aria-label={`Remove ${img.name}`}
            >
              <X style={{ width: "10px", height: "10px", color: "white" }} />
            </button>
            {/* Filename overlay */}
            <div
              className="absolute flex items-end"
              style={{
                bottom: 0, left: 0, right: 0, padding: "8px",
                background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
                borderRadius: "0 0 8px 8px",
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: 500, color: "white" }}>
                {img.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 5 — Compact                                                  //
// ================================================================== //

function CompactSection() {
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <PreviewSection label="Compact" wrapClassName="flex flex-col items-stretch w-full">
      <div className="flex items-center" style={{ gap: "8px" }}>
        <button
          className="inline-flex items-center font-medium"
          style={{
            height: "28px", padding: "0 12px", border: "0.8px solid #F0F0F0",
            borderRadius: "8px", background: "white", cursor: "pointer",
            fontSize: "12.3px", fontWeight: 500, color: "#262626", gap: "6px",
            transition: "background 150ms",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#FAFAFA" }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "white" }}
          onClick={() => setFileName("document.pdf")}
        >
          <Upload style={{ width: "14px", height: "14px" }} />
          Choose file
        </button>
        <div className="flex items-center" style={{ gap: "6px" }}>
          <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#838383" }}>
            {fileName ?? "No file chosen"}
          </span>
          {fileName && (
            <button
              onClick={() => setFileName(null)}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: "2px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              aria-label="Clear file"
            >
              <X style={{ width: "12px", height: "12px", color: "#C0C0C0" }} />
            </button>
          )}
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 6 — With Validation                                          //
// ================================================================== //

interface ValidationFile {
  id: string
  name: string
  size: string
  type: SampleFile["type"]
  accepted: boolean
  error?: string
}

const VALIDATION_FILES: ValidationFile[] = [
  { id: "v1", name: "document.pdf", size: "1.2 MB", type: "doc", accepted: true },
  { id: "v2", name: "photo.png", size: "3.4 MB", type: "image", accepted: true },
  { id: "v3", name: "video.mp4", size: "45 MB", type: "generic", accepted: false, error: "File too large (max 10MB)" },
  { id: "v4", name: "script.exe", size: "2.1 MB", type: "generic", accepted: false, error: "Unsupported file type" },
]

function ValidationSection() {
  return (
    <PreviewSection label="With Validation" wrapClassName="flex flex-col items-stretch w-full">
      <div
        style={{ ...dropzoneBase, height: "120px" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(43,127,255,0.02)"
          e.currentTarget.style.borderColor = "#C0C0C0"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent"
          e.currentTarget.style.borderColor = "#E5E5E5"
        }}
      >
        <Upload style={{ width: "32px", height: "32px", color: "#C0C0C0", marginBottom: "8px" }} />
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
          Drag &amp; drop files here
        </span>
        <span style={{ fontSize: "11px", fontWeight: 400, color: "#C0C0C0", marginTop: "6px" }}>
          PNG, JPG, PDF up to 10MB
        </span>
      </div>

      <div className="flex flex-col" style={{ gap: "8px", marginTop: "12px" }}>
        {VALIDATION_FILES.map((file) => (
          <div
            key={file.id}
            className="flex items-center"
            style={{
              ...fileRowStyle,
              borderLeft: file.accepted
                ? "3px solid #14B8A6"
                : "3px solid #D5143E",
            }}
          >
            <FileIcon type={file.type} />
            <div className="flex flex-col" style={{ marginLeft: "10px", flex: 1, minWidth: 0 }}>
              <span style={{
                fontSize: "12.3px", fontWeight: 500,
                color: file.accepted ? "#262626" : "#D5143E",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {file.name}
              </span>
              {file.accepted ? (
                <span style={{ fontSize: "11px", fontWeight: 400, color: "#838383" }}>
                  {file.size}
                </span>
              ) : (
                <span style={{ fontSize: "11px", fontWeight: 400, color: "#D5143E" }}>
                  {file.error}
                </span>
              )}
            </div>
            {file.accepted ? (
              <Check style={{ width: "14px", height: "14px", color: "#14B8A6", flexShrink: 0 }} />
            ) : (
              <AlertCircle style={{ width: "14px", height: "14px", color: "#D5143E", flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 7 — Interactive                                              //
// ================================================================== //

interface InteractiveFile {
  id: string
  name: string
  size: string
  type: SampleFile["type"]
  progress: number
  complete: boolean
  error?: string
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp", "application/pdf"]
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

function InteractiveSection() {
  const [files, setFiles] = useState<InteractiveFile[]>([])
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const intervalsRef = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map())

  const simulateProgress = useCallback((fileId: string) => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== fileId || f.complete || f.error) return f
          const next = Math.min(f.progress + 5, 100)
          if (next >= 100) {
            clearInterval(intervalsRef.current.get(fileId)!)
            intervalsRef.current.delete(fileId)
            return { ...f, progress: 100, complete: true }
          }
          return { ...f, progress: next }
        })
      )
    }, 100)
    intervalsRef.current.set(fileId, interval)
  }, [])

  useEffect(() => {
    return () => {
      intervalsRef.current.forEach((interval) => clearInterval(interval))
    }
  }, [])

  const processFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return
    const newFiles: InteractiveFile[] = Array.from(fileList).map((file) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      const sizeStr = file.size < 1024
        ? `${file.size} B`
        : file.size < 1024 * 1024
          ? `${(file.size / 1024).toFixed(0)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`

      const isImage = file.type.startsWith("image/")
      const type: SampleFile["type"] = isImage ? "image" : file.type === "application/pdf" ? "doc" : "generic"

      if (!ACCEPTED_TYPES.includes(file.type)) {
        return { id, name: file.name, size: sizeStr, type, progress: 0, complete: false, error: "Unsupported file type" }
      }
      if (file.size > MAX_SIZE) {
        return { id, name: file.name, size: sizeStr, type, progress: 0, complete: false, error: "File too large (max 10MB)" }
      }
      return { id, name: file.name, size: sizeStr, type, progress: 0, complete: false }
    })

    setFiles((prev) => [...prev, ...newFiles])
    newFiles.forEach((f) => {
      if (!f.error) simulateProgress(f.id)
    })
  }, [simulateProgress])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    processFiles(e.dataTransfer.files)
  }, [processFiles])

  const removeFile = useCallback((id: string) => {
    const interval = intervalsRef.current.get(id)
    if (interval) {
      clearInterval(interval)
      intervalsRef.current.delete(id)
    }
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }, [])

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-stretch w-full">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,application/pdf"
        style={{ display: "none" }}
        onChange={(e) => {
          processFiles(e.target.files)
          e.target.value = ""
        }}
      />

      <div
        style={{
          ...dropzoneBase,
          height: "160px",
          background: dragOver ? "rgba(43,127,255,0.04)" : "transparent",
          borderColor: dragOver ? "#2B7FFF" : "#E5E5E5",
        }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <Upload style={{
          width: "32px", height: "32px",
          color: dragOver ? "#2B7FFF" : "#C0C0C0",
          marginBottom: "12px", transition: "color 150ms",
        }} />
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
          Drag &amp; drop files here
        </span>
        <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#838383", marginTop: "4px" }}>
          or click to browse
        </span>
        <span style={{ fontSize: "11px", fontWeight: 400, color: "#C0C0C0", marginTop: "6px" }}>
          Images and PDFs up to 10MB
        </span>
      </div>

      <div className="flex flex-col" style={{ gap: "8px", marginTop: "12px" }}>
        {files.length === 0 ? (
          <div className="flex items-center justify-center" style={{ padding: "24px 0" }}>
            <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#C0C0C0" }}>
              No files uploaded yet
            </span>
          </div>
        ) : (
          files.map((file) => (
            <div
              key={file.id}
              style={{
                ...fileRowStyle,
                borderLeft: file.error ? "3px solid #D5143E" : undefined,
              }}
            >
              <div className="flex items-center">
                <FileIcon type={file.type} />
                <div className="flex flex-col" style={{ marginLeft: "10px", flex: 1, minWidth: 0 }}>
                  <span style={{
                    fontSize: "12.3px", fontWeight: 500,
                    color: file.error ? "#D5143E" : "#262626",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {file.name}
                  </span>
                  {file.error ? (
                    <span style={{ fontSize: "11px", fontWeight: 400, color: "#D5143E" }}>
                      {file.error}
                    </span>
                  ) : (
                    <span style={{ fontSize: "11px", fontWeight: 400, color: "#838383" }}>
                      {file.size}
                    </span>
                  )}
                </div>
                <div className="flex items-center" style={{ gap: "8px" }}>
                  {!file.error && (
                    file.complete ? (
                      <div className="flex items-center" style={{ gap: "4px" }}>
                        <Check style={{ width: "12px", height: "12px", color: "#14B8A6" }} />
                        <span style={{ fontSize: "11px", fontWeight: 500, color: "#14B8A6" }}>Complete</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "11px", fontWeight: 500, color: "#838383" }}>
                        {file.progress}%
                      </span>
                    )
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    style={{
                      background: "none", border: "none", cursor: "pointer", padding: "4px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget.firstChild as SVGElement).style.color = "#D5143E" }}
                    onMouseLeave={(e) => { (e.currentTarget.firstChild as SVGElement).style.color = "#C0C0C0" }}
                    aria-label={`Remove ${file.name}`}
                  >
                    <X style={{ width: "12px", height: "12px", color: "#C0C0C0", transition: "color 150ms" }} />
                  </button>
                </div>
              </div>
              {!file.error && (
                <div style={{
                  width: "100%", height: "4px", background: "#F0F0F0",
                  borderRadius: "2px", marginTop: "6px", overflow: "hidden",
                }}>
                  <div style={{
                    width: `${file.progress}%`, height: "100%",
                    background: file.complete ? "#14B8A6" : "#3B82F6",
                    borderRadius: "2px", transition: "width 150ms",
                  }} />
                </div>
              )}
            </div>
          ))
        )}
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
      <FileListSection />
      <ProgressSection />
      <PreviewImagesSection />
      <CompactSection />
      <ValidationSection />
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
      packageName="hyena-studio"
      importCode={`import { FileUpload, FileUploadDropzone, FileUploadList } from "@/components/ui/file-upload"`}
      usageCode={`<FileUpload onFilesChange={(files) => console.log(files)}>
  <FileUploadDropzone />
  <FileUploadList />
</FileUpload>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const FILE_UPLOAD_PROPS: PropDef[] = [
  { prop: "accept", type: "string[]", defaultVal: "—" },
  { prop: "maxSize", type: "number", defaultVal: "—" },
  { prop: "maxFiles", type: "number", defaultVal: "—" },
  { prop: "multiple", type: "boolean", defaultVal: "true" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "onFilesChange", type: "(files: UploadFile[]) => void", defaultVal: "—" },
  { prop: "onError", type: "(errors: ValidationError[]) => void", defaultVal: "—" },
  { prop: "variant", type: '"default" | "compact"', defaultVal: '"default"' },
  { prop: "children", type: "ReactNode", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="FileUpload"
      description="A drag-and-drop file upload area with progress bars, file preview list, validation, and multi-file support."
      props={FILE_UPLOAD_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Input",
  variants: "2",
  sizes: "1",
  deps: "None",
  related: [
    { label: "Input", href: "/components/input" },
    { label: "Progress", href: "/components/progress" },
    { label: "Button", href: "/components/button" },
  ],
  tokens: [
    { name: "--file-upload-border", color: "#E5E5E5" },
    { name: "--file-upload-active", color: "#2B7FFF" },
    { name: "--file-upload-progress", color: "#3B82F6" },
    { name: "--file-upload-complete", color: "#14B8A6" },
    { name: "--file-upload-error", color: "#D5143E" },
    { name: "--file-upload-file-bg", color: "#FAFAFA", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function FileUploadPage() {
  return (
    <ComponentPageLayout
      name="File Upload"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
