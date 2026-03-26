"use client";

import { motion } from "framer-motion";

export default function BottomBlur() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 h-42 pointer-events-none z-50 backdrop-blur-2xl bg-white/[0.05] border-t border-white/[0.08] [mask-image:linear-gradient(to_top,black_50%,transparent)] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
    />
  );
}
