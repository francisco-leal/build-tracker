import type { Metadata } from "next";
import { Azeret_Mono as GeistMono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const geistMono = GeistMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Build Tracker",
  description:
    "Keep track of your building via a public profile. Increase your visibility and accountability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-mono antialiased",
          geistMono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
