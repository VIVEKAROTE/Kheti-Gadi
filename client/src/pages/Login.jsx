import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', formData);

            localStorage.setItem('profile', JSON.stringify({ ...data }));
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">🚜 KhetiGadi</h2>
                <div className="space-y-5">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />

                    <button className="w-full bg-green-600 text-white p-4 rounded-xl font-bold hover:bg-green-700 transition duration-300">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;