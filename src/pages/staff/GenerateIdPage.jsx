import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Printer, ArrowLeft, Download, CheckSquare, Loader2 } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';
import { toPng } from 'html-to-image';

// --- Reused Components ---

// Skeleton Loader that matches the final layout
const CardSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <Skeleton className="w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl" />
    <Skeleton className="w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl hidden lg:block" />
  </div>
);


const ProfessionalCardFront = React.forwardRef(({ staff }, ref) => {
  const photoUrl = getImageUrl(staff?.passportPhotoUrl) || '/assets/hero.jpg';
    
  return (
    <div
      ref={ref}
      className="w-full h-full rounded-xl bg-white flex flex-col overflow-hidden relative shadow-xl border-2 border-blue-600"
      style={{
        background: 'linear-gradient(135deg, #ffffff 50%, #eff6ff 100%)',
      }}
    >
      {/* Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <img 
            src="/assets/dclm_logo.png" 
            alt="" 
            className="w-48 opacity-[0.13] ml-34" 
        />
      </div>

      {/* Top Banner (Deep Blue) */}
      <div className="w-full h-1/6  flex items-center justify-between px-4 py-1 relative z-10">
        <img src="/assets/dclm.png" alt="Logo" className="h-11.5 w-auto object-contain  pt-1 " />
        <p className="text-[0.65rem] font-medium tracking-widest uppercase">STAFF ID CARD</p>
      </div>
      
      <div className="flex flex-row h-5/6 p-4 relative z-10">
        {/* Left Section: Photo and Title */}
        <div className="w-2/5 flex flex-col items-center pt-2">
            <div className="w-full aspect-[4/5] bg-slate-100 rounded-lg shadow-lg border-2 border-red-500 overflow-hidden">
                <img 
                    src={photoUrl} 
                    alt="Staff" 
                    className="w-full h-full object-fit" 
                />
            </div>
            {/* Red accent separator */}
            <div className="w-3/4 h-0.5 bg-red-500 my-2"></div>
            <p className="text-xs font-bold text-blue-800 uppercase text-center leading-tight">
                {staff?.name || 'Jane Doe'}
            </p>
        </div>

        {/* Right Section: Details */}
        <div className="w-3/5 pl-4 flex flex-col justify-center">
            
            {/* Primary Detail: Designation */}
            
            {/* Secondary Details (2-column layout) */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-left">
                <div>
                    <p className="text-[0.7rem] font-medium text-slate-800 uppercase">Department</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{staff?.department || 'Engineering'}</p>
                </div>
                <div>
                    <p className="text-[0.7rem] font-medium text-slate-800 uppercase">Staff ID</p>
                    <p className="text-sm font-bold text-red-500 truncate">{staff?._id ? staff._id.slice(-6).toUpperCase() : 'EMP001'}</p>
                </div>
              
            
            
        </div>
         <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-left mt-3">
                <div>
                    <p className="text-[0.7rem] font-medium text-slate-800 uppercase">Staff Category</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{staff?.staffCategory || 'Engineering'}</p>
                </div>
                <div>
                    <p className="text-[0.7rem] font-medium text-slate-800 uppercase">Sex</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{staff?.sex}</p>
                </div>
              </div>
               <div className=" border-l-4 border-red-500 pl-2 mt-2">
                <p className="text-[0.65rem] font-semibold text-slate-500 uppercase">Designation</p>
                <h3 className="text-sm font-extrabold text-blue-700 leading-snug truncate">{staff?.designation || 'Senior Developer'}</h3>
        </div>
            </div>
          
      </div>
       
      {/* Bottom Footer Accent */}
      <div className="w-full h-1 bg-blue-500 relative z-10"></div>
    </div>
  );
});
ProfessionalCardFront.displayName = 'ProfessionalCardFront';

const ProfessionalCardBack = React.forwardRef(({ staff }, ref) => (
  <div
    ref={ref}
    className="w-full h-full rounded-xl bg-white p-4 flex flex-col justify-between border-2 border-blue-600"
    style={{
        background: 'linear-gradient(135deg, #ffffff 50%, #eff6ff 100%)',
    }}
  >
    <div className="text-center pt-2">
      <h3 className="text-sm font-extrabold text-blue-800 uppercase tracking-widest">D.C.L.M. HEADQUARTERS</h3>
      <div className="w-1/4 h-0.5 bg-red-500 mx-auto mt-1 mb-3"></div>
      <p className="text-[0.7rem] font-medium text-slate-500">2-10, Ayodele Okeowo Street Gbagada, Lagos</p>
    </div>
    
    <div className="flex-1 flex flex-col items-center justify-center py-2">
        {staff?.qrCode ? (
            <div className="p-1 bg-white rounded border border-slate-300 shadow-md">
                <img src={staff.qrCode} alt="QR Code" className="w-28 h-28" />
            </div>
        ) : (
             <div className="w-28 h-28 bg-slate-200 flex items-center justify-center rounded border border-slate-300">
                <p className="text-xs text-slate-500">QR Code</p>
             </div>
        )}
        <p className="text-xs text-blue-600 mt-2 font-bold tracking-widest">VERIFY AUTHENTICITY</p>
    </div>

    <div className="text-center px-2 pb-1">
      {/* Clean, thick blue stripe */}
      <div className="w-full h-5 bg-blue-700 rounded-sm mb-1"></div> 
      <p className="text-[0.6rem] leading-tight text-slate-500 font-medium">
        This card is the property of DCLM HQ. If found, please return immediately.
      </p>
      {/* <p className="text-[0.65rem] text-red-600 mt-1 font-extrabold">SECURITY HOTLINE: [Your Phone Number]</p> */}
    </div>
  </div>
));
ProfessionalCardBack.displayName = 'ProfessionalCardBack';

// --- Main Component (Now using ProfessionalCard components) ---

const printStyles = `
  @media print {
    @page {
      /* Standard ID card size: 85.60mm x 53.98mm */
      size: 85.60mm 53.98mm;
      margin: 0;
    }
    body {
      visibility: hidden;
      background-color: white;
      margin: 0;
      padding: 0;
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
      transform: rotate(180deg);
    }
    .print-card > div {
        /* Scale content to fit the print dimensions (Standard 0.647 scale for 500px base) */
        width: 500px !important; 
        height: 315.25px !important; 
        transform: scale(0.647) !important;
        transform-origin: top left !important;
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
    toPng(elementRef.current, { cacheBust: true, pixelRatio: 3 }) // High pixelRatio for quality download
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
          <h1 className="text-3xl font-bold">ID Card Preview </h1>
          {/* <p className="text-muted-foreground">This refined design focuses on clarity, contrast, and professional aesthetics.</p> */}
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
          {/* Using the ProfessionalCardFront */}
          <ProfessionalCardFront staff={staff} ref={frontRef} />
        </div>
        <div className="relative w-full max-w-md mx-auto aspect-[1.586/1]">
          {/* Using the ProfessionalCardBack */}
          <ProfessionalCardBack staff={staff} ref={backRef} />
        </div>
      </div>
      
      {/* ======================= Print Section (Hidden on Screen) ======================= */}
      <div id="print-section" className="hidden">
        <div className="print-card">
            <ProfessionalCardFront staff={staff} />
        </div>
        <div className="print-card">
            <ProfessionalCardBack staff={staff} />
        </div>
      </div>
      
      {/* <div className="flex justify-center gap-4 mt-4 print:hidden">
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