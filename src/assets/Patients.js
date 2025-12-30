// Dummy patient data array for practice

const patients = [
  {
    id: 1,
    serialNumber: 1,
    name: "Ahmed Ali",
    phoneNumber: "+92 300 1234567",
    shade: "A2",
    total: 25000,
    advance: 10000,
    remaining: 15000,
    date: "2024-12-01"
  },
  {
    id: 2,
    serialNumber: 2,
    name: "Fatima Khan",
    phoneNumber: "+92 301 9876543",
    shade: "B3",
    total: 30000,
    advance: 30000,
    remaining: 0,
    date: "2024-11-28"
  },
  {
    id: 3,
    serialNumber: 3,
    name: "Hassan Mahmood",
    phoneNumber: "+92 333 5554444",
    shade: "C1",
    total: 18000,
    advance: 5000,
    remaining: 13000,
    date: "2024-11-25"
  },
  {
    id: 4,
    serialNumber: 4,
    name: "Ayesha Malik",
    phoneNumber: "+92 321 7778888",
    shade: "A3",
    total: 22000,
    advance: 15000,
    remaining: 7000,
    date: "2024-11-20"
  },
  {
    id: 5,
    serialNumber: 5,
    name: "Muhammad Raza",
    phoneNumber: "+92 345 2223333",
    shade: "B2",
    total: 35000,
    advance: 20000,
    remaining: 15000,
    date: "2024-11-18"
  },
  {
    id: 6,
    serialNumber: 6,
    name: "Zainab Hussain",
    phoneNumber: "+92 312 6665555",
    shade: "A1",
    total: 28000,
    advance: 28000,
    remaining: 0,
    date: "2024-11-15"
  },
  {
    id: 7,
    serialNumber: 7,
    name: "Bilal Sheikh",
    phoneNumber: "+92 304 9998888",
    shade: "C2",
    total: 20000,
    advance: 8000,
    remaining: 12000,
    date: "2024-11-12"
  },
  {
    id: 8,
    serialNumber: 8,
    name: "Maryam Iqbal",
    phoneNumber: "+92 335 1112222",
    shade: "B1",
    total: 32000,
    advance: 16000,
    remaining: 16000,
    date: "2024-11-08"
  },
  {
    id: 9,
    serialNumber: 9,
    name: "Usman Tariq",
    phoneNumber: "+92 322 4445555",
    shade: "A2",
    total: 24000,
    advance: 10000,
    remaining: 14000,
    date: "2024-11-05"
  },
  {
    id: 10,
    serialNumber: 10,
    name: "Sana Butt",
    phoneNumber: "+92 315 7776666",
    shade: "C3",
    total: 27000,
    advance: 27000,
    remaining: 0,
    date: "2024-11-01"
  },
  {
    id: 11,
    serialNumber: 11,
    name: "Imran Yousaf",
    phoneNumber: "+92 331 8889999",
    shade: "B2",
    total: 19000,
    advance: 5000,
    remaining: 14000,
    date: "2024-10-28"
  },
  {
    id: 12,
    serialNumber: 12,
    name: "Hira Abbas",
    phoneNumber: "+92 342 3332222",
    shade: "A3",
    total: 31000,
    advance: 20000,
    remaining: 11000,
    date: "2024-10-25"
  },
  {
    id: 13,
    serialNumber: 13,
    name: "Kamran Baig",
    phoneNumber: "+92 306 6667777",
    shade: "C1",
    total: 26000,
    advance: 13000,
    remaining: 13000,
    date: "2024-10-20"
  },
  {
    id: 14,
    serialNumber: 14,
    name: "Nida Rahman",
    phoneNumber: "+92 318 5556666",
    shade: "B3",
    total: 23000,
    advance: 23000,
    remaining: 0,
    date: "2024-10-18"
  },
  {
    id: 15,
    serialNumber: 15,
    name: "Faisal Javed",
    phoneNumber: "+92 334 1119999",
    shade: "A1",
    total: 29000,
    advance: 10000,
    remaining: 19000,
    date: "2024-10-15"
  }
];

// Export for use in React components
export default patients;

// Helper functions for calculations

// Calculate total earnings
export const calculateTotalEarnings = (patients) => {
  return patients.reduce((sum, patient) => sum + patient.total, 0);
};

// Calculate total advance
export const calculateTotalAdvance = (patients) => {
  return patients.reduce((sum, patient) => sum + patient.advance, 0);
};

// Calculate total remaining
export const calculateTotalRemaining = (patients) => {
  return patients.reduce((sum, patient) => sum + patient.remaining, 0);
};

// Get patients with pending payments
export const getPatientsWithPending = (patients) => {
  return patients.filter(patient => patient.remaining > 0);
};

// Search patients
export const searchPatients = (patients, searchTerm) => {
  const term = searchTerm.toLowerCase();
  return patients.filter(patient => 
    patient.name.toLowerCase().includes(term) ||
    patient.phoneNumber.includes(term) ||
    patient.serialNumber.toString().includes(term)
  );
};