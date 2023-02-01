import "./globals.css";

import { Montserrat, Quicksand } from "@next/font/google";
import Header from "./Header";

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
    <html lang="en" className={`${montserrat.variable} ${quicksand.variable}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="font-body bg-stone-100 flex flex-col lg:flex-row p-8 gap-8 h-screen ">
        <Header />
        <main className="flex-1 lg:h-full lg:overflow-y-scroll">
          {children}
        </main>
      </body>
    </html>
  );
}
