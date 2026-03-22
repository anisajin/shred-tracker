import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function WeightChart({ weight, setWeight, addWeight, history }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/30 rounded-2xl p-4 text-white"
    >
      <h2 className="font-bold mb-2 text-center">📊 Weight Progress</h2>

      <div className="flex gap-2 mt-2">
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        className="bg-white/10 border border-white/20 p-2 rounded-xl w-full text-white placeholder-gray-400"
        />
        <button onClick={addWeight} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:scale-105 transition px-3 rounded">
          Add
        </button>
      </div>

      <div className="mt-4 w-full h-[200px] min-h-[200px]">
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={history}>
      <XAxis dataKey="date" hide />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="weight" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
</div>
    </motion.div>
  );
}