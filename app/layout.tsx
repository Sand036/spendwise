import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { ExpenseProvider } from "@/contexts/ExpenseContext";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpendWise",
  description: "SpendWise - Theo dõi chi tiêu cá nhân",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50/70 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
        <AuthProvider>
          <ExpenseProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </ExpenseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
