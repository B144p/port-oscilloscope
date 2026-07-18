import { BackgroundLayer } from "@/components/background-layer";
import { Scanlines } from "@/components/scanlines";
import { Monitor } from "@/components/monitor";

/**
 * §5 desktop grid — only the body monitor scrolls; the page never does.
 * Header / left nav / right sidebar surfaces are placeholders until the
 * shell components land (step 5).
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundLayer />
      <Scanlines />
      <div className="grid h-dvh grid-cols-[200px_1fr_280px] grid-rows-[48px_1fr_28px] gap-[14px] overflow-hidden p-[14px]">
        <Monitor className="col-span-3" contentClassName="flex items-center justify-between py-0">
          <span className="text-[13px] text-green-bright">[ PORT-CATHODE // v2.0 ]</span>
          <span className="text-[11px] text-text-muted">● ONLINE</span>
        </Monitor>

        <Monitor contentClassName="text-[13px] uppercase tracking-[0.05em]">
          NAV
        </Monitor>

        <Monitor contentClassName="min-h-0 overflow-y-auto">
          <main className="min-h-0">{children}</main>
        </Monitor>

        <Monitor contentClassName="text-[13px] uppercase tracking-[0.05em]">
          PANEL
        </Monitor>

        <div className="col-span-3 flex items-center justify-between whitespace-nowrap text-[11px] text-text-muted">
          <span>[--:--:--] SYSTEM IDLE</span>
          <span>VIEWS: ---</span>
        </div>
      </div>
    </>
  );
}
