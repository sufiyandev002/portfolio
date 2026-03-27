import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BottomBlur from "@/components/BottomBlur";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  // Core
  title: "Sufiyan Mirza — Full Stack Developer & AI Engineer",
  description:
    "Full Stack Developer specializing in Laravel, Python, AI Systems, and modern web architecture. Building production-grade, intelligent systems from Faisalabad, Pakistan.",
  keywords: [
    "Sufiyan Mirza",
    "Full Stack Developer",
    "Laravel Developer",
    "AI Engineer",
    "Python Developer",
    "Web Developer Pakistan",
    "Faisalabad Developer",
    "Next.js",
    "React",
    "Sufiyan",
  ],
  authors: [{ name: "Sufiyan Mirza", url: "https://sufiyanmirza.dev" }],
  creator: "Sufiyan Mirza",

  // Canonical URL – update to your real Vercel domain before deployment
  metadataBase: new URL("https://sufiyanmirza.dev"),
  alternates: {
    canonical: "/",
  },

  // Robots
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

  // Open Graph (LinkedIn, Facebook, WhatsApp previews)
  openGraph: {
    title: "Sufiyan Mirza — Full Stack Developer & AI Engineer",
    description: "Building systems that think. Laravel · Python · AI · Next.js",
    url: "https://sufiyanmirza.dev",
    siteName: "Sufiyan Mirza Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/og-image.png", // Add a 1200x630 OG preview image here
        width: 1200,
        height: 630,
        alt: "Sufiyan Mirza — Full Stack Developer",
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "Sufiyan Mirza — Full Stack Developer",
    description: "Building systems that think. Laravel · Python · AI · Next.js",
    creator: "@sufiyanmirza", // Update to your real Twitter handle
    images: ["/assets/images/og-image.png"],
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
        className={`${montserrat.variable} ${montserrat.className}`}
      >
        <SmoothScroll>
          <CustomCursor />
          <FloatingWhatsApp />
          {children}
          <Footer />
          <BottomBlur />
        </SmoothScroll>
      </body>
    </html>
  );
}