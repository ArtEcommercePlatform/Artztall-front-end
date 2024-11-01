import  { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Homepage from './pages/homepage/Homepage';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show splash screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {loading ? (
        <SplashScreen />
      ) : (
        <>
      <Homepage/>
        </>
      )}
    </div>
  );
}

export default App;