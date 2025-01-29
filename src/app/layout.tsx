import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header/header"; // Import the Header component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TheDevBucket - Developer Community for Knowledge Sharing",
  description:
    "Join TheDevBucket, a community of developers sharing knowledge, experiences, and insights through engaging articles and tutorials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Header /> {/* Include the Header component */}
        <main className="pt-20 md:pt-24">{children}</main> {/* Adjust padding to account for the fixed header */}
      </body>
    </html>
  );
}