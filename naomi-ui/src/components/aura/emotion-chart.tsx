"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { getEmotionColor } from "@/lib/utils";
import type { Emotion, EmotionBreakdown } from "@/types";

// Weekly trend line chart
interface WeeklyTrendChartProps {
  data: { date: string; score: number }[];
  height?: number;
}

export function WeeklyTrendChart({ data, height = 200 }: WeeklyTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="50%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#F9A8D4" />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "var(--text-muted)" }}
          dy={10}
        />
        <YAxis
          domain={[0, 10]}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "var(--text-muted)" }}
          ticks={[0, 5, 10]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "8px 12px",
          }}
          labelStyle={{ color: "var(--text-primary)", fontWeight: 500 }}
          formatter={(value: number) => [`Score: ${value.toFixed(1)}`, ""]}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="url(#scoreGradient)"
          strokeWidth={3}
          dot={{
            fill: "var(--aurora-purple)",
            strokeWidth: 2,
            r: 4,
          }}
          activeDot={{
            fill: "var(--aurora-purple)",
            strokeWidth: 0,
            r: 6,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Emotion breakdown horizontal bar chart
interface EmotionBreakdownChartProps {
  data: EmotionBreakdown;
  height?: number;
}

export function EmotionBreakdownChart({
  data,
  height = 200,
}: EmotionBreakdownChartProps) {
  const chartData = (Object.entries(data) as [Emotion, number][])
    .map(([emotion, value]) => ({
      emotion,
      value,
      label: emotion.charAt(0).toUpperCase() + emotion.slice(1),
      color: getEmotionColor(emotion),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
      >
        <XAxis
          type="number"
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "var(--text-muted)" }}
          ticks={[0, 50, 100]}
        />
        <YAxis
          type="category"
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 13, fill: "var(--text-primary)" }}
          width={70}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "8px 12px",
          }}
          formatter={(value: number) => [`${value}%`, ""]}
          cursor={{ fill: "var(--background)" }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// Mini sparkline chart for compact display
interface SparklineChartProps {
  data: number[];
  height?: number;
  width?: number;
}

export function SparklineChart({
  data,
  height = 40,
  width = 100,
}: SparklineChartProps) {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--aurora-purple)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
