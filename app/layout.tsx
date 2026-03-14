import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yash Desai — Software Engineer | Java, SpringBoot, AI Platforms",
  description: "Software Engineer at Thomson Reuters with 4+ years building microservices and AI-powered platforms. Open to Senior Software Engineer opportunities.",
  openGraph: {
    title: "Yash Desai — Software Engineer",
    description: "Portfolio of Yash Desai, Software Engineer specializing in microservices and AI platforms.",
    url: "https://yashdesai.dev",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
