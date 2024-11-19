import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Homepage from './pages/homepage/Homepage';
import NewArtAdd from './pages/homepage/NewArtAdd';
import { ToastProvider } from './assets/components/toast/Toast';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show splash screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastProvider>
      <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {loading ? (
          <SplashScreen />
        ) : (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/newartadd" element={<NewArtAdd />} />
           
            {/* Add other routes as needed */}
          </Routes>
        )}
      </div>
    </Router>
    </ToastProvider>
  );
}


export default App;
