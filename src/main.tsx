import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import ProductList from './components/ProductList.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <ProductList /> */}
  </StrictMode>
);
