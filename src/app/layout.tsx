import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import BottomBlur from "@/components/BottomBlur";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
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
        className={`${montserrat.variable}`}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
          <Footer />
          <BottomBlur />
        </SmoothScroll>
      </body>
    </html>
  );
}