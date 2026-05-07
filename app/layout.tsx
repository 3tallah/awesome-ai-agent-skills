import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3tallah AI Hub",
  description:
    "Static AI repository showcase with GitHub metadata, enrichment hooks, and curated discovery views.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}