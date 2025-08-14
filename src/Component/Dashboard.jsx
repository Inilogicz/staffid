import React, { useState, useEffect } from 'react';
import { 
  Bell,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

// Histogram component with improved responsiveness
const Histogram = ({ data }) => {
  const maxValue = Math.max(...data);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const bars = data.map((value, index) => {
    const heightPercent = maxValue ? (value / maxValue) * 100 : 0;
    return (
      <div
        key={index}
        className={`flex-1 mx-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg 
          transition-all duration-700 ease-out hover:from-blue-600 hover:to-blue-500 
          hover:scale-105 cursor-pointer group relative ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          height: isVisible ? `${heightPercent}%` : '0%',
          transitionDelay: `${index * 100}ms`
        }}
      >
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 
          bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 
          group-hover:opacity-100 transition-opacity duration-200">
          {value}
        </div>
      </div>
    );
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 h-full">
      <div className="flex justify-between items-end h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 mb-4">
        {bars}
      </div>
      <div className="flex justify-between text-xs text-gray-500 px-2">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, index) => (
          <span key={index}>{month}</span>
        ))}
      </div>
    </div>
  );
};

// PieChart component with improved design
const PieChart = ({ data }) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  const [isVisible, setIsVisible] = useState(false);
  
  let startAngle = 0;
  const colors = ['#EF4444', '#10B981', '#F59E0B'];
  const labels = ['Not Issued', 'Issued', 'Printed'];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const segments = data.map((value, index) => {
    const percentage = (value / total) * 100;
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    const result = { startAngle, endAngle, percentage, value, color: colors[index] };
    startAngle = endAngle;
    return result;
  });

  const gradients = segments.map(segment => 
    `${segment.color} ${segment.startAngle}deg ${segment.endAngle}deg`
  ).join(', ');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 h-full">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mx-auto mb-6">
        <div
          className={`w-full h-full rounded-full transition-all duration-1000 ease-out ${
            isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
          style={{ background: `conic-gradient(${gradients})` }}
        >
          <div className="absolute inset-4 sm:inset-6 bg-white rounded-full flex items-center justify-center shadow-inner">
            <div className="text-center">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{total}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div 
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm" 
                style={{ backgroundColor: segment.color }}
              ></div>
              <span className="text-xs sm:text-sm text-gray-700 font-medium">{labels[index]}</span>
            </div>
            <div className="text-right">
              <div className="text-xs sm:text-sm font-semibold text-gray-800">{segment.value}</div>
              <div className="text-xs text-gray-500">{segment.percentage.toFixed(1)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Staffs',
      value: '420',
      change: '+12%',
      changeType: 'positive',
      description: 'From last month'
    },
    {
      title: 'Card Issues',
      value: '150',
      change: '-8%',
      changeType: 'negative',
      description: 'From last month'
    },
    {
      title: 'Active Staff',
      value: '300',
      change: '+2%',
      changeType: 'positive',
      description: 'From last month'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              Welcome back, Admin
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Here's what's happening with your team today
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 
              hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 
                rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100
              hover:shadow-md hover:border-gray-200 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <p className="text-gray-600 font-medium text-sm sm:text-base">{stat.title}</p>
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="text-green-500" size={18} />
                ) : (
                  <TrendingDown className="text-red-500" size={18} />
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 
                group-hover:text-blue-600 transition-colors">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                <span className={`font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>{' '}
                {stat.description}
              </p>
            </div>
          ))}
          
          {/* Additional cards for larger screens */}
          <div className="hidden xl:block bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100
            hover:shadow-md hover:border-gray-200 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-600 font-medium text-sm sm:text-base">Pending Reviews</p>
              <TrendingUp className="text-blue-500" size={18} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 
              group-hover:text-blue-600 transition-colors">
              25
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              <span className="font-semibold text-blue-500">+5%</span> From last week
            </p>
          </div>

          <div className="hidden 2xl:block bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100
            hover:shadow-md hover:border-gray-200 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <p className="text-gray-600 font-medium text-sm sm:text-base">System Uptime</p>
              <TrendingUp className="text-green-500" size={18} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 
              group-hover:text-blue-600 transition-colors">
              99.9%
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              <span className="font-semibold text-green-500">Excellent</span> Performance
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Staff Distribution</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm
                transition-colors duration-200">
                View Details
              </button>
            </div>
            <Histogram data={[50, 120, 150, 80, 200]} />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Card Status Distribution</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm
                transition-colors duration-200">
                View Details
              </button>
            </div>
            <PieChart data={[40, 30, 30]} />
          </div>

          {/* Additional chart for xl screens */}
          <div className="hidden xl:block space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Monthly Trends</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm
                transition-colors duration-200">
                View Details
              </button>
            </div>
            <Histogram data={[80, 95, 110, 125, 140]} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;