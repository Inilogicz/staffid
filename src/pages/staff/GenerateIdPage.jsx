import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Printer, ArrowLeft, Download, CheckSquare, Loader2 } from 'lucide-react';
import { getImageUrl } from '@/lib/utils'; 
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
    className="w-full h-full rounded-xl bg-white text-slate-800 flex flex-col overflow-hidden relative border border-blue-500"
    style={{backgroundImage: "url('/assets/card-bg.svg')", backgroundSize: 'cover'}}
  >
    {/* Header Section */}
    <div className="text-center pt-3 px-3">
      <img src="/assets/dclm.png" alt="Logo" className="h-8 mx-auto object-contain" />
      <p className="text-[0.6rem] text-slate-500 font-bold tracking-widest mt-1 uppercase">Staff Identification Card</p>
    </div>
    
    {/* Main Content */}
    <div className="flex-1 flex items-center gap-3 px-4 mt-1">
      <div className="w-20 h-24 bg-slate-200 rounded-md flex-shrink-0 shadow-sm border-2 border-white overflow-hidden">
        <img src={getImageUrl(staff?.passportPhotoUrl) || '/assets/hero.jpg'} alt="Staff" className="w-full h-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-bold text-slate-900 leading-tight truncate">{staff?.name || 'Jane Doe'}</p>
        <p className="text-xs font-bold text-blue-700 truncate mt-0.5">{staff?.designation || 'Senior Developer'}</p>
        <div className="mt-1.5 space-y-0.5">
            <p className='text-[0.6rem] font-semibold text-slate-600 truncate uppercase'>Dept: {staff?.department || 'Engineering'}</p>
            <p className="text-[0.6rem] font-semibold text-slate-600">ID: {staff?._id ? staff._id.slice(-6).toUpperCase() : 'EMP001'} </p>
        </div>
      </div>
    </div>

    {/* Footer Section */}
    <div className="bg-blue-600 h-3 w-full mt-auto"></div>
  </div>
));
CardFront.displayName = 'CardFront';

const CardBack = React.forwardRef(({ staff }, ref) => (
  <div 
    ref={ref} 
    className="w-full h-full rounded-xl bg-white p-3 flex flex-col justify-between border border-blue-500"
  >
    <div className="text-center pt-1">
      <h3 className="text-[0.6rem] font-bold text-slate-600 uppercase tracking-wide">Property of Deeper Christian Life Ministry</h3>
      <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-1"></div>
    </div>
    
    <div className="flex-1 flex flex-col items-center justify-center py-1">
        {staff?.qrCode && (
            <div className="p-1 bg-white rounded border border-slate-200">
                <img src={staff.qrCode} alt="QR Code" className="w-20 h-20" />
            </div>
        )}
        <p className="text-[0.55rem] text-slate-400 mt-1">Scan to Verify</p>
    </div>

    <div className="text-center px-2 pb-1">
      <p className="text-[0.5rem] leading-tight text-slate-500 font-medium">
        If found, please return to the nearest Police Station or contact DCLM Headquarters, Gbagada, Lagos.
      </p>
    </div>
  </div>
));
CardBack.displayName = 'CardBack';

const printStyles = `
  @media print {
    @page {
      size: 85.60mm 53.98mm;
      margin: 0;
    }
    body {
      visibility: hidden;
      background-color: white;
    }
    #print-section {
      visibility: visible;
      display: block !important;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .print-card {
      visibility: visible;
      position: relative;
      width: 85.60mm;
      height: 53.98mm;
      page-break-after: always;
      break-after: page;
      overflow: hidden;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .print-card:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }
    .print-card > div {
        width: 100% !important;
        height: 100% !important;
        box-shadow: none !important;
        border-radius: 0 !important;
    }
  }
`;

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

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="p-4 md:p-8"><CardSkeleton /></div>;
  if (error) return <div className="p-4 md:p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <style>{printStyles}</style>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
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
            <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
        </div>
      </div>
      
      {/* ======================= ID Card Preview Section (Always Visible) ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:hidden">
        <div className="relative w-full max-w-md mx-auto aspect-[1.586/1]">
          <CardFront staff={staff} ref={frontRef} />
        </div>
        <div className="relative w-full max-w-md mx-auto aspect-[1.586/1]">
          <CardBack staff={staff} ref={backRef} />
        </div>
      </div>
      
      {/* ======================= Print Section (Hidden on Screen) ======================= */}
      <div id="print-section" className="hidden">
        <div className="print-card">
            <CardFront staff={staff} />
        </div>
        <div className="print-card">
            <CardBack staff={staff} />
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
