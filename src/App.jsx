import { useState, useEffect } from "react";
import GoalTracker from "./components/GoalTracker";
import DailyTracker from "./components/DailyTracker";
import WaterEggTracker from "./components/WaterEggTracker";
import WeightChart from "./components/WeightChart";
import HistoryPage from "./components/HistoryPage";

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
  const [page, setPage] = useState("home");

  // 🔔 Smart Notifications
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    const scheduleReminder = () => {
      if (Notification.permission !== "granted") return;

      const hour = new Date().getHours();

      if (hour === 7) {
        new Notification("🏋️ Time for workout!");
      }

      if ([10, 14, 18].includes(hour)) {
        new Notification("🍗 Eat protein / eggs!");
      }

      if (hour % 2 === 0) {
        new Notification("💧 Drink water!");
      }
    };

    const interval = setInterval(scheduleReminder, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // 📦 Load Data
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
    } catch {
      console.log("Error loading data");
    }
  }, []);

  // 💾 Save Data
  useEffect(() => {
    localStorage.setItem(
      "shred-data",
      JSON.stringify({ checked, water, eggs, history, streak })
    );
  }, [checked, water, eggs, history, streak]);

  const toggle = (task) => {
    setChecked((prev) => ({ ...prev, [task]: !prev[task] }));
  };

  const count = Object.values(checked).filter(Boolean).length;

  const reset = () => {
    if (!confirm("End day?")) return;

    const newEntry = {
      date: new Date().toLocaleDateString(),
      completed: count,
      water,
      eggs,
    };

    const existing = JSON.parse(localStorage.getItem("history")) || [];
    localStorage.setItem("history", JSON.stringify([...existing, newEntry]));

    if (count === tasks.length) {
      setStreak((prev) => prev + 1);
    }

    setChecked({});
    setWater(0);
    setEggs(0);
  };

  const addWeight = () => {
    if (!weight) return;

    setHistory((prev) => [
      ...prev,
      {
        date: new Date().toLocaleDateString(),
        weight: Number(weight),
      },
    ]);

    setWeight("");
  };

  // 🎯 100 Day Goal Logic
  const totalDays = 100;
  const dayProgress = Math.min(streak, totalDays);
  const progressPercent = (dayProgress / totalDays) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black flex items-center justify-center p-5 relative">

      {/* Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-green-500 blur-[120px] opacity-20 rounded-full top-10 left-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-md space-y-6 z-10">

        {/* HOME PAGE */}
        {page === "home" && (
          <>
            <GoalTracker
              day={dayProgress}
              total={totalDays}
              percent={progressPercent}
            />

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
              addWater={() =>
                setWater((w) => Math.min(w + 250, 4000))
              }
              eggs={eggs}
              setEggs={setEggs}
            />

            <WeightChart
              weight={weight}
              setWeight={setWeight}
              addWeight={addWeight}
              history={history}
            />
          </>
        )}

        {/* HISTORY PAGE */}
        {page === "history" && <HistoryPage />}
      </div>

      {/* 🔻 Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/10 flex justify-around py-3 text-white">

        <button
          onClick={() => setPage("home")}
          className="flex flex-col items-center text-sm"
        >
          🏠
          <span>Home</span>
        </button>

        <button
          onClick={() => setPage("history")}
          className="flex flex-col items-center text-sm"
        >
          📅
          <span>History</span>
        </button>

      </div>
    </div>
  );
}