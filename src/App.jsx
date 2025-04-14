import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";

import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/Profile";
import LoginForm from "./pages/LoginForm";
import UserRegistrationForm from "./pages/UserRegistrationForm";
import HomePage from "./pages/HomePage";
import SuperAdminDashboard from "./pages/admin/SuperAdminDashboard";

import { Toaster } from "react-hot-toast";
import CreateProductForm from "./pages/admin/CreateProductForm";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<UserRegistrationForm />} />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Nested Routes for Super Admin Dashboard */}
          <Route
            path="/superadmin-dashboard/*"
            element={
              <AdminProtectedRoute>
                <SuperAdminDashboard />
              </AdminProtectedRoute>
            }
          >
            <Route path="products" element={<CreateProductForm />} />
            {/* Add additional nested routes for users, orders, colors, brands, reviews, statistics here */}
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
