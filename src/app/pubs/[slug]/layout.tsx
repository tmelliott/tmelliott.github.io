import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <p className="text-sm flex items-center gap-1">
        <ChevronLeftIcon height={12} width={12} />
        <Link href="/pubs">All publications</Link>
      </p>
      {children}
    </>
  );
}
