import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
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

import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/products" /> : <HomePage />}
      />
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
      {/* E-commerce routes */}
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Toaster position="top-right" />
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

