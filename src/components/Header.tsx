import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Bars3Icon,
  CodeBracketIcon,
  HomeIcon,
  NewspaperIcon,
  PencilIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import Photo from "../../public/profile.jpg";

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
    href: "/pubs",
    Icon: NewspaperIcon,
  },
];

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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <header className="@container lg:fixed top-0 w-full flex justify-between lg:grid lg:grid-cols-3 text-white px-4 py-3 items-center">
        <div className="flex">
          <Image
            src={Photo}
            alt="Tom Elliott"
            width={50}
            height={50}
            className="rounded-full border-2 border-gray-400"
          />
        </div>
        <div className="hidden lg:block">
          <Navigation />
        </div>
        <div className="hidden lg:block">
          <SocialIcons />
        </div>
        <div className="lg:hidden">
          <Bars3Icon
            className="h-10 w-10 cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </header>
      {isOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col gap-12 text-white px-8 py-12 items-end">
          <XCircleIcon
            className="h-10 w-10 cursor-pointer opacity-70 hover:opacity-100"
            onClick={() => setIsOpen(false)}
          />
          <Navigation />
          <SocialIcons />
        </div>
      )}
    </div>
  );
};

export default Header;

const Navigation = () => {
  return (
    <nav className="flex flex-col items-end gap-2 w-full @lg:flex-row @lg:justify-center @lg:gap-6">
      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="flex items-center gap-2 rounded-md px-4 py-3 @lg:p-0  hover:bg-gray-800 w-full @lg:w-auto justify-end relative @lg:justify-center group @lg:hover:bg-inherit"
        >
          <div className="@lg:absolute @lg:top-full @lg:left-1/2 @lg:-translate-x-1/2 @lg:whitespace-nowrap @lg:text-center @lg:opacity-0 @lg:group-hover:opacity-100">
            {item.name}
          </div>
          <item.Icon className="h-6 w-6" />
        </a>
      ))}
    </nav>
  );
};

const SocialIcons = () => {
  return (
    <div className="flex flex-col items-end gap-2 w-full text-xs @lg:flex-row @lg:justify-end @lg:gap-4">
      {social.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex items-center gap-2 rounded-md hover:bg-gray-800 px-4 py-2 w-full justify-end relative @lg:justify-center group @lg:hover:bg-inherit @lg:p-0 @lg:w-auto"
        >
          <div className="@lg:absolute @lg:top-full @lg:left-1/2 @lg:-translate-x-1/2 @lg:whitespace-nowrap @lg:text-center @lg:opacity-0 @lg:group-hover:opacity-100">
            {item.name}
          </div>
          <div className="relative h-6 w-6">
            <Image
              src={`/icons/${item.icon}.svg`}
              alt={item.name}
              fill={true}
              className="bg-white rounded-full p-[1px]"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
