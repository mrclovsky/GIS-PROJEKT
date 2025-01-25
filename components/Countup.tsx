import { MotionConfig } from "framer-motion";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../components/variants";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const countupData = [
  { value: 58, label: "Miejsc" },
  { value: 6, label: "Miast" },
  { value: 2142, label: "Opinii" },
  { value: 870, label: "Użytkowników" },
];

const Countup = () => {
    const [ref, inView] = useInView({
      triggerOnce: true,
    });
  
    const [countUpStarted, setCountUpStarted] = useState([false, false, false, false]);
  
    useEffect(() => {
      if (inView) {
        setCountUpStarted((prev) =>
          prev.map((hasStarted, index) => {
            if (!hasStarted) {
              return true;
            }
            return hasStarted;
          })
        );
      }
    }, [inView]);
  
    return (
      <motion.div
        ref={ref}
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        exit="hidden"
        className="flex max-w-lg md:max-w-xl xl:max-w-none mx-auto mb-8"
      >
        <div className="flex flex-1 xl:gap-x-6">
          {countupData.map((data, index) => (
            <div
              key={index}
              className={`relative flex-1 after:h-full after:border-r-2 after:border-yellow-400 after:absolute after:top-0 after:right-0 after:p-1`}>
              <div className={`text-xl lg:text-2xl font-extrabold mb-2 text-center`}>
                {countUpStarted[index] && <CountUp start={0} end={data.value} duration={7} />}
              </div>
              <div className="flex flex-row mx-2 md:mx-4 text-center items-center justify-center text-xs md:text-sm lg:text-md uppercase tracking-[2px] leading-[1.2] max-w-[100px]">
                {data.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };
  
  export default Countup;