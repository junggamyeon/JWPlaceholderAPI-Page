import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { getAllPlugins } from "@/lib/plugins";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "JWPlaceholderAPI | Expansions",
  description:
    "Browse supported plugins and placeholders for JWPlaceholderAPI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plugins = getAllPlugins();

  return (
    <html lang="en" className={cn("dark font-sans", geist.variable)}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SidebarProvider>
          <AppSidebar plugins={plugins} />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto px-6 py-5 md:px-10 lg:px-16">
              <div className="mx-auto w-full max-w-6xl">{children}</div>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
