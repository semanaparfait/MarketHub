import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, Sparkles, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosCRUD from "../../src/hooks/useAxios"; 
import logo from "../../public/logo1.png";
import axios from "axios";
import toast from "react-hot-toast"; // Import toast

export default function Account() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        email: "", 
        password: "",
        confirmPassword: "",
        fullName: "",
        phone: ""
    });

    const { createItem, loading: regLoading, error: apiError } = useAxiosCRUD("/users/add");

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            setLoginLoading(true);
            try {
                const response = await axios.post("https://dummyjson.com/user/login", {
                    username: formData.email, 
                    password: formData.password,
                    expiresInMins: 30
                });

                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("user", JSON.stringify(response.data));
                
                // Replace alert with toast.success
                toast.success(`Welcome back, ${response.data.firstName}!`);
                navigate("/");
                // navigate("/dashboard");
            } catch (err) {
                // Replace alert with toast.error
                toast.error("Login Failed. Please use 'emilys' / 'emilyspass'");
            } finally {
                setLoginLoading(false);
            }
        } else {
            const newUser = {
                firstName: formData.fullName.split(' ')[0],
                lastName: formData.fullName.split(' ')[1] || '',
                email: formData.email,
                password: formData.password,
            };

            await createItem(newUser); 
            // Replace alert with toast.success
            toast.success("Signup Simulated! Switch to Login to continue.");
            setIsLogin(true); 
        }
    };

    return (
        <section className="bg-gray-50 min-h-screen">
            <Link to='/'><img src={logo} alt="logo" width={180} className="pt-6 ml-8"/></Link>

            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                        <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                        <p className="text-xs text-amber-800">
                            <strong>Note:</strong> New signups are simulated. 
                            To test login, use <b>emilys</b> / <b>emilyspass</b>.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="flex bg-gray-50 p-1 m-6 rounded-xl border border-gray-200">
                            <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${isLogin ? "bg-white shadow-sm text-black" : "text-gray-400"}`}>Login</button>
                            <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${!isLogin ? "bg-white shadow-sm text-black" : "text-gray-400"}`}>Sign Up</button>
                        </div>

                        <div className="px-6 pb-8">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {!isLogin && (
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black" required />
                                    </div>
                                )}

                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input type="text" name="email" placeholder={isLogin ? "Username (e.g., emilys)" : "Email Address"} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black" required />
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleInputChange} className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black" required />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </button>
                                </div>

                                <button type="submit" disabled={loginLoading || regLoading} className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg disabled:bg-gray-400">
                                    {loginLoading || regLoading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
                                </button>
                                {apiError && <p className="text-red-500 text-xs text-center mt-2">{apiError}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}