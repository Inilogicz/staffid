import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { StaffDetailSkeleton } from './StaffDetailSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, CheckCircle, Loader2, Eye } from 'lucide-react';

// A small reusable component for displaying a piece of information
const InfoItem = ({ label, value, children }) => (
  <div>
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    {children ? children : <p className="text-base font-semibold">{value || 'N/A'}</p>}
  </div>
);

const StaffDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isIssuing, setIsIssuing] = useState(false);

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/staff/${id}`);
        setStaff(response.data);
      } catch (err) {
        setError('Failed to fetch staff details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaffDetails();
  }, [id]);

  // Function to handle the initial card issuance API call
  const handleIssueCard = async () => {
    setIsIssuing(true);
    try {
      await api.post(`/api/staff/${staff._id}/issue`);
      // On success, navigate to the Generate ID page with the staff's ID
      navigate(`/generate-id/${staff._id}`);
    } catch (err) {
      alert('Failed to issue card. Please try again.');
      console.error(err);
    } finally {
      setIsIssuing(false);
    }
  };

  if (loading) return <StaffDetailSkeleton />;
  if (error) return <div className="text-red-500 p-4 bg-red-50 rounded-md">{error}</div>;
  if (!staff) return <div>Staff member not found.</div>;

  return (
    <div className="space-y-6">
      {/* ======================= Header with Conditional Button ======================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link to="/staff" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Staff
          </Link>
          <h1 className="text-3xl font-bold">{staff.name}</h1>
          <p className="text-muted-foreground">{staff.designation}</p>
        </div>
        <div className="flex items-center gap-2">
          
          {/* --- CONDITIONAL LOGIC FOR THE ACTION BUTTON --- */}
          {staff.cardIssued ? (
            // IF card IS issued, show the "Preview ID" button
            <Button variant="outline" onClick={() => navigate(`/generate-id/${staff._id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              Preview ID
            </Button>
          ) : (
            // IF card is NOT issued, show the "Issue Card" button
            <Button 
              variant="default" // Primary action style
              onClick={handleIssueCard} 
              disabled={isIssuing}
            >
              {isIssuing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              {isIssuing ? 'Issuing...' : 'Issue Card'}
            </Button>
          )}

          {/* --- "Edit Profile" button remains the same --- */}
          <Button onClick={() => navigate(`/staff/update/${staff._id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* ======================= Main Grid with Staff Details ======================= */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (Details) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-x-4 gap-y-6">
              <InfoItem label="Email Address" value={staff.email} />
              <InfoItem label="Phone Number" value={staff.phone} />
              <InfoItem label="Gender" value={staff.sex} />
              <InfoItem label="Marital Status" value={staff.maritalStatus} />
              <InfoItem label="Date of Birth" value={new Date(staff.dateOfBirth).toLocaleDateString()} />
              <InfoItem label="Address" value={staff.address?.currentAddress} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-x-4 gap-y-6">
              <InfoItem label="Department" value={staff.department} />
              <InfoItem label="Designation" value={staff.designation} />
              <InfoItem label="Grade Level" value={staff.gradeLevel} />
              <InfoItem label="Date of Employment" value={new Date(staff.dateOfEmployment).toLocaleDateString()} />
              <InfoItem label="Card Status">
                <Badge variant={staff.cardIssued ? "default" : "destructive"}>
                  {staff.cardIssued ? "Issued" : "Not Issued"}
                </Badge>
              </InfoItem>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (QR/Barcode) */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Codes</CardTitle>
              <CardDescription>Scan to verify staff details.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 pt-6">
              {staff.qrCode && <img src={staff.qrCode} alt="QR Code" className="w-48 h-48 rounded-lg" />}
              {staff.barcode && <img src={staff.barcode} alt="Barcode" className="w-full h-auto" />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailPage;