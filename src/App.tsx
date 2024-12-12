import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./contexts/PrivateRoutes";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ToastProvider } from "./assets/components/toast/Toast";

// Public Pages
import Homepage from "./pages/homepage/Homepage";
import Shop from "./pages/common/Shop";
import ArtistMain from "./pages/ArtistMain";

// Artisan Pages
import ArtisanLayout from "./pages/artisanLayout/ArtisanLayout";
import Dashboard from "./pages/artisan/Dashboard";
import Products from "./pages/artisan/Orders";
import Gallery from "./pages/artisan/Gallery";
import Auctions from "./pages/artisan/Auctions";
import Orders from "./pages/artisan/Orders";
import TransactionHistory from "./pages/artisan/TransactionHistory";

// Customer Pages
import CustomerLayout from "./pages/CustomerLayout/CustomerLayout";
import CustomerDashboard from "./pages/Customer/Dashboard";
import CuGallery from "./pages/Customer/Gallery";
import CuAuctions from "./pages/Customer/Auction";
import MakeOrder from "./pages/Customer/MakeOrder";
import Payment from "./pages/Customer/Payment";
import Wishlist from "./pages/Customer/WishList";
import OrdersManagement from "./pages/Customer/OrdersManagement";

// Admin Pages
import AdminLayout from "./pages/AdminLayout/AdminLayout";
import AdDashborad from "./pages/Admin/Dashboard";
import AdArtWork from "./pages/Admin/Artwork";
import AdAuction from "./pages/Admin/Auction";
import AdOrderTransaction from "./pages/Admin/OrderAndTransaction";
import AdUserManagment from "./pages/Admin/UserManagment";
import CustomerProfile from "./pages/Customer/CustomerProfile";
import ArtsanSettings from "./pages/Customer/ArtsanSettings";

const ArtisanRoutes = () => {
  return (
    <ArtisanLayout>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="my-gallery" element={<Gallery />} />
        <Route path="auctions" element={<Auctions />} />
        <Route path="orders" element={<Orders />} />
        <Route path="transactions" element={<TransactionHistory />} />
        <Route path="settings" element={<ArtsanSettings />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </ArtisanLayout>
  );
};

const CustomerRoutes = () => {
  return (
    <CustomerLayout>
      <Routes>
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="orders" element={<OrdersManagement />} />
        <Route path="gallery" element={<CuGallery />} />
        <Route path="auctions" element={<CuAuctions />} />
        <Route path="wish-list" element={<Wishlist />} />
        <Route path="settings" element={<CustomerProfile />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </CustomerLayout>
  );
};

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<AdDashborad />} />
        <Route path="auction" element={<AdAuction />} />
        <Route path="artwork" element={<AdArtWork />} />
        <Route path="order" element={<AdOrderTransaction />} />
        <Route path="user" element={<AdUserManagment />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

function App() {
  return (
    <NotificationProvider>
      <ToastProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/artismain" element={<ArtistMain />} />

              <Route element={<PrivateRoute allowedRoles={['ARTISAN']} />}>
                <Route path="/artisan/*" element={<ArtisanRoutes />} />
              </Route>

              <Route element={<PrivateRoute allowedRoles={['BUYER']} />}>
                <Route path="/customer/*" element={<CustomerRoutes />} />
                <Route path="/customer/make-order" element={<MakeOrder />} />
                <Route path="/customer/payment" element={<Payment />} />
              </Route>

              <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
                <Route path="/admin/*" element={<AdminRoutes />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </NotificationProvider>
  );
}

export default App;