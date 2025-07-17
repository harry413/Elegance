
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiMiniShoppingBag } from "react-icons/hi2";


const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex overflow-hidden"
        >
          {/* Air-particle backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0  from-slate-900 via-slate-800 to-slate-900 bg-gradient-to-b"
          >
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px w-px rounded-full bg-white/80"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>

          {/* Left curtain with air-wafting fold */}
          <motion.div
            initial={{ x: 0, rotateY: 0 }}
            animate={{ x: "-100%", rotateY: 5 }}
            exit={{ x: "-100%", rotateY: 5 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute left-0 top-0 h-full w-1/2 origin-right"
            style={{ perspective: 1200 }}
          >
            <motion.div
              animate={{
                skewY: [-2, 2, -2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('/curtain-texture.svg')] bg-repeat opacity-20" />
            </motion.div>
          </motion.div>

          {/* Right curtain with air-wafting fold */}
          <motion.div
            initial={{ x: 0, rotateY: 0 }}
            animate={{ x: "100%", rotateY: -5 }}
            exit={{ x: "100%", rotateY: -5 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute right-0 top-0 h-full w-1/2 origin-left"
            style={{ perspective: 1200 }}
          >
            <motion.div
              animate={{
                skewY: [2, -2, 2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('/curtain-texture.svg')] bg-repeat opacity-20" />
            </motion.div>
          </motion.div>
          {/* Air-gust logo reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { delay: 0, duration: 0.4 },
            }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center text-white/10"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <HiMiniShoppingBag className="mx-auto mb-2 h-12 w-12 animate-pulse text-red-300" />
                <h2 className="text-5xl font-mono font-extrabold tracking-wider bg-gradient-to-l from-red-300 to-red-400 text-transparent bg-clip-text">ELEGANCE</h2>
                <p className="mt-2 text-sm text-red-300">Thread & scrolls</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default LoadingScreen;