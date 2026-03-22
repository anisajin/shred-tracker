import { motion } from "framer-motion";

export default function WaterEggTracker({ water, addWater, eggs, setEggs }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/30 rounded-2xl p-4 text-white"
    >
     <p className="text-gray-200">💧 Water: {water} ml</p>
     

      <button
        onClick={addWater}
        disabled={water >= 4000}
        className="w-full mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:scale-105 transition py-2 rounded-xl disabled:bg-gray-400"
      >
        +250ml
      </button>

      <p className="mt-3 text-gray-200">🥚 Eggs: {eggs}</p>

      <div className="flex gap-2 mt-2">
        <button onClick={() => setEggs(e => e + 1)} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:scale-105 transition px-3 py-1 rounded">
          +1
        </button>
        <button onClick={() => setEggs(e => Math.max(e - 1, 0))} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:scale-105 transition px-3 py-1 rounded">
          -1
        </button>
      </div>
    </motion.div>
  );
}