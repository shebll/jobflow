import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ThemeSwitch from "@/components/shared/themeSwitch";
import ReactQuery from "@/components/context/ReactQuery";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: " JobFlow | discover jobs",
    template: "%s | JobFlow",
  },
  description:
    "Discover Jobs. Browse through thousands of job opportunities, filter by location, skills, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactQuery>
        <body
          className={`${inter.className} flex min-h-screen flex-col justify-between antialiased`}
        >
          <ThemeSwitch />
          <Header />
          {children}
          <Footer />
        </body>
      </ReactQuery>
    </html>
  );
}
