"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="mb-9">
          <div className="text-5xl leading-snug mb-4 text-[#A78BFA] drop-shadow-white-md font-bold">
            Developer Spotlight
          </div>
          <div className="text-center text-2xl font-semibold text-white">
            Celebrating Our Stars
          </div>
        </div>
        <div className="w-full leading-snug">
          <ol>
            <li className="text-lg text-white">
              Each month, we celebrate the outstanding achievements of
              developers who have made significant contributions to our
              community. This is your opportunity to step into the spotlight and
              be recognized across the entire Developer Universe! Whether you are
              at the top or still climbing, every effort counts. Remember, it is
              not just about reaching the peak, but about the journey and impact
              you make along the way. Your moment to shine is always within
              reach!
            </li>
          </ol>
        </div>
        <button className="bg-[#A78BFA] hover:drop-shadow-white-md rounded-full w-fit text-white  px-4 py-4">
          See Our Stars
        </button>
      </motion.div>
    </AuroraBackground>
  );
}
