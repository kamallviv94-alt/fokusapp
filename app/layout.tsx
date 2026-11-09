import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Unbounded } from "next/font/google";
import "./globals.css";

// Hər iki şriftdə Azərbaycan hərfləri (ə, ğ, ı, ş...) var — latin-ext lazımdır
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "FokusApp — tapşırıqlar və vərdişlər bir yerdə",
  description:
    "Gündəlik tapşırıqlarını və vərdişlərini bir ekranda izlə. ITCoach Vibe Coding kursunun nümunə layihəsi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="az" className={`${unbounded.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
