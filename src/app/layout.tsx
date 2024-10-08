import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import "./globals.css";

const solaimanLipi = localFont({
  src: "./fonts/SolaimanLipi.woff",
  variable: "--font-solaimanLipi",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Ebdresults Thumbnail Create Website",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${solaimanLipi.variable} antialiased`} suppressHydrationWarning={true}>
          <Navbar/>
        <div className="container mx-auto px-4 py-8">
            {children}
        </div>
      </body>
    </html>
  );
}
