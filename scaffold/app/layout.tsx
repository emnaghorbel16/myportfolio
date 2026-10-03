import type { Metadata } from "next";
import "./globals.css";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Emna Ghorbel — Computer Science Student & Developer",
  description: "Portfolio of Emna Ghorbel — AI, Computer Vision, Cybersecurity, Full Stack development.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
