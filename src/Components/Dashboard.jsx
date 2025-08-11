import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Histogram component definition
const Histogram = ({ data }) => {
  const maxValue = Math.max(...data);
  const [isLoading, setIsLoading] = useState(true);
  const bars = data.map((value, index) => {
    const heightPercent = maxValue ? (value / maxValue) * 100 : 0;
    return (
      <div
        key={index}
        className="w-12 bg-blue-500 rounded-t mx-1 flex-1 transition-all duration-300 hover:bg-blue-600"
        style={{ height: `${heightPercent}%` }}
        title={`${value}`} // Tooltip for value
      ></div>
    );
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate loading delay
    return () => clearTimeout(timer); // Cleanup timer
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-end h-72 w-150 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        {bars}
      </div>
      <div className="flex space-x-20 mt-2 text-sm text-gray-600">
        <span>0</span>
        <span>50</span>
        <span>100</span>
        <span>150</span>
        <span>200</span>
        <span>250</span>
      </div>
    </div>
  );
};

// PieChart component definition
const PieChart = ({ data }) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  let startAngle = 0;
  const gradients = data.map((value, index) => {
    const percentage = (value / total) * 100;
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    const gradient = `${['#ece911ff', '#10B981', '#EF4444'][index % 3]} ${startAngle}deg ${endAngle}deg`;
    startAngle = endAngle;
    return gradient;
  }).join(', ');

  const [isLoading, setIsLoading] = useState(true);
  const labels = ['Not Issued', 'Issued', 'Printed'];
  const legendItems = data.map((value, index) => (
    <div key={index} className="flex items-center space-x-2">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#ece911ff', '#10B981', '#EF4444'][index % 3] }}></div>
      <span className="text-gray-700 text-sm">{labels[index]}: {value}</span>
    </div>
  ));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate loading delay
    return () => clearTimeout(timer); // Cleanup timer
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative w-72 h-72 mx-auto mt-6">
        <div
          className="w-full h-full rounded-full"
          style={{ background: `conic-gradient(${gradients})` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-gray-800 text-xl font-semibold">
          {total}
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-6">{legendItems}</div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="bg-gray-900 h-full p-5 pt-8 w-60 relative overflow-y-auto">
        <div className="flex gap-4">
          <img src="/assets/church_logo-1.png" alt="Logo" className="h-9 w-10 mt-2" />
          <p className="text-lg font-semibold text-white font-inter pb-8">
            Deeper Christian <br />Life Ministry
          </p>
        </div>

        <br />
        <div className="flex gap-4 cursor-pointer hover:bg-gray-800 rounded-lg hover:scale-105 transition duration-100 ease-in-out">
          <img
            src="/assets/home-alt-2.png"
            alt="Key"
            className="h-5 w-5 mb-6 filter brightness-0 invert"
          />
          <p className="text-white py-0.5 font-Inter font-semibold text-[14px] leading-[1.45] tracking-normal">
            Dashboard
          </p>
        </div>
        <div className="flex gap-4 cursor-pointer hover:bg-gray-800 rounded-lg hover:scale-105 transition duration-100 ease-in-out">
          <img
            src="/assets/card-view-tiles.png"
            alt="Key"
            className="h-5 w-5 mb-6 filter brightness-0 invert"
          />
          <p
            className="text-white font-semibold cursor-pointer py-0.5 font-Inter font-normal text-[14px] leading-[1.45] tracking-normal"
            onClick={() => navigate('/allstaff')}
          >
            View all staffs
          </p>
        </div>
        <div className="flex gap-4 cursor-pointer hover:bg-gray-800 rounded-lg hover:scale-105 transition duration-100 ease-in-out">
          <img
            src="/assets/file-plus.png"
            alt="Key"
            className="h-5 w-5 mb-6 filter brightness-0 invert"
          />
          <p
            className="text-white font-semibold py-0.5 font-Inter font-normal text-[14px] leading-[1.45] tracking-normal"
            onClick={() => navigate('/generateid')}
          >
            Generate ID
          </p>
        </div>
        <div className="flex gap-4 mt-70 cursor-pointer hover:bg-gray-800 rounded-lg hover:scale-105 transition duration-100 ease-in-out">
          <img
            src="/assets/history.png"
            alt="Key"
            className="h-5 w-5 mb-6 filter brightness-0 invert"
          />
          <p className="text-white py-0.5 font-Inter font-normal text-[14px] leading-[1.45] tracking-normal">
            History
          </p>
        </div>
        <div className="flex gap-4 cursor-pointer hover:bg-gray-800 rounded-lg hover:scale-105 transition duration-300 ease-in-out">
          <img
            src="/assets/queue.png"
            alt="Key"
            className="h-5 w-5 mb-6 filter brightness-0 invert"
          />
          <p className="text-white py-0.5 font-Inter font-normal text-[14px] leading-[1.45] tracking-normal">
            Print Queue
          </p>
        </div>
        <div className="flex gap-4">
          <img
            src="/assets/log-out.png"
            alt="Key"
            className="h-5 w-5 mb-6 filter brightness-0 invert"
          />
          <p className="text-white h-8 w-8 font-semibold py-0.5">
            Log out <span className="h-5 w-5 font-normal">@admin</span>
          </p>
        </div>
      </div>
      {/* Second side */}
      <div className="flex-1  p-2  overflow-y-auto">
        <div className="bg-white border border-gray-200 w-331  h-25">
          <div className="flex items-center justify-between space-x-  mb-8 px-4 py-2">
      <h1 className="text-3xl font-bold text-gray-800">Welcome back, Admin <br/> <span className="text-sm  text-gray-600 ">Here's what's happening with your team today</span></h1>
      <img
        src="/assets/bell-ring (2).png"
        alt="Notification"
        className="h-6 w-6 cursor-pointer rounded-full"
        
      />

      </div>      
          {/* <button
            type="button"
            className="w-48 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-semibold"
            onClick={() => navigate('/addstaff')}
          >
            + Add new staff
          </button> */}
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-8 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md w-80 h-35 hover:shadow-lg transition-shadow duration-300">
            <p className="text-gray-500 text-lg">Total Number of Staffs</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">420</h2>
            <p className="text-gray-500 text-sm">  <span className="text-green-500 text-sm">12%</span> From last month  </p>
            {/* <img className="h-6 w-7" src='/assets/Avatars.png'/> */}
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3 w-80 h-35 shadow-md hover:shadow-lg transition-shadow duration-300">
            <p className="text-gray-500 text-lg">Total Number of Card Issues</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">150</h2>
             <p className="text-gray-500 text-sm">  <span className="text-green-500 text-sm">-8%</span> From last month  </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md w-80 h-35 hover:shadow-lg transition-shadow duration-300">
            <p className="text-gray-500 text-lg">Active Staff</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">300</h2>
             <p className="text-gray-500 text-sm">  <span className="text-green-500 text-sm">+2%</span> From last month  </p>
          </div>
        </div>

        {/* Histogram and PieChart on the same line */}
        <div className="flex justify-between items-start mt-8">
          <div className="w-1/2 pr-4">
            <h3 className="text-xl px-6 font-semibold text-gray-800 mb-4">Staff Distribution</h3>
            <Histogram data={[50, 120, 150, 80, 200]} />
          </div>
          <div className="w-1/2 pl-4">
            <h3 className="text-xl px-6 font-semibold text-gray-800 mb-4">Card Status Distribution</h3>
            <PieChart data={[40, 30, 30]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;