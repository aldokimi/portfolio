import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mohammed Al-Dokimi",
    template: "%s · Mohammed Al-Dokimi",
  },
  description:
    "Software engineer — Go, Python, Kubernetes, platforms, and automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-950 text-slate-100">
        <SiteHeader />
        {children}
        <footer className="border-t border-slate-800/80 py-6 text-center font-mono text-[11px] text-slate-600">
          Cloudflare Workers · D1
        </footer>
      </body>
    </html>
  );
}
