import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { getImageUrl, getInitials } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Skeleton Loader for this page
const UpdateStaffSkeleton = () => (
    <div className="space-y-6">
        <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1"><Skeleton className="h-64 w-full" /></div>
            <div className="lg:col-span-2"><Skeleton className="h-96 w-full" /></div>
        </div>
    </div>
);


const UpdateStaffPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', department: '', designation: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ open: false, title: '', message: '' });

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/staff/${id}`);
        const { passportPhotoUrl, ...textData } = response.data;
        setFormData(textData);
        setImagePreview(getImageUrl(passportPhotoUrl));
      } catch (err) {
        setError('Failed to load staff data.');
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
        submissionData.append(key, formData[key] || '');
    });

    if (imageFile) {
      submissionData.append('passportPhoto', imageFile);
    }
    
    try {
      await api.put(`/api/staff/${id}`, submissionData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNotification({
        open: true,
        title: 'Update Successful',
        message: "The staff member's profile has been saved successfully.",
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update staff. Please check the details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // This function is called when the success modal is closed
  const handleNotificationClose = () => {
    setNotification({ open: false, title: '', message: '' });
    navigate(`/staff/${id}`); // Navigate back to the detail page
  };

  if (loading) return <UpdateStaffSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Update Staff Information</h1>
        <p className="text-muted-foreground">Editing profile for: {formData.name}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Photo Upload */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
                <CardDescription>Upload a new photo for the staff member.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={imagePreview} alt="Staff Avatar" className="object-cover" />
                  <AvatarFallback>{getInitials(formData.name)}</AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('photo-upload').click()}
                >
                  Change Photo
                </Button>
                <Input
                  id="photo-upload"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleImageChange}
                />
                <p className="text-xs text-muted-foreground mt-2">JPG, PNG up to 5MB.</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Staff Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal & Employment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={formData.name || ''} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={formData.email || ''} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" value={formData.phone || ''} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" name="department" value={formData.department || ''} onChange={handleInputChange} />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" name="designation" value={formData.designation || ''} onChange={handleInputChange} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Actions Footer */}
        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={() => navigate(`/staff/${id}`)}>Cancel</Button>
          <Button type="submit" disabled={submitting}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitting ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm text-right mt-2">{error}</p>}
      </form>

      {/* Success/Error Notification Modal */}
      <AlertDialog open={notification.open} onOpenChange={handleNotificationClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{notification.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {notification.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleNotificationClose}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UpdateStaffPage;