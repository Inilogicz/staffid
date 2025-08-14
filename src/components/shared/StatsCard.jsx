// src/components/shared/StatsCard.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from 'recharts';

// Dummy data for the trend lines - in a real app, this could be from the API
const trendData = [
  { value: 10 }, { value: 20 }, { value: 15 }, { value: 30 },
  { value: 25 }, { value: 40 }, { value: 35 },
];

const StatsCard = ({ title, value, icon: Icon, description, trendColor }) => {
  return (
    <Card className="shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <div className="text-3xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className="w-24 h-12 -mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <Line type="monotone" dataKey="value" stroke={trendColor || "#8884d8"} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;