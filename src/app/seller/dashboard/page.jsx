"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import SellerProductList from "@/components/seller/SellerProductList";
import SellerOrderList from "@/components/seller/SellerOrderList";
import SellerAnalytics from "@/components/seller/SellerAnalytics";

export default function SellerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    recentOrders: [],
    salesData: [],
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== "seller") {
      router.push("/");
    } else {
      fetchDashboardData();
    }
  }, [user, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [ordersSnapshot, productsSnapshot] = await Promise.all([
        getDocs(
          query(
            collection(db, "orders"),
            where("sellerId", "==", user.uid),
            orderBy("createdAt", "desc"),
            limit(100) // Limit to last 100 orders for performance
          )
        ),
        getDocs(
          query(collection(db, "products"), where("sellerId", "==", user.uid))
        ),
      ]);

      const orders = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
      const totalOrders = orders.length;
      const totalProducts = productsSnapshot.size;
      const recentOrders = orders.slice(0, 5);

      const salesData = orders.reduce((acc, order) => {
        const date = new Date(
          order.createdAt.seconds * 1000
        ).toLocaleDateString();
        const existingEntry = acc.find((entry) => entry.date === date);
        if (existingEntry) {
          existingEntry.sales += order.total;
        } else {
          acc.push({ date, sales: order.total });
        }
        return acc;
      }, []);

      setDashboardData({
        totalSales,
        totalOrders,
        totalProducts,
        recentOrders,
        salesData,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const memoizedSalesChart = useMemo(
    () => (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dashboardData.salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    ),
    [dashboardData.salesData]
  );

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ₹{dashboardData.totalSales.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.totalProducts}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <SellerOrderList orders={dashboardData.recentOrders} />
            <Button asChild className="mt-4">
              <Link href="/seller/orders">View All Orders</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>{memoizedSalesChart}</CardContent>
        </Card>
      </div>
    </div>
  );
}
