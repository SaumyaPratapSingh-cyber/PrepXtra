import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Changed from Geist
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrepXtra | AI-Powered Career Architect",
  description: "From Resume to Offer Letter. The complete placement ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} antialiased bg-slate-950 text-slate-50 selection:bg-indigo-500/30`}>
        {children}
      </body>
    </html>
  );
}
