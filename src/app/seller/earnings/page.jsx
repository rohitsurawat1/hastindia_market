"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
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

export default function SellerEarnings() {
  const { user } = useAuth();
  const [earningsData, setEarningsData] = useState({
    totalEarnings: 0,
    monthlyEarnings: [],
    recentTransactions: [],
  });
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarningsData = async () => {
      if (user) {
        try {
          setLoading(true);
          setError(null);
          const ordersQuery = query(
            collection(db, "orders"),
            where("sellerId", "==", user.uid),
            orderBy("createdAt", "desc")
          );
          const ordersSnapshot = await getDocs(ordersQuery);
          const orders = ordersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const totalEarnings = orders.reduce(
            (sum, order) => sum + order.total,
            0
          );

          const monthlyEarnings = orders.reduce((acc, order) => {
            const date = new Date(order.createdAt.seconds * 1000);
            const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
            const existingEntry = acc.find(
              (entry) => entry.month === monthYear
            );
            if (existingEntry) {
              existingEntry.earnings += order.total;
            } else {
              acc.push({ month: monthYear, earnings: order.total });
            }
            return acc;
          }, []);

          const recentTransactions = orders.slice(0, 10).map((order) => ({
            id: order.id,
            date: new Date(order.createdAt.seconds * 1000).toLocaleDateString(),
            amount: order.total,
          }));

          setEarningsData({
            totalEarnings,
            monthlyEarnings,
            recentTransactions,
          });
        } catch (err) {
          console.error("Error fetching earnings data:", err);
          setError("Failed to load earnings data. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEarningsData();
  }, [user]);

  const chartData = useMemo(() => {
    if (timeFrame === "yearly") {
      return earningsData.monthlyEarnings;
    } else {
      // For monthly view, we'll use the last 30 days
      const last30Days = new Array(30)
        .fill(0)
        .map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() - index);
          return date.toISOString().split("T")[0];
        })
        .reverse();

      return last30Days.map((date) => {
        const earnings = earningsData.recentTransactions
          .filter((transaction) => transaction.date === date)
          .reduce((sum, transaction) => sum + transaction.amount, 0);
        return { date, earnings };
      });
    }
  }, [earningsData, timeFrame]);

  if (loading) {
    return <div>Loading earnings data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Earnings</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            ₹{earningsData.totalEarnings.toFixed(2)}
          </p>
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Earnings Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={timeFrame === "yearly" ? "month" : "date"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {earningsData.recentTransactions.map((transaction) => (
              <li key={transaction.id} className="mb-2">
                {transaction.date} - ₹{transaction.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
