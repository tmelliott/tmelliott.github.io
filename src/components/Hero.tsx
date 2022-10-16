import { motion } from "framer-motion";
type Props = {};

function Hero({}: Props) {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-slate-600">
      {/* heading/logo */}

      {/* navigation */}

      {/* <div className="flex flex-col items-center">
        <motion.h1
          initial={{ filter: "blur(10px)", opacity: 0, y: -200 }}
          animate={{
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            transition: { delay: 0.5, duration: 3 },
          }}
          className="flex h-36 w-36 items-center justify-center  rounded-full bg-gradient-to-b from-gray-200 to-gray-400 px-8 text-center font-cursive text-6xl"
        >
          te
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 1.5, filter: "blur(8px)" }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(3px)",
            transition: { delay: 0.5, duration: 3 },
          }}
          className="mt-10 hidden h-[8px] w-3/5 rounded-[100%] bg-black lg:block"
        ></motion.div>
      </div> */}
    </div>
  );
}

export default Hero;
