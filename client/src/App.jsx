import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Layout & Route Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import BrowseEquipment from './pages/equipment/BrowseEquipment';
import EquipmentDetails from './pages/equipment/EquipmentDetails';
import FarmerDashboard from './pages/dashboard/FarmerDashboard';
import OwnerDashboard from './pages/dashboard/OwnerDashboard';

function App() {
  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
          },
          success: {
            iconTheme: {
              primary: '#16a34a',
              secondary: '#fff',
            },
          },
        }} 
      />
      
      <Router>
        <Routes>
          {/* Public Routes with Layout */}
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/equipment' element={<BrowseEquipment />} />
            <Route path='/equipment/:id' element={<EquipmentDetails />} />
            
            {/* Protected Routes for Farmers */}
            <Route 
              path="/dashboard/farmer" 
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Routes for Owners */}
            <Route 
              path="/dashboard/owner" 
              element={
                <ProtectedRoute allowedRoles={['owner']}>
                  <OwnerDashboard />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;