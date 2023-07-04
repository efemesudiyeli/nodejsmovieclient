import React from "react";
import { motion } from "framer-motion";

export default function Hero1() {
  return (
    <div className="flex justify-center flex-col w-full bg-gradient-to-r from-indigo-900 via-purple-600  to-purple-950 p-14">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
        }}
      >
        <h1 className="text-5xl font-bold">Merhaba!</h1>
        <p className="text-lg">İşte izleme listen!</p>
      </motion.div>
    </div>
  );
}
