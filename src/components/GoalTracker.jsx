import { motion } from "framer-motion";

export default function GoalTracker({ day, total, percent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/30 rounded-2xl p-4 text-white"
    >
      <h2 className="font-bold mb-2 text-center">🎯 100 Day Goal</h2>

      <div className="w-full bg-gray-300/40 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-center mt-2 text-sm text-gray-300">
        Day {day} / {total}
      </p>
    </motion.div>
  );
}