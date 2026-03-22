import { useState, useEffect } from "react";
import GoalTracker from "./components/GoalTracker";
import DailyTracker from "./components/DailyTracker";
import WaterEggTracker from "./components/WaterEggTracker";
import WeightChart from "./components/WeightChart";

const tasks = [
  "Workout done",
  "Cardio done",
  "Protein taken",
  "Eggs completed",
  "No junk food",
  "4L water completed",
];

export default function App() {
  const [checked, setChecked] = useState({});
  const [water, setWater] = useState(0);
  const [eggs, setEggs] = useState(0);
  const [weight, setWeight] = useState("");
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);

  // ✅ LOAD DATA
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("shred-data"));
      if (saved) {
        setChecked(saved.checked || {});
        setWater(saved.water || 0);
        setEggs(saved.eggs || 0);
        setHistory(saved.history || []);
        setStreak(saved.streak || 0);
      }
    } catch (e) {
      console.log("Error loading data");
    }
  }, []);

  // ✅ SAVE DATA
  useEffect(() => {
    localStorage.setItem(
      "shred-data",
      JSON.stringify({ checked, water, eggs, history, streak })
    );
  }, [checked, water, eggs, history, streak]);

  const toggle = (task) => {
    setChecked(prev => ({ ...prev, [task]: !prev[task] }));
  };

  const count = Object.values(checked).filter(Boolean).length;

  const reset = () => {
    if (!confirm("End day?")) return;
    if (count === tasks.length) setStreak(s => s + 1);
    setChecked({});
    setWater(0);
    setEggs(0);
  };

  const addWeight = () => {
    if (!weight) return;
    setHistory(prev => [
      ...prev,
      { date: new Date().toLocaleDateString(), weight: Number(weight) },
    ]);
    setWeight("");
  };

  // ✅ 100 Day Logic
  const totalDays = 100;
  const dayProgress = Math.min(streak, totalDays);
  const progressPercent = (dayProgress / totalDays) * 100;
  console.log("Count:", count, "Total:", tasks.length, "Streak:", streak);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black flex items-center justify-center p-5">
      <div className="w-full max-w-md space-y-6">

        <GoalTracker 
          day={dayProgress} 
          total={totalDays} 
          percent={progressPercent} 
        />

        {/* ✅ Show completion message HERE */}
        {dayProgress === totalDays && (
          <p className="text-green-400 text-center">
            🔥 You completed the 100-day challenge!
          </p>
        )}

        <DailyTracker
          tasks={tasks}
          checked={checked}
          toggle={toggle}
          count={count}
          total={tasks.length}
          reset={reset}
          streak={streak}
        />

        <WaterEggTracker
          water={water}
          addWater={() => setWater(w => Math.min(w + 250, 4000))}
          eggs={eggs}
          setEggs={setEggs}
        />

        <WeightChart
          weight={weight}
          setWeight={setWeight}
          addWeight={addWeight}
          history={history}
        />

      </div>
    </div>
    
  );
}