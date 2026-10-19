import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "@/styles/globals.scss";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mallikarjun.dev"),
  title: "Mallikarjun Alyal — Full Stack Developer · UI/UX Designer · Product Thinker",
  description:
    "Personal portfolio and engineering journey of Mallikarjun Alyal. Building digital products at the intersection of technology, design, and ideas.",
  keywords: [
    "Mallikarjun Alyal",
    "Full Stack Developer",
    "UI/UX Designer",
    "Product Thinker",
    "FUTURE U Hackathon Winner",
    "FUTURE U AI Challenge",
    "AI Smart Classroom",
    "Computer Science Engineer",
    "Ballari Institute of Technology and Management",
  ],
  authors: [{ name: "Mallikarjun Alyal", url: "https://github.com/MALLIKARUNA" }],
  creator: "Mallikarjun Alyal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/MALLIKARUNA",
    title: "Mallikarjun Alyal — Full Stack Developer & UI/UX Designer",
    description:
      "Building digital products at the intersection of technology, design, and ideas. A journey from curiosity to creation.",
    siteName: "Mallikarjun Alyal Portfolio",
    images: [
      {
        url: "/images/mallikarjun.png",
        width: 1200,
        height: 630,
        alt: "Mallikarjun Alyal — Full Stack Developer & UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mallikarjun Alyal — Full Stack Developer & UI/UX Designer",
    description: "Building digital products at the intersection of technology, design, and ideas.",
    images: ["/images/mallikarjun.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
