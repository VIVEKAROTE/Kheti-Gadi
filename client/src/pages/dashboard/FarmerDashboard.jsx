import React, { useState, useEffect } from 'react';
import API from '../../api';
import useAuthStore from '../../store/useAuthStore';
import Loader from '../../components/ui/Loader';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, Clock, XCircle, MapPin } from 'lucide-react';

const FarmerDashboard = () => {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await API.get('/bookings/mybookings');
        if (data.success) {
          setBookings(data.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load your bookings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <CheckCircle className="text-green-500" size={20} />;
      case 'completed': return <CheckCircle className="text-blue-500" size={20} />;
      case 'cancelled': return <XCircle className="text-red-500" size={20} />;
      default: return <Clock className="text-yellow-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Here are your equipment bookings.</p>
        </div>

        {isLoading ? (
          <Loader />
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6">
                
                <div className="w-full md:w-48 h-32 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={booking.equipment?.images?.[0] || 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c4c40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'} 
                    alt={booking.equipment?.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.equipment?.name || "Equipment Unavailable"}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)} {booking.status}
                      </span>
                    </div>
                    
                    <div className="text-gray-600 text-sm mb-4 space-y-1">
                      <p className="flex items-center gap-1"><MapPin size={16} /> {booking.equipment?.location}</p>
                      <p className="flex items-center gap-1">
                        <Calendar size={16} /> 
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-auto">
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-xl font-bold text-primary">₹{booking.totalPrice}</p>
                    </div>
                    
                    <Link to={`/equipment/${booking.equipment?._id}`} className="text-primary hover:text-primary-dark font-medium text-sm">
                      View Equipment
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">You haven't rented any equipment yet. Browse our marketplace to find machinery for your farm.</p>
            <Link to="/equipment">
              <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition duration-300">
                Browse Equipment
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
