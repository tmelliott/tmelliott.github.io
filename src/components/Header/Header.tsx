import Link from "next/link";
import { useRouter } from "next/router";

export const SITE_LINKS = [
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "Outputs",
    url: "/outputs",
  },
];

export default function Header() {
  const { asPath: path } = useRouter();

  return (
    <header className="">
      <div className="bg-gray-50 flex flex-col items-center justify-center mt-[30vh] relative z-20">
        <a
          href="/"
          className="absolute rounded-full w-[200px] -translate-y-1/2 top-0 z-20 border-8 border-gray-50"
        >
          <img src="/photo.jpg" className="rounded-full z-30" />
        </a>
        <h2 className="font-bold mt-[100px] pt-2 text-2xl tracking-wide">
          Tom Elliott
        </h2>
        <p className="text-gray-800 text-center px-8 tracking-tight">
          Data science, visualisation, and computing mixed with wine, gardening,
          food, and music.
        </p>

        <nav className="flex justify-center gap-4 mt-4 items-center">
          {SITE_LINKS.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={`text-sm ${path === link.url && "underline"}`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <hr className="border-1 border-gray-200 w-11/12 my-2 mt-4" />
      </div>
    </header>
  );
}
