import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    template: "%s | TaskFlow Pro",
    default: "TaskFlow Pro - Professional Task Management",
  },
  description:
    "Streamline your workflow with powerful project management and task tracking capabilities. Built for professionals who value efficiency.",
  keywords: [
    "task management",
    "project management",
    "productivity",
    "workflow",
    "team collaboration",
  ],
  authors: [{ name: "TaskFlow Pro Team" }],
  creator: "TaskFlow Pro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://taskflow-pro.com",
    title: "TaskFlow Pro - Professional Task Management",
    description:
      "Streamline your workflow with powerful project management and task tracking capabilities.",
    siteName: "TaskFlow Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow Pro - Professional Task Management",
    description:
      "Streamline your workflow with powerful project management and task tracking capabilities.",
    creator: "@taskflowpro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
