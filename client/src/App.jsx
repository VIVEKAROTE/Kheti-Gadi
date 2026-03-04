import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';

const Home = () => (
  <div className="p-20 text-center">
    <h1 className='text-4xl font-extrabold text-green-700'>
      Welcome to KhetiGadi
    </h1>
    <p className="mt-4 text-gray-600 text-xl">
      The future of agricultural rental.
    </p>
  </div>
)

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;