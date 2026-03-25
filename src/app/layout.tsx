import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import BottomBlur from "@/components/BottomBlur";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Sufiyan Mirza — Full Stack Developer",
  description:
    "Full Stack Developer specializing in Laravel, AI Systems, and modern web architecture. Building production-grade systems from Lahore, Pakistan.",
  keywords: [
    "Sufiyan Mirza",
    "Full Stack Developer",
    "Laravel",
    "Python",
    "AI Systems",
    "Web Developer Pakistan",
  ],
  authors: [{ name: "Sufiyan Mirza" }],
  openGraph: {
    title: "Sufiyan Mirza — Full Stack Developer",
    description: "Building systems that think.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
          <BottomBlur />
        </SmoothScroll>
      </body>
    </html>
  );
}