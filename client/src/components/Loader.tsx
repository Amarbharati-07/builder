import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@assets/generated_images/elegant_gold_real_estate_logo.png";

export function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full animate-pulse" />
            <img
              src={logoImage}
              alt="Luxe Estates Logo"
              className="w-32 h-32 md:w-48 md:h-48 relative z-10 object-contain"
            />
          </motion.div>

          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: 5,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-6 text-primary font-serif tracking-[0.3em] uppercase text-xs md:text-sm font-medium"
          >
            Crafting Excellence
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
