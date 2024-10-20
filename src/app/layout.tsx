import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "~/app/_components/topnav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/components/ui/theme-provider";
import { AlbumStoreProvider } from "~/providers/album-store-provider";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Gallery app, created by Umair Rehman. Tutorial from t3.gg",
  icons: [{ rel: "icon", url: "/gallery.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />

        <body className="">
          <ThemeProvider attribute="class" defaultTheme="system">
            <AlbumStoreProvider>
              <div className="grid h-screen grid-rows-[auto,1fr]">
                <TopNav />
                <main className="overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-800">
                  {children}
                </main>
                {modal}
              </div>
            </AlbumStoreProvider>

            <div id="modal-root"></div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
