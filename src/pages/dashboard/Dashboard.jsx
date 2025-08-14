// src/pages/dashboard/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip as PieTooltip, Sector, Legend } from 'recharts';
import { Users, CreditCard, AlertTriangle, CheckCircle, PlusCircle } from 'lucide-react';
import api from '@/lib/api';
import StatsCard from '@/components/shared/StatsCard';
import { UserNav } from '@/components/shared/UserNav';
import { DashboardSkeleton } from './DashboardSkeleton';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const PIE_COLORS = { 'Not Issued': '#3b82f6', 'Issued': '#22c55e', 'Printed': '#f97316' };
const getInitials = (name = '') => name.split(' ').map(n => n[0]).join('').toUpperCase();

// Custom Active Shape for Pie Chart
const renderActiveShape = (props) => {
    // ... (keep the same renderActiveShape function from before)
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
    return (
      <g>
        <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} className="text-lg font-bold">
          {payload.value}
        </text>
        <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="#999" className="text-sm">
          ({(percent * 100).toFixed(0)}%)
        </text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      </g>
    );
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // ... (Your data fetching logic remains the same)
     const fetchDashboardData = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const [statsRes, chartRes, activityRes] = await Promise.all([
            api.get('/api/dashboard'),
            api.get('/api/dashboard/chart-data?period=monthly'),
            api.get('/api/history/recent?limit=5')
          ]);
          setStats(statsRes.data);
          setChartData(chartRes.data);
          setRecentActivity(activityRes.data);
        } catch (err) {
          setError("Could not load dashboard data.");
        } finally {
          setLoading(false);
        }
      };
      fetchDashboardData();
  }, []);

  if (loading) return <DashboardSkeleton />;
  if (error) return <div className="text-red-500">{error}</div>;

  const pieChartData = [
    { name: 'Not Issued', value: stats?.distribution?.notIssued || 0 },
    { name: 'Issued', value: stats?.distribution?.issued || 0 },
    { name: 'Printed', value: stats?.distribution?.printed || 0 },
  ].filter(item => item.value > 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* ======================= HEADER ======================= */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, here is a real-time overview of the system.
          </p>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-4">
          <Button size="lg" onClick={() => navigate('/staff/new')} className="shadow-md">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New ID
          </Button>
          {/* <UserNav /> */}
        </div>
      </header>
      
      {/* ======================= STATS CARDS ======================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Staff" value={stats?.totalStaff} icon={Users} description="All staff in system" color="bg-blue-500" bgColor="bg-white" />
        <StatsCard title="Card Actions (Total)" value={stats?.totalIssues?.total} icon={CreditCard} description={`Successful: ${stats?.totalIssues?.success}`} color="bg-green-500" bgColor="bg-white" />
        <StatsCard title="Newly Added" value={stats?.newlyAddedStaff} icon={CheckCircle} description="In last 7 days" color="bg-purple-500" bgColor="bg-white" />
        <StatsCard title="Failed Actions" value={stats?.totalIssues?.failed} icon={AlertTriangle} description="Needs attention" color="bg-red-500" bgColor="bg-white" />
      </div>

      {/* ======================= MAIN GRID: CHARTS & ACTIVITY ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* == Left Column (Bar Chart & Recent Activity) == */}
        <div className="lg:col-span-2 space-y-6">
         

        <Card className="lg:col-span-2">
        <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
            <CardDescription>Total card-related actions logged per month.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                dataKey="label" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                allowDecimals={false} 
                stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                cursor={{ fill: '#ffff' }} 
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderRadius: '0.5rem',
                    border: '1px solid hsl(var(--border))'
                }}
                />
                <Legend />
                {/* === THE FIX IS HERE === */}
                {/* We now use a direct hex color that SVG understands perfectly. */}
                <Bar 
                dataKey="count" 
                name="Actions" 
                fill="#3b82f6" /* A nice blue color */
                radius={[4, 4, 0, 0]} 
                />
            </BarChart>
            </ResponsiveContainer>
        </CardContent>
        </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>The last 5 actions performed in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((activity) => (
                    <TableRow key={activity._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(activity.staff?.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{activity.staff?.name || 'Unknown'}</p>
                            <p className="text-sm text-muted-foreground">{activity.staff?.department || 'N/A'}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={activity.status === 'failed' ? 'destructive' : undefined} 
                          className={activity.status !== 'failed' ? 'bg-green-500 text-white' : ''}
                        >
                          {activity.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">{new Date(activity.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* == Right Column (Pie Chart) == */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg h-full">
            <CardHeader>
              <CardTitle>Card Status Distribution</CardTitle>
              <CardDescription>Live breakdown of all staff cards.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsPieChart>
                  <PieTooltip />
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name]} stroke={PIE_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Legend iconType="circle" />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;