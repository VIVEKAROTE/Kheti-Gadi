import React, { useState, useEffect } from 'react';
import API from '../../api';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import Loader from '../../components/ui/Loader';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Plus, List, TrendingUp, Calendar as CalendarIcon, UploadCloud } from 'lucide-react';
import EquipmentCard from '../../components/equipment/EquipmentCard';

const categories = ['Tractor', 'Harvester', 'Power Tiller', 'Plough', 'Rotavator', 'Razor', 'Thresher', 'Cultivator', 'Other'];

const OwnerDashboard = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('equipment'); // 'equipment' or 'add'
  
  const [myEquipment, setMyEquipment] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Add Equipment Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tractor',
    description: '',
    pricePerDay: '',
    location: ''
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch all equipment and filter by user ID 
      // (Assuming the backend might not have a /myequipment route, we'll filter globally)
      const eqRes = await API.get('/equipment');
      if (eqRes.data.success) {
        // filter equipment where owner._id equals the logged in user's ID
        const owned = eqRes.data.data.filter(eq => 
            eq.owner === user._id || (eq.owner && eq.owner._id === user._id)
        );
        setMyEquipment(owned);
      }

      // 2. Fetch bookings for owner's equipment
      const bookRes = await API.get('/bookings/mybookings');
      if (bookRes.data.success) {
        setMyBookings(bookRes.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setImageFiles(e.target.files);
  };

  const handleStatusUpdate = async (bookingId, status) => {
    const loadingToast = toast.loading("Updating booking status...");
    try {
      const { data } = await API.patch(`/bookings/${bookingId}`, { status });
      if (data.success) {
        toast.success(`Booking ${status} successfully!`, { id: loadingToast });
        fetchDashboardData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update booking status", { id: loadingToast });
    }
  };

  const handleAddEquipment = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      // Append files
      for (let i = 0; i < imageFiles.length; i++) {
        submitData.append('images', imageFiles[i]);
      }
      
      const { data } = await API.post('/equipment', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (data.success) {
        toast.success("Equipment added successfully!");
        setFormData({
          name: '',
          category: 'Tractor',
          description: '',
          pricePerDay: '',
          location: ''
        });
        setImageFiles([]);
        setActiveTab('equipment');
        fetchDashboardData(); // refresh list
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add equipment");
    } finally {
      setIsAdding(false);
    }
  };

  const totalEarnings = myBookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.totalPrice : 0), 0);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Owner Dashboard</h1>
          <p className="text-gray-600">Manage your machinery, track bookings, and grow your income.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 text-primary rounded-xl flex items-center justify-center">
              <List size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Listed Machinery</p>
              <p className="text-2xl font-bold text-gray-900">{myEquipment.length}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <CalendarIcon size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{myBookings.length}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalEarnings}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`pb-4 px-6 font-medium text-sm transition-colors relative ${activeTab === 'equipment' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('equipment')}
          >
            My Equipment
            {activeTab === 'equipment' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-md"></span>
            )}
          </button>
          <button
            className={`pb-4 px-6 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === 'add' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('add')}
          >
            <Plus size={16} /> Add New
            {activeTab === 'add' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-md"></span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        {isLoading ? (
          <Loader />
        ) : activeTab === 'equipment' ? (
          <div>
            {myEquipment.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {myEquipment.map(eq => (
                  <EquipmentCard key={eq._id} equipment={eq} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <List className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No equipment listed</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">Start earning by listing your idle machinery for other farmers to rent.</p>
                <Button onClick={() => setActiveTab('add')}>
                  Add First Equipment
                </Button>
              </div>
            )}
            
            {/* Owner's Bookings Section (Recent 5) */}
            {myBookings.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                          <th className="p-4 font-medium">Equipment</th>
                          <th className="p-4 font-medium">Farmer</th>
                          <th className="p-4 font-medium">Dates</th>
                          <th className="p-4 font-medium">Amount</th>
                          <th className="p-4 font-medium">Status</th>
                          <th className="p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {myBookings.slice(0, 5).map(booking => (
                          <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-900">{booking.equipment?.name || 'Unknown'}</td>
                            <td className="p-4 text-gray-600">{booking.farmer?.name || 'Unknown'}</td>
                            <td className="p-4 text-gray-600 text-sm">
                              {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}
                            </td>
                            <td className="p-4 font-medium text-primary">₹{booking.totalPrice}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                {booking.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition duration-200 cursor-pointer"
                                    >
                                      Accept
                                    </button>
                                    <button
                                      onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition duration-200 cursor-pointer"
                                    >
                                      Decline
                                    </button>
                                  </>
                                )}
                                {booking.status === 'confirmed' && (
                                  <button
                                    onClick={() => handleStatusUpdate(booking._id, 'completed')}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition duration-200 cursor-pointer"
                                  >
                                    Complete
                                  </button>
                                )}
                                {(booking.status === 'completed' || booking.status === 'cancelled') && (
                                  <span className="text-gray-400 text-sm">-</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Add Equipment Form */
          <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">List New Machinery</h2>
            
            <form onSubmit={handleAddEquipment} className="space-y-6">
              <Input 
                label="Equipment Name"
                id="name"
                required
                placeholder="e.g. Mahindra Tractor 575 DI"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <Input 
                  label="Price Per Day (₹)"
                  id="price"
                  type="number"
                  required
                  min="0"
                  placeholder="e.g. 1500"
                  value={formData.pricePerDay}
                  onChange={(e) => setFormData({...formData, pricePerDay: e.target.value})}
                />
              </div>
              
              <Input 
                label="Location (City, State)"
                id="location"
                required
                placeholder="e.g. Pune, Maharashtra"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none min-h-[100px]"
                  required
                  placeholder="Provide details about the equipment condition, horsepower, included accessories, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition">
                  <input 
                    type="file" 
                    id="images" 
                    multiple 
                    accept="image/*"
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  <label htmlFor="images" className="cursor-pointer flex flex-col items-center">
                    <UploadCloud size={32} className="text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-primary hover:underline">Click to upload images</span>
                    <span className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</span>
                  </label>
                </div>
                {imageFiles.length > 0 && (
                  <p className="text-sm text-green-600 mt-2">{imageFiles.length} file(s) selected.</p>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
                <Button type="button" variant="ghost" onClick={() => setActiveTab('equipment')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? 'Listing Equipment...' : 'List Equipment'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
