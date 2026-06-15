import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../../api";
import useAuthStore from "../../store/useAuthStore";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await API.post('/auth/login', formData);
            setAuth(data, data.token, data.role);
            toast.success(`Welcome back, ${data.name}!`);
            
            if (from === "/") {
               navigate(data.role === 'owner' ? '/dashboard/owner' : '/dashboard/farmer');
            } else {
               navigate(from, { replace: true });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign in to your KhetiGadi account</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
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
                            label="Password"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                    
                    <div className="text-sm text-center">
                        <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
