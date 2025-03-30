import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const unifont = localFont({
  src: "../public/fonts/UnifontExMono.woff2",
  variable: "--font-unifont-ex",
});

export const metadata: Metadata = {
  title: "linkless",
  description: "ridiculously minimalistic link shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${unifont.className}`}>{children}</body>
    </html>
  );
}
