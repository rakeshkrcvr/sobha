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
  title: "AR Creative Homes | Premium Lifestyles & Smart Investments",
  description: "Discover a new standard of luxury living and smart investments with AR Creative Homes. Premium residential and commercial properties in Greater Noida West and NCR.",
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
