import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HistoryPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history")) || [];
    setData(stored.reverse()); // latest first
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white"
    >
      <h2 className="text-xl font-bold text-center mb-4">📅 History</h2>

      {data.length === 0 && (
        <p className="text-center text-gray-400">No data yet</p>
      )}

      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 p-3 rounded-xl border border-white/10"
          >
            <p className="text-sm text-gray-300">{item.date}</p>
            <p>Tasks: {item.completed}/6</p>
            <p>💧 Water: {item.water} ml</p>
            <p>🥚 Eggs: {item.eggs}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}