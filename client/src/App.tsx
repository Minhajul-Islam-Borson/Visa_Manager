import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import VisaList from "./pages/Visa/VisaList";
import AddVisa from "./pages/Visa/AddVisa";
import VisaDetails from "./pages/Visa/VisaDetails";

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
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Visa List */}
          <Route
            path="/visa"
            element={<VisaList />}
          />

          {/* Redirect unknown routes to dashboard */}
          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
          {/* Add Visa */}
          <Route
            path="/visa/add"
            element={<AddVisa />}
          />
        </Route>
        {/* Visa Details */}
        <Route
          path="/visa/:id"
          element={<VisaDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;