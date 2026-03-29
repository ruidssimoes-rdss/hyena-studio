import { Header } from "@/editor/shell/Header"
import { Sidebar } from "@/editor/shell/Sidebar"
import { ContentArea } from "@/editor/shell/ContentArea"
import { CAP } from "@/editor/shell/CAP"
import { CAPProvider } from "@/editor/shell/CAPContext"

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CAPProvider>
      <div className="flex flex-col h-dvh overflow-hidden bg-[#fafafa]">
        <Header />

        {/* Centered 3-column unit: sidebar | content | CAP */}
        <div className="flex-1 min-h-0 flex justify-center">
          <div
            className="flex h-full w-full"
            style={{
              /* sidebar 224 + content 926 + CAP 224 + gaps = ~1402 */
              maxWidth: "1402px",
              padding: "0 12px",
              gap: "12px",
            }}
          >
            {/* Left sidebar */}
            <Sidebar />

            {/* Main content — triple-nested container */}
            <div className="flex-1 min-w-0 py-3">
              <ContentArea>{children}</ContentArea>
            </div>

            {/* Right CAP */}
            <CAP />
          </div>
        </div>
      </div>
    </CAPProvider>
  )
}
