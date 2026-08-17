import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";

import Dashboard from "./pages/Dashboard/Dashboard";
import VisaList from "./pages/Visa/VisaList";
import AddVisa from "./pages/Visa/AddVisa";
import VisaDetails from "./pages/Visa/VisaDetails";
import Reports from "./pages/Reports/Reports";
import Profile from "./pages/Profile/Profile";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Visa List */}
          <Route path="/visa" element={<VisaList />} />

          {/* Add Visa */}
          <Route path="/visa/add" element={<AddVisa />} />

          {/* Visa Details */}
          <Route path="/visa/:id" element={<VisaDetails />} />

          {/* Reports */}
          <Route path="/reports" element={<Reports />} />
          
          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Profile (if you add later) */}
          {/* 
          <Route
            path="/profile"
            element={<Profile />}
          />
          */}

          {/* Unknown route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
