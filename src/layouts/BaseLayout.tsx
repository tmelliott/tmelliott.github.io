import { ReactElement } from "react";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

type BaseLayoutProps = {
  children: ReactElement | ReactElement[] | null;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-800 text-slate-800">
      <Header />
      <main className="flex-1 flex flex-col pb-12 items-center mx-auto w-full bg-gray-50 p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
