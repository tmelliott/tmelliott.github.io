import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import profilePic from "../../../public/photo.jpg";

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

  if (path === "/") {
    return (
      <motion.header layoutId="headerContainer">
        <div className="bg-gray-50 flex flex-col items-center justify-center mt-[30vh] relative z-20">
          <Link
            href="/"
            className="absolute rounded-full -translate-y-1/2 top-0 z-20 border-8 border-gray-50 bg-gray-50 h-[180px] w-[180px]"
          >
            <Image
              src={profilePic}
              className="rounded-full z-30"
              width={180}
              height={180}
              alt="Tom Elliott"
              placeholder="blur"
            />
          </Link>
          <h2 className="font-bold mt-[100px] pt-2 text-2xl tracking-wide">
            Tom Elliott
          </h2>
          <p className="text-gray-800 text-center px-8 tracking-tight">
            Data science, visualisation, and computing mixed with wine,
            gardening, food, and music.
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
      </motion.header>
    );
  }

  return (
    <header className="relative h-[50px] mt-[50px] bg-gray-50">
      <div className="absolute z-30 top-0 w-full h-[50px]">
        <div className="z-30 top-[50px] w-full flex flex-col justify-end h-[50px] bg-opacity-80 bg-gradient-to-b from-slate-50 via-slate-50 to-transparent max-w-3xl mx-auto">
          <div className="absolute top-0 w-full flex items-center justify-start gap-6 px-4 h-[100px] z-50 -translate-y-1/2">
            <Link
              href="/"
              className="rounded-full z-20 border-4 border-gray-50 bg-gray-50 h-[60px] w-[60px]"
            >
              <Image
                src={profilePic}
                alt="Tom Elliott"
                className="rounded-full z-30"
                placeholder="blur"
              />
            </Link>

            <div className="grid grid-rows-2">
              <h2 className="font-bold text-lg tracking-wide text-gray-50 ">
                Tom Elliott
              </h2>
              <nav className="flex justify-start gap-4 items-center">
                {SITE_LINKS.map((link) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    className={`text-xs ${
                      path.includes(link.url) && "underline"
                    }`}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
