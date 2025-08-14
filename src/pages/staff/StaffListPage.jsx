// src/pages/staff/StaffListPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { StaffDataTable } from './StaffDataTable';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle } from 'lucide-react';

// A skeleton loader that mimics the table and header
const StaffListSkeleton = () => (
  <div>
    <div className="flex items-center justify-between mb-8">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  </div>
);

const StaffListPage = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        // Artificial delay to see the skeleton
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await api.get('/api/staff');
        setStaffList(response.data);
      } catch (err) {
        setError('Failed to fetch staff data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  if (loading) return <StaffListSkeleton />;
  if (error) return <div className="text-red-500 font-semibold p-4 border rounded-md bg-red-50">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Members</h1>
          <p className="text-muted-foreground mt-1">
            View, manage, and issue ID cards for all staff.
          </p>
        </div>
        <Button onClick={() => navigate('/staff/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Staff
        </Button>
      </div>
      
      {/* The Data Table component does all the heavy lifting for display */}
      <StaffDataTable data={staffList} />
    </div>
  );
};

export default StaffListPage;