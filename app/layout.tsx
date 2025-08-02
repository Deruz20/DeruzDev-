import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biztrack Pro",
  description: "Professional Business Tracking Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-background">
          <header className="px-4 lg:px-6 h-16 flex items-center border-b shrink-0">
            <Link className="flex items-center justify-center" href="/dashboard">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
              <span className="ml-2 font-semibold">Biztrack</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">Dashboard</Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/transactions">Transactions</Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/invoice">Invoice</Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/settings">Settings</Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/help">Help</Link>
            </nav>
          </header>
          
          <main className="flex-1">
            {children}
          </main>

          <footer className="flex items-center justify-center p-4 border-t">
             <p className="text-xs text-muted-foreground">© 2025 deruzdev. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
