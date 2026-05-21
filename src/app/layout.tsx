import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Zap } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JWPlaceholderAPI | Expansions",
  description: "Browse supported plugins and placeholders for JWPlaceholderAPI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Navigation Bar */}
        <header className="border-b border-[#1e293b] bg-[#0a0f1a] sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <Zap className="text-[#3b82f6] group-hover:text-[#60a5fa] transition-colors" size={24} />
              <span className="font-bold text-xl tracking-tight">JWPlaceholder<span className="text-[#3b82f6]">API</span></span>
            </Link>
            <nav>
              <a href="https://github.com/junggamyeon/JWPlaceholderAPI" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                GitHub
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#1e293b] py-8 text-center text-[#94a3b8] text-sm">
          <p>© {new Date().getFullYear()} JWDev. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
