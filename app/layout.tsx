import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Sniptic",
  description: "Tu plataforma SaaS moderna y minimalista que revoluciona la forma en que trabajas con snippets de código",
  keywords: ["snippets", "código", "desarrollo", "programación", "SaaS", "herramientas para desarrolladores"],
  creator: "Sniptic",
  openGraph: {
    title: "Sniptic",
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
        {children}
      </body>
    </html>
  );
}
