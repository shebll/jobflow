import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ThemeSwitch from "@/components/shared/themeSwitch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: " JobFlow | discover jobs",
    template: "%s | JobFlow",
  },
  description:
    "Discover Jobs. Browse through thousands of job opportunities, filter by location, skills, and more.",

  openGraph: {
    type: "website",
    url: "https://jobflow-clone.vercel.app/", // Change this to your actual domain
    title: "JobFlow | Discover Jobs",
    description:
      "Browse through thousands of job opportunities, filter by location, skills, and more.",
    images: [
      {
        url: "https://dqdlbqzttkwus7kc.public.blob.vercel-storage.com/Screenshot%20from%202024-09-23%2019-02-58-43QJdeg3HhKlBUCLysBwlFyvaf2ves.png", // Add your social media image URL here
        width: 1200,
        height: 630,
        alt: "JobFlow Social Image",
      },
    ],
    siteName: "JobFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobFlow | Discover Jobs",
    description:
      "Browse through thousands of job opportunities, filter by location, skills, and more.",
    images: [
      {
        url: "https://dqdlbqzttkwus7kc.public.blob.vercel-storage.com/Screenshot%20from%202024-09-23%2019-02-58-43QJdeg3HhKlBUCLysBwlFyvaf2ves.png", // Same URL as Open Graph image
        alt: "JobFlow Social Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col justify-between antialiased`}
      >
        <ThemeSwitch />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
