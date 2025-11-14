import React, { useEffect, useState, useMemo } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const getNormalizedDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const processChartData = (habits) => {
  const data = [];
  const today = getNormalizedDate(new Date());

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const normalizedDate = getNormalizedDate(date).getTime();

    let completedCount = 0;

    habits.forEach((habit) => {
      const completedOnThisDay = habit.completionHistory.some((entry) => {
        return getNormalizedDate(entry.date).getTime() === normalizedDate;
      });
      if (completedOnThisDay) {
        completedCount++;
      }
    });

    data.push({
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
      completed: completedCount,
    });
  }
  return data;
};

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const axios = useAxios();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;
    setLoading(true);

    axios
      .get(`/habits/${user.email}`)
      .then((res) => {
        setHabits(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch habits for dashboard:", error);
        setLoading(false);
      });
  }, [user, authLoading, axios]);

  const chartData = useMemo(() => processChartData(habits), [habits]);

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 my-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Your Progress Dashboard
      </h1>

      <h2 className="text-2xl font-semibold mb-6">Completions (Last 7 Days)</h2>
      <div className="w-full h-96 bg-base-100 shadow-xl rounded-lg p-4">
        {habits.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" stroke="#D6F4ED" />
              <YAxis allowDecimals={false} stroke="#D6F4ED" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#473472",
                  border: "none",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#D6F4ED"}}
              />
              <Legend />
              <Bar dataKey="completed" fill="#87BAC3" name="Habits Completed" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg">
              No habit data to display. Start completing habits!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
