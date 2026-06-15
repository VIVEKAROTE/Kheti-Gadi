import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api";
import useAuthStore from "../../store/useAuthStore";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'farmer'
    });
    const [isLoading, setIsLoading] = useState(false);
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await API.post('/auth/register', formData);
            setAuth(data, data.token, data.role);
            toast.success(`Account created successfully! Welcome ${data.name}.`);
            navigate(data.role === 'owner' ? '/dashboard/owner' : '/dashboard/farmer');
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration Failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
                    <p className="mt-2 text-sm text-gray-600">Join the KhetiGadi community</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            label="Full Name"
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                            label="Email Address"
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Input
                            label="Phone Number"
                            id="phoneNumber"
                            type="tel"
                            placeholder="1234567890"
                            required
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        />
                        <Input
                            label="Password"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">I am a...</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div 
                                    className={`p-3 border rounded-xl cursor-pointer text-center transition ${formData.role === 'farmer' ? 'border-primary bg-green-50 text-primary-dark font-bold' : 'border-gray-200'}`}
                                    onClick={() => setFormData({...formData, role: 'farmer'})}
                                >
                                    Farmer (Rent)
                                </div>
                                <div 
                                    className={`p-3 border rounded-xl cursor-pointer text-center transition ${formData.role === 'owner' ? 'border-primary bg-green-50 text-primary-dark font-bold' : 'border-gray-200'}`}
                                    onClick={() => setFormData({...formData, role: 'owner'})}
                                >
                                    Owner (List)
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Sign Up"}
                    </Button>
                    
                    <div className="text-sm text-center">
                        <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
