"use client";

import { BackgroundLayer } from "@/components/background-layer";
import { BootSequence } from "@/components/boot-sequence";
import { ChannelSwitch } from "@/components/channel-switch";
import { EasterEggTerminal } from "@/components/easter-egg/terminal";
import { Monitor } from "@/components/monitor";
import { Scanlines } from "@/components/scanlines";
import { Header } from "@/components/shell/header";
import { LeftNav } from "@/components/shell/left-nav";
import { LogStrip } from "@/components/shell/log-strip";
import { PhoneShell } from "@/components/shell/phone-shell";
import { RightPanel } from "@/components/shell/right-panel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChannel } from "@/hooks/use-channel";

/**
 * §5 desktop grid — only the body monitor scrolls; the page never does.
 * The shell persists across navigations; only {children} re-channels.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname, channelChanged } = useChannel();

  return (
    <>
      <BackgroundLayer />
      <Scanlines />
      <BootSequence />
      {/* §8.3 — desktop/tablet grid ≥768px; phone gets its own branch.
          Gutters never drop below 14px: the blur needs them (§1.2). */}
      <div className="hidden h-dvh grid-cols-[56px_1fr_240px] grid-rows-[48px_1fr_28px] gap-[14px] overflow-hidden p-[14px] md:grid xl:grid-cols-[200px_1fr_280px]">
        <Header />
        <LeftNav />
        <Monitor contentClassName="p-0 xl:p-0">
          {/* §4 tiers: channel change → full effect (staggered last at
              +110ms); sub-view change → light blip, body only. */}
          <ChannelSwitch
            switchKey={pathname}
            severity={channelChanged ? "full" : "light"}
            delayMs={channelChanged ? 110 : 0}
          >
            <ScrollArea className="h-full">
              <main className="min-h-full p-3 xl:p-4">{children}</main>
            </ScrollArea>
          </ChannelSwitch>
        </Monitor>
        <RightPanel />
        <LogStrip />
      </div>
      <PhoneShell />
      <EasterEggTerminal />
    </>
  );
}
