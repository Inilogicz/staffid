import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Allstaff = () => {
  const navigate = useNavigate();

  // Dummy data for the table
 const staffData = [
  {
    id: 1,
    name: "John Smith",
    contact: "+1 234-567-8901",
    department: "Engineering",
    designation: "Senior Developer",
    cardStatus: "Active"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    contact: "+1 234-567-8902",
    department: "Marketing",
    designation: "Marketing Manager",
    cardStatus: "Active"
  },
  {
    id: 3,
    name: "Michael Brown",
    contact: "+1 234-567-8903",
    department: "HR",
    designation: "HR Specialist",
    cardStatus: "Inactive"
  },
  {
    id: 4,
    name: "Emily Davis",
    contact: "+1 234-567-8904",
    department: "Finance",
    designation: "Financial Analyst",
    cardStatus: "Active"
  },
  {
    id: 5,
    name: "David Wilson",
    contact: "+1 234-567-8905",
    department: "Engineering",
    designation: "DevOps Engineer",
    cardStatus: "Pending"
  },
  {
    id: 6,
    name: "Lisa Anderson",
    contact: "+1 234-567-8906",
    department: "Design",
    designation: "UI/UX Designer",
    cardStatus: "Active"
  },
  {
    id: 7,
    name: "Robert Taylor",
    contact: "+1 234-567-8907",
    department: "Sales",
    designation: "Sales Representative",
    cardStatus: "Active"
  },
  {
    id: 8,
    name: "Jennifer Martinez",
    contact: "+1 234-567-8908",
    department: "Operations",
    designation: "Operations Manager",
    cardStatus: "Inactive"
  }
]; 
// State to manage dropdown visibility and selected staff
  const [actionMenu, setActionMenu] = useState({ visible: false, staffId: null });

  // Handler for action selection
  const handleAction = (action, staffId) => {
    setActionMenu({ visible: false, staffId: null });
    if (action === 'Print') {
      alert(`Printing ID for staff ID: ${staffId}`);
      // Add print logic here (e.g., generate ID card and print)
    } else if (action === 'Update') {
      navigate(`/update-staff/${staffId}`); // Navigate to update page
    }
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
            onClick={() => navigate('/addstaff')}
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
           <div className="flex-1  p-2  overflow-y-auto">
            <div className="grid grid-cols-1 gap-">
  <div className="bg-white border border-gray-200 w-331 h-25">
    <div className="flex items-center justify-between space-x- mb-">
      <h1 className="text-3xl font-bold text-gray-800 py-2 px-2">
        Welcome back, Admin
        <br />
        <span className="text-sm text-gray-600">Here's what's happening with your team today</span>
      </h1>
      <img
        src="/assets/bell-ring (2).png"
        alt="Notification"
        className="h-6 w-6 cursor-pointer rounded-full"
      />
    </div>
  </div>

  <div className="bg-white border border-gray-200 w-full h-25 ">
    <div className="flex items-center justify-between space-x-2 mb-4">
      <h1 className="text-3xl font-bold text-gray-800  py-2 px-2">
        Staff Management
        <br />
        <span className="text-sm text-gray-600">Manage your team members and their information</span>
      </h1>
      <button className='bg-blue-500 text-white rounded-lg hover:bg-blue-600 p-6 px-6 py-3'>
        Add staff
      </button>
    </div>
  </div>
</div>
<div className="py-6 bg-gray-50 w-full">
  <div className="relative w-full max-w-7xl mx-auto flex items-center justify-between">
    <div className="relative">
      <img
        src="/assets/search.png"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer"
      />
      <input
        type="text"
        placeholder="Search staff members...."
        className="w-96 h-10 px-10 py-2 pr-10 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
      />
    </div>
    <div className="px-4 p-2 ml-16"> {/* Increased margin-left for large gap */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 font-bold whitespace-nowrap">
          Sort By:
        </label>
        <div className="relative flex-1">
          <select
            name="selectedOption"
            className="w-full h-12 bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-lg appearance-none"
          >
            <option value="Option 1">Name</option>
            <option value="Option 2">Department</option>
            <option value="Option 3">Designation</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  {/* Staff Data Table */}
        <div className="mt-2">
     
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-">
                  <th className="py-6 px-4 border-b text-left text-gray-700 font-semibold">ID</th>
                  <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">Name</th>
                  <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">Contact</th>
                  <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">Department</th>
                  <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">Designation</th>
                  <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">Card Status</th>
                  <th className="py-2 px-4 border-b text-left text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffData.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="py-6 px-4 border-b">{staff.id}</td>
                    <td className="py-2 px-4 border-b">{staff.name}</td>
                    <td className="py-2 px-4 border-b">{staff.contact}</td>
                    <td className="py-2 px-4 border-b">{staff.department}</td>
                    <td className="py-2 px-4 border-b">{staff.designation}</td>
                    <td className="py-2 px-4 border-b ">{staff.cardStatus}</td>
                    <td className="py-2 px-4 border-b relative">
                      <button
                        onClick={() => setActionMenu({ visible: !actionMenu.visible, staffId: staff.id })}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        ⋮
                      </button>
                      {actionMenu.visible && actionMenu.staffId === staff.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                          <button
                            onClick={() => handleAction('Print', staff.id)}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Print
                          </button>
                          <button
                            onClick={() => handleAction('Update', staff.id)}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
</div>

  </div>
</div>
  


      
      
  );
};

export default Allstaff;