import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sniptic | Gestiona tus snippets de código",
  description: "Tu plataforma SaaS moderna y minimalista que revoluciona la forma en que trabajas con snippets de código",
  keywords: ["snippets", "código", "desarrollo", "programación", "SaaS", "herramientas para desarrolladores"],
  creator: "Sniptic",
  openGraph: {
    title: "Sniptic | Gestiona tus snippets de código",
    description: "Tu plataforma SaaS moderna y minimalista que revoluciona la forma en que trabajas con snippets de código",
    type: "website",
    siteName: "Sniptic",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
