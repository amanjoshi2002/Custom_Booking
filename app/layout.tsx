import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from 'react';
import "./globals.css";
import { Providers } from "./components/Providers";
import ClientSessionProvider from "./ClientSessionProvider";
import LoadingPage from './components/Loading';
import { StyleProvider } from './contexts/StyleContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booking",
  description: "Booking services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider>
          <Providers>
            <StyleProvider>
              <Suspense fallback={<LoadingPage />}>
                {children}
              </Suspense>
            </StyleProvider>
          </Providers>
        </ClientSessionProvider>
      </body>
    </html>
  );
}