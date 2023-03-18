import React from "react";

import { Montserrat, Quicksand } from "@next/font/google";

import Footer from "~/components/Footer";
import Header from "~/components/Header";

const montserrat = Montserrat({
  subsets: ["latin-ext"],
  variable: "--font-montserrat",
});
const quicksand = Quicksand({
  subsets: ["latin-ext"],
  variable: "--font-quicksand",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${montserrat.variable} ${quicksand.variable} font-sans flex flex-col min-h-screen bg-[url('/stars-bg.jpg')] bg-center bg-cover`}
    >
      <Header />
      <main className="flex-1 flex">{children}</main>
      <Footer />
    </div>
  );
}
