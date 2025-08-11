import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className=" ">
      <div className=" w-full  flex justify-center items-center p-12">
  <div className="border border-gray-300 rounded-lg p-4 max-w-md w-120 mx-120.5 shadow-xl/30 bg-white">
    <form className="space-y-8">
      <div>
        <img src="/assets/church_logo-1.png" alt="church" className="w-12 mx-45 " />
        <h1 className="text-center font-Inter font-semibold text-xl leading-[38px] tracking-normal">DCLM HQ</h1>
        <p className="text-center">Staff IDcard management system</p>
      </div>
          <div className="relative">
  <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
    Email
  </label>
  <div className="relative">
    <input
      type="Enter"
    placeholder="Enter email address"
      className="w-full h-[56px] px-10 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg"
    />
    <img
      src="/assets/envelope-open.png" // Replace with your icon path or placeholder
      alt="Show password"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer "
    />
  </div>
</div>
          <div className="relative">
  <label className="block mb-2 text-sm font-medium text-gray-700 font-bold">
    Password
  </label>
  <div className="relative">
    <input
      type="password"
      placeholder="Enter Password"
      className="w-full h-[56px] px-10 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg"
    />
    <img
      src="/assets/lock-keyhole-open.png" // Replace with your icon path or placeholder
      alt="Show password"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer "
    />
  </div>
</div>
        
      <button
        type="submit"
        className="w-full bg-blue-900 text-white p-2 rounded-md"  onClick={() => navigate('/dashboard')}
      >
        Sign-In
      </button>
    </form>
  </div>
</div>
    </div>
  )
}

export default Signup;
