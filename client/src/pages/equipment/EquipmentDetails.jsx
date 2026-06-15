import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { MapPin, Tag, User as UserIcon, Calendar, Info } from 'lucide-react';

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [equipment, setEquipment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  
  // Booking dates
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        const { data } = await API.get(`/equipment/${id}`);
        if (data.success) {
          setEquipment(data.data);
        } else {
          toast.error("Equipment not found");
          navigate('/equipment');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load equipment details");
        navigate('/equipment');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipmentDetails();
  }, [id, navigate]);

  useEffect(() => {
    if (startDate && endDate && equipment) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        setTotalPrice(diffDays * equipment.pricePerDay);
      } else {
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, equipment]);

  const handleBook = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to book equipment");
      navigate('/login', { state: { from: { pathname: `/equipment/${id}` } } });
      return;
    }
    
    if (user.role !== 'farmer') {
      toast.error("Only farmers can book equipment");
      return;
    }
    
    if (new Date(endDate) < new Date(startDate)) {
      toast.error("End date cannot be before start date");
      return;
    }

    setIsBooking(true);
    try {
      const { data } = await API.post('/bookings', {
        equipmentId: id,
        startDate,
        endDate
      });
      
      if (data.success) {
        toast.success("Booking confirmed successfully!");
        navigate('/dashboard/farmer');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen py-20"><Loader /></div>;
  }

  if (!equipment) return null;

  const imageUrl = equipment.images?.length > 0 ? equipment.images[0] : 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c4c40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col lg:flex-row">
          
          {/* Left Column: Image & Details */}
          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="h-64 md:h-96 relative bg-gray-200">
              <img src={imageUrl} alt={equipment.name} className="w-full h-full object-cover" />
              {!equipment.isAvailable && (
                <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-4 py-2 rounded-full shadow-lg">
                  Currently Booked
                </div>
              )}
            </div>
            
            <div className="p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-green-100 text-primary-dark font-medium px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Tag size={14} /> {equipment.category}
                </span>
                <span className="bg-gray-100 text-gray-700 font-medium px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <MapPin size={14} /> {equipment.location}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">{equipment.name}</h1>
              
              <div className="prose max-w-none mb-10">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 border-b pb-2">
                  <Info size={20} className="text-primary" /> Description
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{equipment.description}</p>
              </div>
              
              <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                  <UserIcon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Owned by</p>
                  <p className="text-lg font-bold text-gray-900">{equipment.owner?.name || "Verified Owner"}</p>
                  {equipment.owner?.phoneNumber && (
                    <p className="text-sm text-gray-600">Contact: {equipment.owner.phoneNumber}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Booking Widget */}
          <div className="w-full lg:w-1/3 bg-white p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-gray-100">
            <div className="sticky top-24">
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-gray-900">₹{equipment.pricePerDay}</span>
                <span className="text-gray-500"> / day</span>
              </div>
              
              <form onSubmit={handleBook} className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <Input 
                    label="Start Date"
                    id="startDate"
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mb-4 bg-white"
                  />
                  <Input 
                    label="End Date"
                    id="endDate"
                    type="date"
                    required
                    min={startDate || new Date().toISOString().split('T')[0]}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-white"
                  />
                </div>
                
                {totalPrice > 0 && (
                  <div className="flex justify-between items-center py-4 border-t border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Total Price:</span>
                    <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full py-4 text-lg" 
                  disabled={isBooking || !equipment.isAvailable}
                >
                  {isBooking ? "Confirming..." : (equipment.isAvailable ? "Book Now" : "Currently Unavailable")}
                </Button>
                
                {!user && (
                  <p className="text-sm text-center text-gray-500 mt-4">
                    You must be logged in as a farmer to book.
                  </p>
                )}
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;
