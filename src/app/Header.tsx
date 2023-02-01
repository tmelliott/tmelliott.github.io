"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  CodeBracketIcon,
  HomeIcon,
  NewspaperIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";

const social = [
  {
    name: "GitHub",
    href: "https://github.com/tmelliott",
    icon: "github",
  },
  {
    name: "Mastodon",
    href: "https://mastodon.nz/@tmelliott",
    icon: "mastodon",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/tomelliottnz",
    icon: "twitter",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tmelliott/",
    icon: "linkedin",
  },
];

const navItems = [
  {
    name: "Home",
    href: "/",
    Icon: HomeIcon,
  },
  {
    name: "Blog",
    href: "/blog",
    Icon: PencilIcon,
  },
  {
    name: "Software",
    href: "/software",
    Icon: CodeBracketIcon,
  },
  {
    name: "Articles & Reports",
    href: "/articles",
    Icon: NewspaperIcon,
  },
];

export default function Header() {
  const path = usePathname();

  const checkMatch = (href: string) => {
    if (href === "/") return path === href;
    return path?.includes(href);
  };

  return (
    <header className="flex flex-col items-center justify-start gap-12 lg:bg-slate-600 lg:h-full text-slate-100">
      <hgroup className="flex items-center justify-center gap-6 p-8">
        <div>
          <Image
            src="/profile.jpg"
            alt="Tom Elliott"
            width={82}
            height={82}
            className="rounded shadow"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-heading">Tom Elliott</h1>
          {/* social icons */}
          <ul className="flex items-center gap-3">
            {social.map(({ name, href, icon }) => (
              <li key={name}>
                <a href={href} title={name}>
                  <Image
                    src={`/icons/${icon}.svg`}
                    alt={name}
                    width={26}
                    height={26}
                    className="bg-white rounded-full p-[1px]"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </hgroup>

      {/* <p className="text-sm">Statistical computing and data science</p> */}

      {/* this will be responsive i.e., a side-drawer */}
      <nav className="hidden lg:block w-full">
        <ul className="flex flex-col items-start w-full">
          {navItems.map(({ name, href, Icon }) => (
            <li
              key={href}
              className={`${checkMatch(href) ? "" : ""}
                relative block w-full group py-3 h-[48px]`}
            >
              {checkMatch(href) && (
                <motion.div
                  layoutId="activeLinkBG"
                  className="bg-stone-100 absolute inset-0 z-0"
                ></motion.div>
              )}
              <Link href={href}>
                <div
                  className={`flex font-heading items-center gap-2 absolute inset-0 px-8 z-10 ${
                    checkMatch(href)
                      ? "text-gray-800"
                      : "group-hover:text-gray-200 group-hover:bg-white group-hover:bg-opacity-5"
                  }`}
                >
                  <Icon
                    height={24}
                    width={24}
                    className={`${
                      checkMatch(href)
                        ? ""
                        : "group-hover:animate-wiggle group-hover:scale-110"
                    }`}
                  />
                  {name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
