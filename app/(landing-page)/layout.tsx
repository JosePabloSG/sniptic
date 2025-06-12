import Footer from "@/components/navigation/footer/footer";
import { Navbar } from "@/components/navigation/nav/navbar";

export default function LadingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
