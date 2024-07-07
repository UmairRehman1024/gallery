import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "~/_components/topnav";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Gallery app, created by Umair Rehman. Tutorial from t3.gg",
  icons: [{ rel: "icon", url: "/gallery.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="">
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
