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
                let loggedIn = false;
                let userData = null;

                // Try API login first
                try {
                    const response = await axios.post("https://dummyjson.com/user/login", {
                        username: formData.email, 
                        password: formData.password,
                        expiresInMins: 7
                    });
                    userData = response.data;
                    loggedIn = true;
                    console.log("API login successful");
                } catch (apiErr) {
                    console.log("API login failed, checking localStorage...");
                    // API failed, check localStorage
                    const localUsers = JSON.parse(localStorage.getItem("marketHub_users")) || [];
                    console.log("Local users:", localUsers);
                    console.log("Looking for email:", formData.email.trim());
                    console.log("Password entered:", formData.password);
                    
                    const localUser = localUsers.find(
                        u => {
                            const emailMatch = (u.email && u.email.toLowerCase().trim() === formData.email.toLowerCase().trim()) || 
                                             (u.username && u.username.toLowerCase().trim() === formData.email.toLowerCase().trim());
                            const passwordMatch = u.password === formData.password;
                            console.log("Checking user:", u.email, "Email match:", emailMatch, "Password match:", passwordMatch);
                            return emailMatch && passwordMatch;
                        }
                    );

                    if (localUser) {
                        console.log("Local user found:", localUser);
                        userData = localUser;
                        loggedIn = true;
                    } else {
                        console.log("No matching local user found");
                    }
                }

                if (loggedIn && userData) {
                    if(userData.role !== 'admin') {
                        localStorage.setItem("token", userData.accessToken || "local_token_" + Date.now());
                        localStorage.setItem("user", JSON.stringify(userData));
                        toast.success(`Welcome back, ${userData.firstName}!`);
                        navigate("/");
                    } else {
                        localStorage.setItem("token", userData.accessToken || "admin_token_" + Date.now());
                        localStorage.setItem("user", JSON.stringify(userData));
                        navigate("/AdminDashboard");
                    }
                } else {
                    toast.error("Invalid credentials. Try 'emilys' / 'emilyspass' or sign up first.");
                }
            } catch (err) {
                console.error("Login error:", err);
                toast.error("Login failed. Please try again.");
            } finally {
                setLoginLoading(false);
            }
        } else {
            // Signup - save to localStorage
            const newUser = {
                id: Date.now(),
                firstName: formData.fullName.split(' ')[0],
                lastName: formData.fullName.split(' ')[1] || '',
                email: formData.email,
                username: formData.email,
                password: formData.password,
                image: "https://i.pinimg.com/736x/1c/b0/1d/1cb01d71a4e0ce1dc227ed10ffe2de97.jpg",
                role: "user"
            };

            // Get existing users from localStorage
            const localUsers = JSON.parse(localStorage.getItem("marketHub_users")) || [];
            
            // Check if user already exists
            const existingUser = localUsers.find(u => u.email === newUser.email);
            if (existingUser) {
                toast.error("User already exists! Please login.");
                return;
            }

            // Add new user to localStorage
            localUsers.push(newUser);
            localStorage.setItem("marketHub_users", JSON.stringify(localUsers));

            // Try API signup (simulated)
            try {
                await createItem(newUser);
            } catch (apiErr) {
                console.log("API signup failed, but saved locally");
            }

            toast.success("Account created successfully! Please login.");
            setIsLogin(true);
            setFormData({
                email: "", 
                password: "",
                confirmPassword: "",
                fullName: "",
                phone: ""
            });
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
                            <strong>Demo:</strong> Use <b>emilys</b> / <b>emilyspass</b> or create your own account.
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
                                        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black" required />
                                    </div>
                                )}

                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input type="text" name="email" placeholder={isLogin ? "Username or Email" : "Email Address"} value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black" required />
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black" required />
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