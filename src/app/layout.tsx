import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOBHA Limited | Luxury Real Estate Company",
  description: "Experience world-class luxury and craftsmanship with SOBHA Limited. Explore our residential and commercial projects across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} ${playfair.variable} antialiased selection:bg-primary selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
