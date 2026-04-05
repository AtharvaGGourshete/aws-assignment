import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import CheckoutPage from "./pages/CheckoutPage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";

const App = () => (
  <div className="flex min-h-screen flex-col bg-transparent text-ink">
    <NavBar />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
