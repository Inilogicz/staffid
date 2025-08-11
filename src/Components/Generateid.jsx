import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Generateid = () => {
     const navigate = useNavigate();
// State to manage input values
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    department: '',
    designation: '',
    validUntil: '',
  });
  // Handler to update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      <div className="flex-1  p-2 bg-gray-50 overflow-y-auto">
        <div className="bg-white border border-gray-200 w-335  h-25">
          <div className="flex items-center justify-between space-x-  mb-8 px-4 py-2">
      <h1 className="text-2xl font-bold ">Welcome back, Admin <br/> <span className=" text-sm text-gray-500 text-muted-foreground ">Here's what's happening with your team today</span></h1>
      <img
        src="/assets/bell-ring (2).png"
        alt="Notification"
        className="h-6 w-6 cursor-pointer rounded-full"
      />
</div>
       
      {/* Header */}
      <div className="mb-6 p-2">
        <h1 className="text-2xl font-bold text-foreground">ID Card Generator</h1>
        <p className="text-muted-foreground text-gray-500">Create professional employee identification cards</p>
      </div>

     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       <div className='border bg-white border-gray-200 w-full shadow-lg rounded-lg h-120'>
        <h1 className='text-xl font-bold px-6 py-2'>Employee Information</h1>
      <div className="px-4 p-2">
  <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
    Full Name
  </label>
  <div className="relative ">
    <input
      type="text"
      name="fullName"
      value={formData.fullName}
      onChange={handleInputChange}
      placeholder="John Doe"
      className="w-full h-[36px] bg-gray-50 px-2 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg"
    />

       </div>
       </div>
      <div className="px-4 p-2">
  <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
    Employee ID 
  </label>
  <div className="relative ">
    <input
      type="text"
      name='employeeId'
      value={formData.employeeId}
      onChange={handleInputChange}
      placeholder="EMP001"
      className="w-full h-[36px] bg-gray-50 px-10 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg"
    />

       </div>
       </div>
      <div className="px-4 p-2">
  <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
    Department
  </label>
  <div className="relative ">
    <input
      type="text"
      name="department"
      value={formData.department}
      onChange={handleInputChange}
      placeholder="Graphics"
      className="w-full h-[36px] bg-gray-50 px-10 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg"
    />

       </div>
       </div>
      <div className=" px-4 p-2">
  <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
    Designation
  </label>
  <div className="relative ">
    <input
      type="text"
      name="designation"
      value={formData.designation}
      onChange={handleInputChange}
      placeholder="Head of Department"
      className="w-full h-[36px] bg-gray-50 px-10 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg"
    />

       </div>
       </div>
      <div className=" px-4 p-2">
  <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
    Valid Until
  </label>
  <div className="relative ">
    <input
      type="text"
      name='validUntil'
      value={formData.validUntil}
      onChange={handleInputChange}
      placeholder="01/01/2027"
      className="w-full h-[36px] bg-gray-50 px-10 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg"
    />

       </div>
       </div>
       <div className="border mt-16 bg-white border-gray-200 w-full shadow-lg rounded-lg h-40">
           <h1 className="text-xl px-6 py-2">Employee Photo</h1>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-xl h-25 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-50">
                  <img className="h-8 w-8 text-muted-foreground mb-2" src="/assets/camera.png" />
                  <p className="text-sm text-muted-foreground">Click to upload photo</p>
                  <input id="photo-upload" type="file" className="hidden" accept="/assets/camera.png" />
                </label>
                </div>
       </div>
       </div>
  

      <div className="flex flex-col items-center gap-6 p-4">
  <div className="w-full max-w-md mx-auto aspect-[1.6/1] bg-cyan-500 from-primary to-primary/80 rounded-xl shadow-xl overflow-hidden">
  <img src="/assets/church_logo-1.png" alt="Logo" className="h-7 w-8 mx-auto mt-2" />
    <div className="text-center">
      <h2 className="text-xl text-white  font-bold text-gray-700">Deeper Christian Life Ministry</h2>
      <p className="text-gray-500 text-white opacity-90">Employee Identification</p>

      <div className="flex items-start gap-4 p-6">
        <img
          alt="faceid"
          className="w-20 h-25 bg-white/20 rounded-lg flex items-center justify-center"
          src="/assets/Avatars.png"
        />
      </div>
      <div className="flex-1 text-left relative text-white  px-30">
        <p className="font-bold mt-[-120px]">{formData.fullName || 'John Doe'}</p>
        <p className="font-semibold">{formData.designation || 'Graphics'}</p>
        <p className="font-semibold">{formData.department || 'Engineering'}</p>
        <p className="font-semibold">{formData.employeeId || 'EMP 001'}</p>
      </div>
    </div>
    <div className="mt-12 px-6">
      <div className="flex justify-between text-xs opacity-90 text-white font-semibold">
        <span>Valid Until</span>
        <span>{formData.validUntil || '20/10/2030'}</span>
      </div>
    </div>
  </div>

  <div className="w-full max-w-md mx-auto aspect-[1.6/1] bg-gray-900 rounded-xl shadow-xl overflow-hidden">
    <div className="text-center">
        
      <img src="/assets/OIP.jpg" alt="Logo" className="h-20 w-28 mx-auto mt-2" />
        <p className="text-sm text-white">Scan for verification</p>
      
      <div className="flex-1 text-left text-white top-8 px-4 mt-6">
        <p className="text-sm">.This card remains a property of DCLM</p>
        <p className="text-sm">.Report lost card immediately</p>
        <p className="text-sm">.Valid for authorized personnel only</p>
        <p className="text-sm">.Must be visible at all times </p>
      </div>
    </div>
    <div className="mt-12 px-6">
      <div className="flex justify-between text-xs opacity-90 text-white font-semibold">
        <span>Emergency line </span>
        <span>+234 9067543291</span>
      </div>
    </div>
  </div>
</div>
      
          </div>
          </div>
          </div>
          </div>
                                   

  )
}

export default Generateid;
