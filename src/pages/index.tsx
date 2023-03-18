import { type NextPage } from "next";

import { motion } from "framer-motion";

import HeadTags from "~/components/Head";

const tags = ["Statistical Computing", "Data Science", "Data Apps and Tools"];

const Hello =
  "This is my own little website where I'll post anything I feel like, really! This will probably include any talks I've given, articles/reports I've written, and posts about work, gardening, or other hobbies.";

const Home: NextPage = () => {
  return (
    <>
      <HeadTags title="Tom Elliott" description="Hello" />
      <div className="flex-1 flex flex-col gap-24 justify-center items-center">
        <div className="aspect-square flex justify-center items-center rounded-full relative">
          <div className="absolute bg-gray-300 bg-opacity-20 inset-0 rounded-full"></div>
          <motion.div
            initial={{ height: 0, width: 0, y: 10 }}
            animate={{
              height: "min(40vh, 80vw)",
              width: "min(40vh, 80vw)",
              y: 0,
              transition: { duration: 1 },
            }}
            className="inset-0 flex relative rounded-full"
          ></motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 1, duration: 2 },
            }}
            className="absolute bg-white px-10 py-8 font-heading text-4xl bg-clip-text text-transparent text-center md:text-6xl"
          >
            TOM ELLIOTT
            <p className="text-base pt-4 flex font-bold flex-col gap-1 md:flex-row md:gap-2">
              {tags.map((tag, i) => (
                <span key={i} className={i > 0 ? "md:border-l md:pl-2" : ""}>
                  {tag}
                </span>
              ))}
            </p>
          </motion.h1>
        </div>
      </div>
    </>
  );
};

export default Home;
