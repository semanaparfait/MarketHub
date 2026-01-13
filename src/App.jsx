import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from "../src/pages/Home";
import Account from "../src/pages/Login"; // Assuming your Login/Signup is here
import Dashboard from '../src/pages/Dashboard';
import Cart from '../src/pages/Cart';
import Contact from '../src/pages/Contact';
import AdminDashboard from '../src/pages/AdminDashboard';
// import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import Wishlist from './pages/Wishlist';
import Error from './pages/error';

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }} 
      />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account' element={<Account />} />
        
        {/* 2. Protect the Dashboard route */}
        <Route 
          path='/dashboard' 
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          } 
        />
        <Route path='/cart' element={<Cart />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/wishlist' element={ <Wishlist />} />
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;