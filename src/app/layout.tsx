import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

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
      <body suppressHydrationWarning>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}