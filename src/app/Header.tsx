"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bars3Icon,
  CodeBracketIcon,
  HomeIcon,
  NewspaperIcon,
  PencilIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

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

  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="flex lg:flex-col items-center gap-6 bg-slate-600 lg:h-full text-slate-100">
      <div className="flex items-center justify-between w-full p-4 md:p-8 lg:p-4 xl:p-8">
        <hgroup className="flex lg:flex-col xl:flex-row items-center justify-center gap-6 lg:w-full">
          <div className="relative h-12 w-12 md:h-20 md:w-20 lg:h-14 lg:w-14">
            <Image
              src="/profile.jpg"
              alt="Tom Elliott"
              fill={true}
              className="bg-white  shadow p-[1px]"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center xl:text-left">
            <h1 className="text-2xl font-heading flex items-center gap-2 lg:flex-col xl:flex-row lg:text-lg xl:text-2xl">
              <span>Tom</span>
              <span>Elliott</span>
            </h1>
          </div>
        </hgroup>

        {/* this will be responsive i.e., a side-drawer */}
        <div className="lg:hidden">
          <Bars3Icon
            height={26}
            width={26}
            className="cursor-pointer hover:text-gray-300"
            onClick={() => setShowMenu(true)}
          />
        </div>
      </div>

      <nav
        className={`${
          !showMenu && "hidden"
        } fixed inset-0 bg-slate-600 flex flex-col pt-24 gap-12 lg:pt-0 items-center lg:static lg:bg-inherit lg:h-full lg:flex lg:w-full lg:flex-col`}
      >
        {/* a big close button */}
        {showMenu && (
          <div className="lg:hidden text-sm uppercase flex flex-col gap-2 cursor-pointer hover:text-gray-300">
            <XCircleIcon
              height={42}
              width={42}
              onClick={() => setShowMenu(false)}
            />
            Close
          </div>
        )}

        <ul className="flex flex-col items-start w-auto lg:w-full flex-wrap lg:flex-1">
          {navItems.map(({ name, href, Icon }) => (
            <li
              key={href}
              className={`${checkMatch(href) ? "" : ""}
                relative block w-full group py-3 h-[48px] lg:h-[92px] xl:h-[48px]`}
            >
              {checkMatch(href) && !showMenu && (
                <motion.div
                  layoutId="activeLinkBG"
                  className="bg-stone-100 absolute inset-0 z-0"
                ></motion.div>
              )}
              <Link href={href}>
                <div
                  className={`flex font-heading items-center gap-2 lg:absolute inset-0 py-4 lg:py-0 px-8 z-10 lg:justify-center xl:justify-start lg:flex-col lg:gap-1 xl:gap-2 xl:flex-row ${
                    checkMatch(href) && !showMenu
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
                  {/* <div className="lg:hidden xl:block">{name}</div> */}
                  <div className="lg:text-sm xl:text-base lg:text-center xl:text-left">
                    {name}
                  </div>
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
                className="relative w-8 h-8 md:w-8 md:h-8 block"
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
