import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function DailyTracker({
  tasks,
  checked,
  toggle,
  count,
  total,
  reset,
  streak,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
     className="bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-4 transition-all duration-300"
    >
      <h1 className="text-xl font-bold text-center text-white">🔥 Daily Tracker</h1>
       
      <div className="space-y-2 mt-3">
        {tasks.map((task) => (
          <div
            key={task}
            onClick={() => toggle(task)}
            className={`p-3 rounded-xl flex justify-between items-center cursor-pointer text-gray-300 transition-all duration-200 ${
                checked[task]
                  ? "bg-green-500/20 border border-green-400/30 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                  : "bg-white/5 hover:bg-white/10"
              }`}
          >
            {task}
            {checked[task] && <Check />}
          </div>
        ))}
      </div>

      <p className="text-center mt-2 text-gray-300">{count}/{total}</p>

      {count === total && (
        <p className="text-green-500 text-center">🔥 Perfect Day!</p>
      )}

      <button
        onClick={reset}
        className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:scale-105 transition py-2 rounded-xl"
      >
        End Day
      </button>
    </motion.div>
  );
}