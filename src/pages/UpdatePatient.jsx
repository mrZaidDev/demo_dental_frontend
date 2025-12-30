import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdatePatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState({
    Name: "",
    PhoneNumber: "",
    details: "",
    total: "",
    advance: "",
  });

  useEffect(() => {
    const gettingSinglePatient = async () => {
      try {
        const response = await axios.get(
          `https://demo-dental-backend.onrender.com/api/dental/patient/${id}`,
          { withCredentials: true }
        );
        setPatientData({
          Name: response.data.patient.Name,
          PhoneNumber: response.data.patient.PhoneNumber,
          details: response.data.patient.details,
          total: response.data.patient.total,
          advance: response.data.patient.advance,
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    gettingSinglePatient();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...patientData,
        total: Number(patientData.total),
        advance: Number(patientData.advance),
      };
      const res = await axios.put(
        `https://demo-dental-backend.onrender.com/api/dental/update-patient/${id}`,
        data,
        { withCredentials: true }
      );
      toast.success(res.data.message,{duration:700});
      navigate('/all-patients')
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Update the Patient Info
          </h1>
          <p className="text-gray-600">update the patient info </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Patient Name <span className="text-red-500">*</span>
              </label>
              <input
                value={patientData.Name}
                onChange={(e) =>
                  setPatientData({ ...patientData, Name: e.target.value })
                }
                type="text"
                placeholder="Enter patient name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                value={patientData.PhoneNumber}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    PhoneNumber: e.target.value,
                  })
                }
                type="tel"
                placeholder="+92 300 1234567"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Shade */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Details
              </label>
              <input
                value={patientData.details}
                onChange={(e) =>
                  setPatientData({ ...patientData, details: e.target.value })
                }
                type="text"
                placeholder="provide the details"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            {/* Total Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Amount (Rs.) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  Rs.
                </span>
                <input
                  value={patientData.total}
                  onChange={(e) =>
                    setPatientData({ ...patientData, total: e.target.value })
                  }
                  type="number"
                  placeholder="25000"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Advance Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Advance Amount (Rs.)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  Rs.
                </span>
                <input
                  value={patientData.advance}
                  onChange={(e) =>
                    setPatientData({ ...patientData, advance: e.target.value })
                  }
                  type="number"
                  placeholder="10000"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-linear-to-r from-gray-500 to-black text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all transform hover:-translate-y-0.5 shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Update Patient
              </span>
            </button>
            <button
              onClick={() => navigate("/all-patients")}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePatient;
