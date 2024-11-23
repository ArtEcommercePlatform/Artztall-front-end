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

// Import Customer Dashboard Pages
import CuDashboard from "./pages/Customer/Dashboard";
import CuProducts from "./pages/Customer/PendingOrders";
import CuGallery from "./pages/Customer/Gallery";
import CuAuctions from "./pages/Customer/Auction";
import CustomerLayout from "./pages/CustomerLayout/CustomerLayout";
import Settings from "./pages/artisan/Settings";

// Artisan Routes Component
const ArtisanRoutes = () => {
  return (
    <ArtisanLayout>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="gallery" element={<Gallery />} />
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
        <Route path="dashboard" element={<CuDashboard />} />
        <Route path="products" element={<CuProducts />} />
        <Route path="gallery" element={<CuGallery />} />
        <Route path="auctions" element={<CuAuctions />} />

        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </CustomerLayout>
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
            <Route path="/customer/auction/:id" element={<AuctionDetails />} />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
