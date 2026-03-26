import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "SpeakEng — AI-Powered English Learning",
  description: "Master English fluency with your personal AI tutor. Smart assessments, curated lessons, and real-time speaking practice.",
  keywords: "english learning, AI tutor, IELTS, TOEFL, speaking practice, english fluency",
  openGraph: {
    title: "SpeakEng — AI-Powered English Learning",
    description: "Master English fluency with your personal AI tutor.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
