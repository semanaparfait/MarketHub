import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from "../src/pages/Home";
import Account from "../src/pages/Login"; // Assuming your Login/Signup is here
import Dashboard from '../src/pages/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      {/* 1. Toaster is placed outside Routes so it's available everywhere */}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;