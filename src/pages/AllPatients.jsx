import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AllPatients = () => {
  const navigate = useNavigate();
  const [patientsData, setPatientsData] = useState(null);
  const [patientsDataFiltering, setPatientsDataFiltering] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `https://demo-dental-backend.onrender.com/api/dental/patients`,
          { withCredentials: true }
        );
        setPatientsData(response.data.patients);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchPatients();
  }, []);

  const handlePatientDelete = async (patient_id) => {
    try {
      const res = await axios.delete(
        `https://demo-dental-backend.onrender.com/api/dental/delete-patient/${patient_id}`,
        { withCredentials: true }
      );
      const filterDeletedPatient = patientsData.filter(
        (e) => e._id != patient_id
      );
      console.log(filterDeletedPatient);
      setPatientsData(filterDeletedPatient);
      toast.success(res.data.message,{duration:700});
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdatePatient = (patient_id) => {
    navigate(`/update-patient/${patient_id}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      const filterResult = patientsData.filter(
        (patient) => patient.SN === Number(e.target.value)
      );
      setPatientsDataFiltering(filterResult);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(`https://demo-dental-backend.onrender.com/api/auth/logout`, {
        withCredentials: true,
      });
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/";
    } catch (error) {
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      toast.error(error.response.data.message);
    }
  };


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="absolute top-30 right-4  py-1 px-4 bg-linear-to-r from-red-300 to-red-500 text-white font-semibold rounded-lg  focus:outline-none focus:ring-4 focus:ring-purple-300 "
        >
          Logout
        </button>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            All Patients
          </h1>
          <p className="text-gray-600">Manage and view patient records</p>
        </div>

        {/* Search Bar */}
        {patientsData && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search by serial number"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
            />
          </div>
        )}

        {/* Patients Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-gray-500 to-black text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    SN
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Phone Number
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Advance
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Remaining
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {patientsData ? (
                  !searchTerm ? (
                    patientsData.map((patient) => (
                      <tr
                        key={patient._id}
                        className="hover:bg-purple-50 transition-colors"
                      >
                        {/* Serial Number */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-white to-black text-white font-semibold text-sm">
                            {patient.SN}
                          </span>
                        </td>

                        {/* Patient Name */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-800">
                              {patient.Name}
                            </span>
                          </div>
                        </td>

                        {/* Phone Number */}
                        <td className="px-6 py-4 text-gray-600">
                          {patient.PhoneNumber}
                        </td>

                        {/* Shade */}
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                            {patient.details}
                          </span>
                        </td>

                        {/* total advance remaining */}
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          Rs. {patient.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-semibold">
                          Rs. {patient.advance.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          {patient.total - patient.advance > 0 ? (
                            <span className="font-semibold text-red-600">
                              Rs. {patient.total - patient.advance}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Paid
                            </span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(patient.createdAt).toLocaleDateString()}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdatePatient(patient._id)}
                              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                            >
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>

                            <button
                              onClick={() => handlePatientDelete(patient._id)}
                              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                            >
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    patientsDataFiltering.map((patient) => (
                      <tr
                        key={patient._id}
                        className="hover:bg-purple-50 transition-colors"
                      >
                        {/* Serial Number */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-white to-black text-white font-semibold text-sm">
                            {patient.SN}
                          </span>
                        </td>

                        {/* Patient Name */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-800">
                              {patient.Name}
                            </span>
                          </div>
                        </td>

                        {/* Phone Number */}
                        <td className="px-6 py-4 text-gray-600">
                          {patient.PhoneNumber}
                        </td>

                        {/* Shade */}
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                            {patient.details}
                          </span>
                        </td>

                        {/* total advance remaining */}
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          Rs. {patient.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-semibold">
                          Rs. {patient.advance.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          {patient.total - patient.advance > 0 ? (
                            <span className="font-semibold text-red-600">
                              Rs. {patient.total - patient.advance}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Paid
                            </span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(patient.createdAt).toLocaleDateString()}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdatePatient(patient._id)}
                              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                            >
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>

                            <button
                              onClick={() => handlePatientDelete(patient._id)}
                              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                            >
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                ) : (
                  <tr>
                    <td>Loading ....</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPatients;
