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
    <header className="flex lg:flex-col items-center gap-6 bg-slate-600 lg:h-full text-slate-100">
      <div className="flex items-center justify-between w-full p-4 md:p-8 lg:p-4 xl:p-8">
        <hgroup className="flex lg:flex-col xl:flex-row items-center justify-center gap-6">
          <div className="relative h-12 w-12 md:h-20 md:w-20 lg:h-14 lg:w-14">
            {" "}
            <Image
              src="/profile.jpg"
              alt="Tom Elliott"
              fill={true}
              className="bg-white  shadow p-[1px]"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center xl:text-left">
            <h1 className="text-2xl font-heading lg:hidden xl:block">
              Tom Elliott
            </h1>
          </div>
        </hgroup>

        {/* this will be responsive i.e., a side-drawer */}
        <div className="lg:hidden">Menu</div>
      </div>

      <nav className="hidden h-full lg:flex w-full flex-col">
        <ul className="flex flex-col items-start w-full flex-wrap flex-1">
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
                  className={`flex font-heading items-center gap-2 absolute inset-0 px-8 z-10 justify-center xl:justify-start ${
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
                  <div className="hidden xl:block">{name}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* social icons */}
        <ul className="flex lg:flex-col xl:flex-row items-center gap-3 w-full justify-center p-8">
          {social.map(({ name, href, icon }) => (
            <li key={name}>
              <a
                href={href}
                title={name}
                className="relative w-4 h-4 md:w-8 md:h-8 block"
              >
                <Image
                  src={`/icons/${icon}.svg`}
                  alt={name}
                  fill={true}
                  className="bg-white rounded-full p-[1px] "
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
