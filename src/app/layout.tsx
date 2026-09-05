import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SMN SYNERGY | Smart & Green Factory Platform",
    template: "%s | SMN SYNERGY",
  },
  description:
    "Integrated Smart & Green Factory Platform for PT Sinergi Manufaktur Nusantara (SMN). Connected machines, predictive maintenance, circular loops, green batch passport, and human-centered workforce readiness.",
  keywords: [
    "PT SMN",
    "SMN SYNERGY",
    "Smart Manufacturing",
    "ESG Control Tower",
    "Predictive Maintenance",
    "Green Batch Passport",
    "Just Transition",
  ],
  authors: [{ name: "PT Sinergi Manufaktur Nusantara" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Preconnect for Fontshare Satoshi and Google Fonts JetBrains Mono */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Satoshi Font */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap"
          rel="stylesheet"
        />

        {/* JetBrains Mono Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Material Icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}
