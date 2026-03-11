import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold"
      >
        Jorge's Tic Tac Toe
      </motion.h1>
      <Link
        to="/game"
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl"
      >
        Play
      </Link>
    </div>
  );
}
