import React, { useState, useEffect } from 'react';
import API from '../../api';
import EquipmentCard from '../../components/equipment/EquipmentCard';
import Loader from '../../components/ui/Loader';
import Input from '../../components/ui/Input';
import { Search, FilterX } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = ['All', 'Tractor', 'Harvester', 'Power Tiller', 'Plough', 'Rotavator', 'Razor', 'Thresher', 'Cultivator', 'Other'];

const BrowseEquipment = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const { data } = await API.get('/equipment');
        if (data.success) {
          setEquipmentList(data.data);
          setFilteredList(data.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load equipment");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  useEffect(() => {
    let result = equipmentList;

    if (searchTerm) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }

    setFilteredList(result);
  }, [searchTerm, selectedCategory, equipmentList]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rent Agricultural Equipment</h1>
          <p className="text-gray-600">Find the right machinery for your farm from trusted owners near you.</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search by name or location..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-1/4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition duration-200 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition"
          >
            <FilterX size={18} /> Clear
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="py-20"><Loader /></div>
        ) : filteredList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredList.map((equipment) => (
              <EquipmentCard key={equipment._id} equipment={equipment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No equipment found</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
            <button 
              onClick={clearFilters}
              className="mt-4 text-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseEquipment;
