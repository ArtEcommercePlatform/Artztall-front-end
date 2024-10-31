import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';

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
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Handcrafted </h1>
            <ProductList />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;