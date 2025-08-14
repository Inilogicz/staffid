import React from 'react'
import {Link,  useNavigate } from 'react-router-dom';

const Addstaff = () => {
    const navigate = useNavigate();
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
       {/*the second side*/}
      <div className="flex-1 p-7 overflow-y-auto">
        <div>
          <img
            src="/assets/bell-ring (2).png"
            alt=""
            className="absolute right-30 h-6 w-6 cursor-pointer bg-gray-100 rounded-full"
          />
        </div>
        <div className='relative w-2xl'>
            <h1 className='text-2xl font-semibold'>DCLM HQ ADMIN STAFF ID SYSTEM</h1>
        </div>
        <br />
        <div>
          <p className="bg-gray-200 cursor-pointer border border-gray-200 p-4 w-96 mt-4 rounded-lg text-gray-500 text-xl">
            <Link to="/dashboard">Back</Link> |{' '}
            <span className="text-blue-700 space-x-2">Accounts</span> / Create
            Accounts
          </p>
        </div><br />
<div className="w-full min-h-screen bg-white border border-gray-200  rounded-lg p-4">
  <div className="grid grid-cols-2 gap-12 h-full mt-6 items-start gap-12">
    {/* Left Side - Profile and First 3 Inputs with Selects */}
    <div className="flex flex-col space-y-6">
      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <img className="w-30" src="/assets/hero.jpg" alt="Profile" />
        <div>
          <h1 className="font-medium text-base leading-normal">Profile picture</h1>
          <br />
          <p className="text-sm antialiased">
            This image will be displayed on your profile
          </p>
          <br />
          <img src="/assets/secondary.png" alt="Special" className="w-40 " />
        </div>
      </div>

      {/* First 3 Inputs */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
          First Name
        </label>
        <input
          type="text"
          placeholder="Enter first name"
          className="w-[600px] h-[56px] rounded-[8px] rotate-0 opacity-100 border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
          Second Name
        </label>
        <input
          type="text"
          placeholder="Enter second name"
          className="w-full h-[56px] rounded-[8px] rotate-0 opacity-100 border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
          Second Name
        </label>
        <input
          type="text"
          placeholder="Enter second name"
          className="w-full h-[56px] rounded-[8px] rotate-0 opacity-100 border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
     
      
      
    </div>

    {/* Right Side - Remaining Inputs and Buttons */}
    <div className="flex flex-col space-y-6 mt-37.5">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter email address"
          className="w-full h-[56px] rounded-[8px] rotate-0 opacity-100 border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="Enter phone number"
          className="w-full h-[56px] rounded-[8px] rotate-0 opacity-100 border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
          Address
        </label>
        <input
          type="text"
          placeholder="Enter address"
          className="w-full h-[56px] rounded-[8px] rotate-0 opacity-100 border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
     <div className="relative w-full">
  <div className="flex space-x-4 mt- absolute right-0">
    <button className="w-30 h-12 rounded-lg border border-gray-400"onClick={() => navigate('/dashboard')}>Cancel</button>
    <button className="w-40 h-12 text-white bg-gray-900 border border-gray-400 rounded-lg" onClick={() => navigate('/')}>
      Create Account
    </button>
  </div>
</div>
    </div>
  </div>
</div>          </div>
        </div>
      
    
  )
}

export default Addstaff;
