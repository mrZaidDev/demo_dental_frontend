import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AllPatients from "./pages/AllPatients";
import Navbar from "./components/Navbar";
import { useState } from "react";
import CreatePatient from "./pages/CreatePatient";
import AllEarning from "./pages/AllEarning";
import UpdatePatient from "./pages/UpdatePatient";
import toast, { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoutes";

const App = () => {
  return (
    <div>
      <Navbar />

      <Toaster position="top-left" />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/all-patients"
          element={
            <ProtectedRoute>
              <AllPatients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-patient"
          element={
            <ProtectedRoute>
              <CreatePatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-patient/:id"
          element={
            <ProtectedRoute>
              <UpdatePatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-earning"
          element={
            <ProtectedRoute>
              <AllEarning />
            </ProtectedRoute>
          }
        />
    
      </Routes>
    </div>
  );
};

export default App;
