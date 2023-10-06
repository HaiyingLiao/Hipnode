import "./globals.css";

import { Source_Sans_3 } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import TopBar from "@/components/shared/TopBar";
import BottomBar from "@/components/shared/BottomBar";
import { ThemeProvider } from "@/components/ThemeProvider";

const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["700", "600", "400"],
});

export const metadata: Metadata = {
  title: "Hipnode - Social Media Web Application",
  description: "Social Media Web Application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={sourceSansPro.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <TopBar />

          <main className='bg-white-800 dark:bg-darkPrimary-2'>{children}</main>

          <BottomBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
