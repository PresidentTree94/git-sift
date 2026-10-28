import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "remixicon/fonts/remixicon.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitSift",
  description: "Evaluate GitHub repositories with ease and efficiency.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${jetBrainsMono.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <footer className="flex flex-col md:flex-row items-center justify-between gap-2 bg-background-50 px-10 py-6 text-xs text-foreground-500">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="font-heading font-bold text-base text-foreground-950">GitSift</span>
            <p>Evidence-first GitHub evaluation — never a candidate score.</p>
          </div>
          <p>&copy; 2026 GitSift. Data from the public GitHub API.</p>
        </footer>
      </body>
    </html>
  );
}
