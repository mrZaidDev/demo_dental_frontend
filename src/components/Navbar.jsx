import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="">
      {/* Buttons */}
      <div className="flex flex-row items-center justify-center gap-2 py-4">
      <Link to="/all-patients">
        <button className=" py-3 px-4 bg-linear-to-r from-gray-400 to-black text-white font-semibold rounded-lg  focus:outline-none focus:ring-4 focus:ring-purple-300 ">
          All Patients
        </button>
        </Link>
        <Link to="/create-patient">
        <button className=" py-3 px-4 bg-linear-to-r from-gray-400 to-black text-white font-semibold rounded-lg  focus:outline-none focus:ring-4 focus:ring-purple-300 ">
          Create Patient
        </button>
        </Link>
        <Link to="/all-earning">
        <button className="py-3 px-4 bg-linear-to-r from-gray-400 to-black text-white font-semibold rounded-lg  focus:outline-none focus:ring-4 focus:ring-purple-300 ">
          All Earning
        </button>
        </Link>
      </div>
      {/* Buttons */}
    </div>
  );
};

export default Navbar;
