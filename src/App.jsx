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
import ProductsPage from "./pages/admin/ProductsPage";
import UsersPage from "./pages/admin/UsersPage";
import OrdersPage from "./pages/admin/OrdersPage";
import ColorsPage from "./pages/admin/ColorsPage";
import ReviewsPage from "./pages/admin/ReviewsPage";
import BrandsPage from "./pages/admin/BrandsPage";

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
        {/* Add additional nested routes for users, orders, colors, brands, reviews, statistics here */}
      </Route>
      <Route
        path="/admin/products"
        element={
          <AdminProtectedRoute>
            <ProductsPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminProtectedRoute>
            <UsersPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <OrdersPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/colors"
        element={
          <AdminProtectedRoute>
            <ColorsPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/reviews"
        element={
          <AdminProtectedRoute>
            <ReviewsPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/brands"
        element={
          <AdminProtectedRoute>
            <BrandsPage />
          </AdminProtectedRoute>
        }
      />
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
