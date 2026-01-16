"use client";

import { getPriceHistory } from "@/app/actions";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PriceChart = ({ productId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const history = await getPriceHistory(productId);
      const chartData = history.map((item) => ({
        date: new Date(item.checked_at).toLocaleDateString(),
        price: parseFloat(item.price),
      }));
      setData(chartData);
      setLoading(false);
    }
    loadData();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 w-full">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading Chart...
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div className="text-center py-8 w-full">
        No price history available. Check back later!
      </div>
    );
  }

  const isPriceUp =
    data.length > 1 && data[data.length - 1].price > data[0].price;

  const lineColor = isPriceUp ? "#dc2626" : "#0f766e";

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium mb-2 text-gray-700">Price History</h4>

      <div className="w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 16, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 6"
              vertical={false}
              strokeOpacity={0.3}
            />

            {/* X AXIS */}
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
            />

            {/* Y AXIS */}
            <YAxis
              tickFormatter={(value) => `₹${value}`}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
              width={56}
            />

            <Tooltip
              formatter={(value) => `₹${value}`}
              contentStyle={{
                fontSize: "12px",
                borderRadius: "8px",
              }}
            />
            <defs>
              <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0f766e" />
                <stop offset="100%" stopColor={lineColor} />
              </linearGradient>
            </defs>
            
            <Line
              stroke="url(#trendLine)"
              strokeWidth={2}
              dataKey="price"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
