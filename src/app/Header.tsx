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

const socialListVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delay: 1.5,
      staggerChildren: 0.3,
    },
  },
};

const socialIconVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
    },
  },
};

export default function Header() {
  const path = usePathname();

  const checkMatch = (href: string) => {
    if (href === "/") return path === href;
    return path?.includes(href);
  };

  return (
    <header className="flex flex-col items-center justify-start gap-12 lg:bg-gray-50 lg:h-full">
      <hgroup className="flex items-center justify-center gap-6 p-8">
        <motion.div
          initial={{ x: 100, rotateZ: 0, opacity: 0 }}
          animate={{ x: 0, rotateZ: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="/profile.jpg"
            alt="Tom Elliott"
            width={82}
            height={82}
            className="rounded shadow"
          />
        </motion.div>
        <div className="flex flex-col gap-2">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-2xl font-heading"
          >
            Tom Elliott
          </motion.h1>
          {/* social icons */}
          <motion.ul
            initial="initial"
            animate="animate"
            variants={socialListVariants}
            className="flex items-center gap-3"
          >
            {social.map(({ name, href, icon }) => (
              <motion.li variants={socialIconVariants} key={name}>
                <a href={href} title={name}>
                  <Image
                    src={`/icons/${icon}.svg`}
                    alt={name}
                    width={24}
                    height={24}
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>
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
                  className="bg-white absolute inset-0 z-0"
                ></motion.div>
              )}
              <Link href={href}>
                <div className="flex items-center gap-2 group-hover:text-gray-800 absolute inset-0 px-8 z-10">
                  <Icon
                    height={24}
                    width={24}
                    className="group-hover:animate-wiggle group-hover:scale-110"
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
