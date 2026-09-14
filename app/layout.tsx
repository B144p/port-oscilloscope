import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/shell/app-shell";
import { Providers } from "@/components/providers";
import { prefetchAboutMe } from "@/features/about-me/server";
import { prefetchContacts } from "@/features/contact/server";
import { prefetchEducation } from "@/features/education/server";
import { prefetchExperience } from "@/features/experience/server";
import { prefetchFrontendVersion } from "@/features/frontend-version/server";
import { prefetchProjects } from "@/features/project/server";
import { prefetchStatistic } from "@/features/statistic/server";
import { getQueryClient } from "@/lib/query-client";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "OSCILLOSCOPE",
  description: "Developer portfolio — oscilloscope control panel interface.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // AppShell mounts every section's data hook up front (desktop and phone
  // layouts are both always mounted, one hidden by CSS — see phone-shell.tsx),
  // so every query gets prefetched here rather than per-page.
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchAboutMe(queryClient),
    prefetchEducation(queryClient),
    prefetchExperience(queryClient),
    prefetchProjects(queryClient),
    prefetchContacts(queryClient),
    prefetchStatistic(queryClient),
    prefetchFrontendVersion(queryClient),
  ]);

  return (
    <html
      lang="en"
      className={cn("h-full antialiased font-mono", jetbrainsMono.variable)}
    >
      <body className="h-full overflow-hidden">
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AppShell>{children}</AppShell>
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
