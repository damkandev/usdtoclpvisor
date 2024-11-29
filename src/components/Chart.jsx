"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  usd: {
    label: "CLP",
    color: "hsl(var(--chart-1))",
  },
};

export function Chart({ className }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mindicador.cl/api/dolar");
        const data = await response.json();

        const formattedData = data.serie
          .slice(0, 6)
          .reverse()
          .map((entry) => ({
            day: new Date(entry.fecha).toLocaleDateString("es-CL", {
              day: "numeric",
              month: "short",
            }),
            usd: entry.valor,
          }));

        console.log("Formatted Data:", formattedData);

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data from mindicador.cl:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`bg-contenedor rounded-xl ${className}`}>
      <CardHeader>
        <CardTitle>Valores del USD (últimos días)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer
            width="100%"
            height="100%"
            minHeight={300}
            minWidth={300}
          >
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={4}
              />
              <YAxis
                domain={["dataMin - 5", "dataMax + 5"]}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <Area
                dataKey="usd"
                type="linear"
                fill="rgba(62, 55, 48, 0.3)"
                fillOpacity={0.5}
                stroke="rgba(62, 55, 48, 1)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
