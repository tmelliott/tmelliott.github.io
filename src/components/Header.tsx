import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "Github", handle: "tmelliott", url: "https://github.com/tmelliott" },
  {
    name: "Twitter",
    handle: "tomelliottnz",
    url: "https://twitter.com/tomelliottnz",
  },
  {
    name: "LinkedIn",
    handle: "tmelliott",
    url: "https://www.linkedin.com/in/tmelliott/",
  },
  {
    name: "Email",
    handle: "tom.elliott@auckland.ac.nz",
    url: "mailto:tom.elliott@auckland.ac.nz",
  },
];

type Props = {};

function Header({}: Props) {
  return (
    <div className="fixed top-0 z-10 w-full">
      <div className="mx-auto flex max-w-6xl justify-between px-4 py-2">
        {/* social links */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 1.2 } }}
          className="flex space-x-4"
        >
          {socialLinks.map((sl) => (
            <motion.div
              initial={{ opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
              className="group relative"
            >
              <SocialIcon
                url={sl.url}
                //   fgColor="transparent"
                bgColor="rgb(226 232 240)"
                style={{ height: 30, width: 30 }}
              />
              <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 text-xs font-bold  tracking-wider text-slate-200 opacity-0 transition group-hover:opacity-100">
                {sl.handle}
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* light/dark mode toggle(?), navigation */}
      </div>
    </div>
  );
}

export default Header;
