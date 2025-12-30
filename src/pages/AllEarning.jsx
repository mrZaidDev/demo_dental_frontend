import React from "react";
import patients from "../assets/Patients";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const AllEarning = () => {
  const [Overview, setOverview] = useState({
    TotalRevenue: 0,
    TotalPatients: 0,
    TotalAdvance: 0,
    TotalRemaining: 0
  });

  console.log(Overview)
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `https://demo-dental-backend.onrender.com/api/dental/patients`,
          { withCredentials: true }
        );
        const TotalRevenue = response.data.patients.reduce((sum,patient)=>sum + patient.total, 0)
        const TotalPatients = response.data.patients.length
        const TotalAdvance = response.data.patients.reduce((sum,patient)=>sum + patient.advance, 0)
        const TotalRemaining = TotalRevenue - TotalAdvance
        setOverview({
          TotalRevenue,
          TotalPatients,
          TotalAdvance,
          TotalRemaining,
        });
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            All Earnings
          </h1>
          <p className="text-gray-600">Financial overview of your clinic</p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Patients Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium mb-1">
              Total Patients
            </p>
            <p className="text-4xl font-bold text-gray-800">{Overview.TotalPatients}</p>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-linear-to-br from-gray-500 to-black rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm  font-medium mb-1">Total Revenue</p>
            <p className="text-4xl font-bold">Rs. {Overview.TotalRevenue}</p>
          </div>

          {/* Advance Received Card */}
          <div className="bg-linear-to-br from-gray-500 to-black rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm  font-medium mb-1">Advance Received</p>
            <p className="text-4xl font-bold">Rs. {Overview.TotalAdvance}</p>
          </div>

          {/* Total Remaining Card */}
          <div className="bg-linear-to-br from-gray-500 to-black rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm  font-medium mb-1">Total Remaining</p>
            <p className="text-4xl font-bold">Rs. {Overview.TotalRemaining}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEarning;
