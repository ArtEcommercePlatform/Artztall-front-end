import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import SplashScreen from './components/SplashScreen';
import Homepage from "./pages/homepage/Homepage";
import { ToastProvider } from "./assets/components/toast/Toast";
import AuctionDetails from "./pages/Customer/AuctionInside";
import Shop from "./pages/common/Shop";
import ArtistMain from "./pages/ArtistMain";

// Import Artisan Dashboard Pages
import Dashboard from "./pages/artisan/Dashboard";
import Products from "./pages/artisan/Products";
import Gallery from "./pages/artisan/Gallery";
import Auctions from "./pages/artisan/Auctions";
import ArtisanLayout from "./pages/artisanLayout/ArtisanLayout";
import Settings from "./pages/artisan/Settings";

// Import Customer Dashboard Pages

import CuGallery from "./pages/Customer/Gallery";
import CuAuctions from "./pages/Customer/Auction";
import CustomerLayout from "./pages/CustomerLayout/CustomerLayout";

//Import Admin Pages
import AdDashborad from "./pages/Admin/Dashboard";
import AdArtWork from "./pages/Admin/Artwork";
import AdAuction from "./pages/Admin/Auction";
import AdOrderTransaction from "./pages/Admin/OrderAndTransaction";
import AdUserManagment from "./pages/Admin/UserManagment";
import AdminLayout from "./pages/AdminLayout/AdminLayout";
import CustomerDashboard from "./pages/Customer/Dashboard";
import MakeOrder from "./pages/Customer/MakeOrder";
import Payment from "./pages/Customer/Payment";
import Wishlist from "./pages/Customer/WishList";
import OrdersManagement from "./pages/Customer/OrdersManagement";

// Artisan Routes Component
const ArtisanRoutes = () => {
  return (
    <ArtisanLayout>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="my-gallery" element={<Gallery />} />
        <Route path="auctions" element={<Auctions />} />
        <Route path="settings" element={<Settings />} />

        {/* Redirect to dashboard if no specific route matches */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </ArtisanLayout>
  );
};

// Cuatomer Routes Component
const CustomerRoutes = () => {
  return (
    <CustomerLayout>
      <Routes>
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="orders" element={<OrdersManagement />} />
        <Route path="gallery" element={<CuGallery />} />
        <Route path="auctions" element={<CuAuctions />} />
        <Route path="make-order" element={<MakeOrder />} />
        <Route path="payment" element={<Payment />} />
        <Route path="wish-list" element={<Wishlist />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </CustomerLayout>
  );
};

// Admin Routes Component
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
  // const [isInitialLoad, setIsInitialLoad] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsInitialLoad(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isInitialLoad) {
  //   return <SplashScreen />; // Show SplashScreen only on the initial load
  // }

  return (
    <ToastProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/artismain" element={<ArtistMain />} />
            <Route path="/artisan/*" element={<ArtisanRoutes />} />
            <Route path="/customer/*" element={<CustomerRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/customer/auction/:id" element={<AuctionDetails />} />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
