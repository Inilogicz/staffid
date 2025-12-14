import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import axios from 'axios'; // Make sure axios is installed
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getInitials } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea'; // We need Textarea for multi-line inputs

const AddStaffPage = () => {
  const navigate = useNavigate();
  
  // State now matches the full schema
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    sex: '',
    maritalStatus: '',
    dateOfBirth: '',
    dateOfEmployment: '',
    gradeLevel: '',
    staffCategory: '',
    workLocation: '',
    numberOfChildren: 0,
    childrenInfo: '',
    address: {
      currentAddress: '',
      city: '',
      stateOfOrigin: '',
      country: 'Nigeria',
    },
    nextOfKin: {
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
    },
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ open: false, title: '', message: '' });

  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [parentKey]: { ...prev[parentKey], [name]: value } }));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => { /* ... remains the same */ };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!imageFile) {
      setError('A profile photo is required.');
      setSubmitting(false);
      return;
    }

    // 1. Upload image to Cloudinary (Client-side)
    let passportPhotoUrl = '';
    const imageUploadData = new FormData();
    imageUploadData.append('file', imageFile);
    imageUploadData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        imageUploadData
      );
      passportPhotoUrl = cloudinaryRes.data.secure_url;
    } catch (err) {
      setError('Failed to upload image. Please check your Cloudinary settings and try again.');
      setSubmitting(false);
      return;
    }

    // 2. Submit the complete staff data to your backend
    const finalStaffData = { ...formData, passportPhotoUrl };
    
    try {
      const response = await api.post('/api/staff', finalStaffData);
      setNotification({
        open: true,
        title: 'Creation Successful',
        message: `${response.data.staff.name} has been successfully added to the system.`,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create staff member.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNotificationClose = () => {
    setNotification({ open: false, title: '', message: '' });
    navigate('/staff');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Staff Member</h1>
        <p className="text-muted-foreground">Fill out the form below to create a new staff profile.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Photo & Core Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader><CardTitle>Profile Photo</CardTitle></CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4"><AvatarImage src={imagePreview} /><AvatarFallback>{getInitials(formData.name)}</AvatarFallback></Avatar>
                <Button type="button" variant="outline" onClick={() => document.getElementById('photo-upload').click()}>Upload Photo</Button>
                <Input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required />
              </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Core Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" name="name" value={formData.name} onChange={handleInputChange} required /></div>
                    <div className="space-y-2"><Label htmlFor="email">Email Address</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required /></div>
                    <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required /></div>
                </CardContent>
            </Card>
          </div>

          {/* Right Column: All Other Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Employment Details</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label htmlFor="department">Department</Label><Input id="department" name="department" value={formData.department} onChange={handleInputChange} required /></div>
                <div className="space-y-2"><Label htmlFor="designation">Designation</Label><Input id="designation" name="designation" value={formData.designation} onChange={handleInputChange} required /></div>
                <div className="space-y-2"><Label htmlFor="staffCategory">Staff Category</Label><Input id="staffCategory" name="staffCategory" value={formData.staffCategory} onChange={handleInputChange} /></div>
                <div className="space-y-2"><Label htmlFor="workLocation">Work Location</Label><Input id="workLocation" name="workLocation" value={formData.workLocation} onChange={handleInputChange} /></div>
                <div className="space-y-2"><Label htmlFor="gradeLevel">Grade Level</Label><Input id="gradeLevel" name="gradeLevel" value={formData.gradeLevel} onChange={handleInputChange} /></div>
                <div className="space-y-2"><Label htmlFor="dateOfEmployment">Date of Employment</Label><Input id="dateOfEmployment" name="dateOfEmployment" type="date" value={formData.dateOfEmployment} onChange={handleInputChange} /></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Personal & Address Details</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label htmlFor="sex">Gender</Label><Input id="sex" name="sex" value={formData.sex} onChange={handleInputChange} /></div>
                <div className="space-y-2"><Label htmlFor="maritalStatus">Marital Status</Label><Input id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} /></div>
                <div className="space-y-2"><Label htmlFor="dateOfBirth">Date of Birth</Label><Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} /></div>
                <div className="space-y-2 md:col-span-2"><Label htmlFor="currentAddress">Residential Address</Label><Textarea id="currentAddress" name="currentAddress" value={formData.address.currentAddress} onChange={(e) => handleNestedChange(e, 'address')} /></div>
                <div className="space-y-2"><Label htmlFor="city">City</Label><Input id="city" name="city" value={formData.address.city} onChange={(e) => handleNestedChange(e, 'address')} /></div>
                <div className="space-y-2"><Label htmlFor="stateOfOrigin">State of Origin</Label><Input id="stateOfOrigin" name="stateOfOrigin" value={formData.address.stateOfOrigin} onChange={(e) => handleNestedChange(e, 'address')} /></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Next of Kin Information</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label htmlFor="nokName">Full Name</Label><Input id="nokName" name="name" value={formData.nextOfKin.name} onChange={(e) => handleNestedChange(e, 'nextOfKin')} /></div>
                <div className="space-y-2"><Label htmlFor="nokRelationship">Relationship</Label><Input id="nokRelationship" name="relationship" value={formData.nextOfKin.relationship} onChange={(e) => handleNestedChange(e, 'nextOfKin')} /></div>
                <div className="space-y-2"><Label htmlFor="nokPhone">Phone Number</Label><Input id="nokPhone" name="phone" value={formData.nextOfKin.phone} onChange={(e) => handleNestedChange(e, 'nextOfKin')} /></div>
                <div className="space-y-2"><Label htmlFor="nokEmail">Email</Label><Input id="nokEmail" name="email" value={formData.nextOfKin.email} onChange={(e) => handleNestedChange(e, 'nextOfKin')} /></div>
                <div className="space-y-2 md:col-span-2"><Label htmlFor="nokAddress">Address</Label><Textarea id="nokAddress" name="address" value={formData.nextOfKin.address} onChange={(e) => handleNestedChange(e, 'nextOfKin')} /></div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/staff')}>Cancel</Button>
          <Button type="submit" disabled={submitting}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitting ? 'Creating Staff...' : 'Create Staff Member'}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm text-right mt-2">{error}</p>}
      </form>

      <AlertDialog open={notification.open} onOpenChange={handleNotificationClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{notification.title}</AlertDialogTitle>
            <AlertDialogDescription>{notification.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter><AlertDialogAction onClick={handleNotificationClose}>OK</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddStaffPage;