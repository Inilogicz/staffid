import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Printer, ArrowLeft, Download, CheckSquare, Loader2 } from 'lucide-react';
import { getImageUrl } from '@/lib/utils'; 
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { toPng } from 'html-to-image';

// Skeleton Loader that matches the final layout
const CardSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <Skeleton className="w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl" />
    <Skeleton className="w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl hidden lg:block" />
  </div>
);

// --- Card Components Faithful to Your "White Card with Blue Accents" Design ---

const CardFront = React.forwardRef(({ staff }, ref) => (
  <div 
    ref={ref} 
    className="w-full h-full rounded-2xl shadow-xl bg-white text-slate-800 p-0 flex flex-col justify-between overflow-hidden relative border-2 border-blue-500"
    style={{backgroundImage: "url('/assets/card-bg.svg')"}} // Optional: a very subtle background pattern
  >
    {/* Header Section with your logo */}
    <div className="text-center pt-6 px-6">
      <img src="/assets/dclm.png" alt="Logo" width={250} height={250} className=" mx-auto" />
      <p className="text-xs text-slate-500 font-semibold tracking-widest mt-2">STAFF IDENTIFICATION CARD</p>
    </div>
    
    {/* Main Content */}
    <div className="flex-1 flex items-center gap-5 px-6 border-t-3 border-red-400">
      <div className="w-28 h-36 bg-slate-200 rounded-lg flex-shrink-0 shadow-md border-4 border-white">
        <img src={getImageUrl(staff?.passportPhotoUrl) || '/assets/hero.jpg'} alt="Staff" className="w-full h-full object-cover rounded-sm " />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 leading-tight">{staff?.name || 'Jane Doe'}</p>
        <p className="font-semibold text-blue-700 mt-1">{staff?.designation || 'Senior Developer'}</p>
        <p className='text-sm font-semibold'> DEPARTMENT: {staff?.department || 'Engineering'}</p>
          <p className="text-sm font-semibold">STAFF ID: {staff?._id.slice(-6).toUpperCase() || 'EMP001'} </p>
      </div>
    </div>

    {/* Footer Section with Brand Color */}
    <div className="bg-blue-500 text-white p-3 text-center">
    
    </div>
  </div>
));
CardFront.displayName = 'CardFront';

const CardBack = React.forwardRef(({ staff }, ref) => (
  <div 
    ref={ref} 
    className="w-full h-full rounded-2xl shadow-xl bg-white p-6 flex flex-col justify-between border-2 border-blue-500"
  >
    <div className="text-center">
      <h3 className="text-xs font-bold text-slate-500">PROPERTY OF DEEPER CHRISTIAN LIFE MINISTRY</h3>
      <div className="w-24 h-0.5 bg-blue-600 mx-auto mt-1"></div>
    </div>
    
    <div className="flex items-center gap-6 w-full">
        <div className="text-center flex-1">
            {staff?.qrCode && <div className="p-1 bg-white rounded-md border-2 border-slate-200 inline-block"><img src={staff.qrCode} alt="QR Code" className="w-28 h-28" /></div>}
            <p className="text-xs text-slate-500 mt-1">Scan for Verification</p>
        </div>
    </div>

    <div className="w-full">
      {/* {staff?.barcode && <img src={staff.barcode} alt="Barcode" className="w-full h-16 object-contain" />} */}
      <p className="text-center text-xs font-semibold text-slate-500 mt-2 px-4">
        If found, please return to the nearest Police Station or contact 2-10 Ayodele Okeowo St, Gbagada, Lagos.
      </p>
    </div>
  </div>
));
CardBack.displayName = 'CardBack';


const GenerateIdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromQueue = new URLSearchParams(location.search).get('from_queue') === 'true';

  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMarking, setIsMarking] = useState(false);

  const frontRef = useRef(null);
  const backRef = useRef(null);

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
  
  const handleDownload = (elementRef, side) => {
    if (elementRef.current === null) return;
    toPng(elementRef.current, { cacheBust: true, pixelRatio: 2.5 }) // Higher pixelRatio for better quality
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${staff.name.replace(/\s+/g, '_')}_ID_${side}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error("Could not download image", err));
  };
  
  const handleMarkAsPrinted = async () => {
    setIsMarking(true);
    try {
      await api.post(`/api/printing/printed/${id}`);
      alert('Card marked as printed successfully!');
      navigate('/printing/queue');
    } catch (err) {
      alert('Failed to mark card as printed.');
      console.error(err);
    } finally {
      setIsMarking(false);
    }
  };

  if (loading) return <div className="p-4 md:p-8"><CardSkeleton /></div>;
  if (error) return <div className="p-4 md:p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">ID Card Preview</h1>
          <p className="text-muted-foreground">Review the ID card below before printing or downloading.</p>
        </div>
        <div className="flex items-center gap-2">
            {fromQueue ? (
                <Button onClick={handleMarkAsPrinted} disabled={isMarking} className="bg-green-600 hover:bg-green-700">
                    {isMarking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckSquare className="mr-2 h-4 w-4" />}
                    {isMarking ? 'Marking...' : 'Mark as Printed'}
                </Button>
            ) : (
                <Button variant="outline" onClick={() => navigate(`/staff/${id}`)}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Details</Button>
            )}
            <AlertDialog>
                <AlertDialogTrigger asChild><Button><Printer className="mr-2 h-4 w-4" /> Print</Button></AlertDialogTrigger>
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
      
      {/* ======================= ID Card Preview Section (Always Visible) ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative w-full max-w-md mx-auto aspect-[1.586/1]">
          <CardFront staff={staff} ref={frontRef} />
        </div>
        <div className="relative w-full max-w-md mx-auto aspect-[1.586/1]">
          <CardBack staff={staff} ref={backRef} />
        </div>
      </div>
      
      {/* <div className="flex justify-center gap-4 mt-4">
          <Button variant="secondary" onClick={() => handleDownload(frontRef, 'Front')}>
              <Download className="mr-2 h-4 w-4" /> Download Front
          </Button>
          <Button variant="secondary" onClick={() => handleDownload(backRef, 'Back')}>
              <Download className="mr-2 h-4 w-4" /> Download Back
          </Button>
      </div> */}
    </div>
  );
};

export default GenerateIdPage;