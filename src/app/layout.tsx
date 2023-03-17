import React from "react";

import { Montserrat, Quicksand } from "@next/font/google";

import "~/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin-ext"],
  variable: "--font-montserrat",
});
const quicksand = Quicksand({
  subsets: ["latin-ext"],
  variable: "--font-quicksand",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${quicksand.variable} font-sans`}
    >
      <body>{children}</body>
    </html>
  );
}
