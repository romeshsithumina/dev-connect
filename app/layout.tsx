/* eslint-disable camelcase */
import "./globals.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "DevConnect",
  description:
    "DevConnect is a dynamic web application designed to empower and unite developers worldwide. Whether you're an experienced coder or just starting your programming journey, DevConnect offers a vibrant platform for collaboration, knowledge sharing, and networking within the tech community. Discover a wealth of resources, ask and answer questions, and connect with like-minded individuals in this developer's paradise. Join DevConnect today and amplify your coding prowess while connecting with fellow innovators.",
  icons: {
    icon: "assets/images/site-logo.svg",
  },
};

const clerkAppearance = {
  elements: {
    formButtonPrimary: "primary-gradient",
    footerActionLink: "primary-text-gradient hover:text-primary-500",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider appearance={clerkAppearance}>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
