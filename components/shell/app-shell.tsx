"use client";

import { BackgroundLayer } from "@/components/background-layer";
import { Monitor } from "@/components/monitor";
import { Scanlines } from "@/components/scanlines";
import { Header } from "@/components/shell/header";
import { LeftNav } from "@/components/shell/left-nav";
import { LogStrip } from "@/components/shell/log-strip";
import { RightPanel } from "@/components/shell/right-panel";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * §5 desktop grid — only the body monitor scrolls; the page never does.
 * The shell persists across navigations; only {children} re-channels.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundLayer />
      <Scanlines />
      <div className="grid h-dvh grid-cols-[200px_1fr_280px] grid-rows-[48px_1fr_28px] gap-[14px] overflow-hidden p-[14px]">
        <Header />
        <LeftNav />
        <Monitor contentClassName="p-0 xl:p-0">
          <ScrollArea className="h-full">
            <main className="min-h-full p-3 xl:p-4">{children}</main>
          </ScrollArea>
        </Monitor>
        <RightPanel />
        <LogStrip />
      </div>
    </>
  );
}
