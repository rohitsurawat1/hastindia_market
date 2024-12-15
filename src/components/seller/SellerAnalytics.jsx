import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SellerAnalytics({ orders }) {
  const [timeFrame, setTimeFrame] = useState("weekly");

  const chartData = useMemo(() => {
    const now = new Date();
    const timeFrames = {
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    const daysToShow = timeFrames[timeFrame];

    const salesByDay = {};
    for (let i = 0; i < daysToShow; i++) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - i
      );
      salesByDay[date.toISOString().split("T")[0]] = 0;
    }

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt.seconds * 1000)
        .toISOString()
        .split("T")[0];
      if (salesByDay.hasOwnProperty(orderDate)) {
        salesByDay[orderDate] += order.total;
      }
    });

    return Object.entries(salesByDay)
      .map(([date, sales]) => ({ date, sales }))
      .reverse();
  }, [orders, timeFrame]);

  return (
    <div>
      <div className="mb-4">
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
