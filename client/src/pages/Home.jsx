import React from 'react';
import { Link } from 'react-router-dom';
import { Tractor, ArrowRight, ShieldCheck, Clock, Sprout } from 'lucide-react';
import Button from '../components/ui/Button';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-dark text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Agriculture Field" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Modern Farming Needs Modern Machinery
            </h1>
            <p className="text-lg md:text-xl text-green-100 mb-10 leading-relaxed">
              Rent high-quality agricultural equipment from local owners, or list your machinery to earn extra income. KhetiGadi connects farmers for a better harvest.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/equipment">
                <Button variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
                  Rent Equipment
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-4 bg-white/10 hover:bg-white/20 border-white text-white">
                  List Your Machinery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose KhetiGadi?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We make renting agricultural equipment as easy as booking a cab.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-primary mb-6">
                <Tractor size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Wide Range of Equipment</h3>
              <p className="text-gray-600">From tractors to harvesters, find exactly what you need for your farm size and crop type.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-primary mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Owners</h3>
              <p className="text-gray-600">All equipment listed is verified and maintained by trusted local community members.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-primary mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Booking</h3>
              <p className="text-gray-600">Rent by the day. Our transparent pricing means no hidden costs or surprise fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sprout size={48} className="mx-auto mb-6 text-yellow-100" />
          <h2 className="text-3xl font-bold mb-6">Ready to improve your farm's productivity?</h2>
          <p className="text-xl text-yellow-100 mb-10 max-w-2xl mx-auto">
            Join thousands of farmers who are already using KhetiGadi to access top-tier machinery without the burden of ownership.
          </p>
          <Link to="/equipment">
            <Button className="bg-white text-secondary hover:bg-gray-100 text-lg px-8 py-4 border-0">
              Browse Equipment Now <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
