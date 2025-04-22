import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import TanStackQueryProvider from "@/providers/TanStackQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AttendEase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary`}
      >
        <NextAuthSessionProvider>
          <TanStackQueryProvider>
            {children}
            <Toaster position="bottom-right" />
          </TanStackQueryProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
