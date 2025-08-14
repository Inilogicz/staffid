// src/pages/staff/UpdateStaffPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state
import PageHeader from '@/components/shared/PageHeader';

// A simple skeleton loader for the form
const FormSkeleton = () => (
  <div className="space-y-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
    ))}
  </div>
);

const UpdateStaffPage = () => {
  const { id } = useParams(); // Get staff ID from the URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    // Add other fields from your Staff model here
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 1. Fetch existing staff data when the component mounts
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/staff/${id}`);
        setFormData(response.data); // Pre-fill the form with existing data
      } catch (err) {
        setError('Failed to load staff data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaffData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. Handle the PUT request on form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await api.put(`/api/staff/${id}`, formData);
      alert('Staff updated successfully!'); // Replace with a better notification later
      navigate(`/staff/${id}`); // Redirect back to the detail page
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update staff.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Update Staff Information" subtitle="Loading data..." />
        <Card>
          <CardContent className="p-6">
            <FormSkeleton />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Update Staff Information"
        subtitle={`Editing profile for: ${formData.name}`}
      />
      <Card>
        <CardHeader>
          <CardTitle>Staff Details</CardTitle>
          <CardDescription>Make changes to the staff member's profile below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Fields */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" name="department" value={formData.department} onChange={handleInputChange} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" name="designation" value={formData.designation} onChange={handleInputChange} />
            </div>
            
            {/* Error and Submit Buttons */}
            {error && <p className="text-red-500 text-sm md:col-span-2">{error}</p>}
            <div className="flex justify-end gap-2 md:col-span-2">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateStaffPage;