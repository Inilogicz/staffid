// src/pages/staff/GenerateIdPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Printer, ArrowLeft } from 'lucide-react';
import { convertGoogleDriveUrl } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// A skeleton loader for the ID card preview
const CardSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="w-full max-w-md mx-auto aspect-[1.6/1] rounded-xl" />
    <Skeleton className="w-full max-w-md mx-auto aspect-[1.6/1] rounded-xl" />
  </div>
);

const GenerateIdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaffForCard = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await api.get(`/api/staff/${id}`);
        setStaff(response.data);
      } catch (err) {
        setError('Failed to load staff data for ID card preview.');
      } finally {
        setLoading(false);
      }
    };
    fetchStaffForCard();
  }, [id]);

  if (loading) return <div className="p-8"><CardSkeleton /></div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ID Card Preview</h1>
          <p className="text-muted-foreground">Review the generated ID card below before printing.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/staff/${id}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Details
          </Button>
          
          {/* Alert Dialog Trigger */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>
                <Printer className="mr-2 h-4 w-4" />
                Send to Printer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Printer Functionality</AlertDialogTitle>
                <AlertDialogDescription>
                  Direct printing is currently under construction. This feature will be available once printer SDKs are integrated.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* ID Card Preview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Front of Card */}
        <div className="w-full max-w-md mx-auto aspect-[1.586/1] bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-2xl overflow-hidden p-6 flex flex-col">
          <div className="text-center mb-4">
            <img src="/assets/church_logo-1.png" alt="Logo" className="h-10 w-auto mx-auto" />
            <h2 className="text-lg font-bold text-blue-900 mt-2">Deeper Christian Life Ministry</h2>
            <p className="text-xs text-gray-500">STAFF IDENTIFICATION</p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-28 h-36 bg-gray-200 rounded-md flex-shrink-0">
              {/* In a real app, you'd show the staff.imageUrl here */}
              <img src={convertGoogleDriveUrl(staff?.passportPhotoUrl)}  alt="Staff" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="text-blue-900">
              <p className="text-2xl font-bold">{staff?.name || 'Jane Doe'}</p>
              <p className="font-semibold text-gray-600">{staff?.designation || 'Senior Developer'}</p>
              <p className="text-sm text-gray-500 mt-2">Dept: {staff?.department || 'Engineering'}</p>
              <p className="text-sm text-gray-500">Staff ID: {staff?._id.slice(-6).toUpperCase() || 'EMP001'}</p>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="w-full max-w-md mx-auto aspect-[1.586/1] bg-white rounded-xl shadow-2xl overflow-hidden p-6 flex flex-col items-center justify-between">
          <div className="text-center">
            <p className="text-xs text-gray-500">Scan for verification</p>
            {staff?.qrCode && <img src={staff.qrCode} alt="QR Code" className="w-32 h-32 mx-auto mt-2 rounded-lg" />}
          </div>
          <div className="text-center w-full">
            <p className="text-xs text-gray-400">If found, please return to DCLM HQ</p>
            <p className="text-xs font-semibold">Emergency: +234 123 456 7890</p>
          </div>
          {staff?.barcode && <img src={staff.barcode} alt="Barcode" className="w-full h-16 object-contain" />}
        </div>
      </div>
    </div>
  );
};

export default GenerateIdPage;