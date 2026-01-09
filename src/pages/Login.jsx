import React from "react";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../public/logo1.png"

export default function Account() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName:"",
        phone: ""
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            // Handle login
            console.log("Login:", { email: formData.email, password: formData.password });
        } else {
            // Handle signup
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            console.log("Signup:", formData);
        }
    };

    return (
      <section>
        <Link to='/'>
        <img src={logo} alt="logo to home" width={200} />
        </Link>

        <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to MarketHub</h1>
                    <p className="text-gray-600">
                        {isLogin ? "Sign in to your account" : "Create your account"}
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Tab Switcher */}
                    <div className="flex bg-gray-50 p-1 m-6 rounded-xl">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                isLogin
                                    ? "bg-white text-[#907764] shadow-sm"
                                    : "text-gray95 hover:text-gray-900"
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                !isLogin
                                    ? "bg-white text-black shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <div className="px-6 pb-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {!isLogin && (
                                <>
                                    {/* Name Fields */}
                                    {/* <div className="grid grid-cols-2 gap-4"> */}
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                placeholder="Full Name"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                                                required={!isLogin}
                                            />
                                        </div>
                                    {/* </div> */}

                                    {/* Phone */}
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                                            required={!isLogin}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Email */}
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

  

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:from-black hover:to-amber-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            >
                                {isLogin ? "Sign In" : "Create Account"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 border-t border-gray-200"></div>
                            <span className="px-3 text-sm text-gray-500 bg-white">or</span>
                            <div className="flex-1 border-t border-gray-200"></div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </button>
                        </div>

                        {/* Footer Links */}
                        <div className="text-center mt-6">
                            {isLogin ? (
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <button
                                        onClick={() => setIsLogin(false)}
                                        className="text-black hover:text-amber-700 font-semibold transition-colors"
                                    >
                                        Sign up
                                    </button>
                                </p>
                            ) : (
                                <p className="text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        className="text-black hover:text-amber-700 font-semibold transition-colors"
                                    >
                                        Sign in
                                    </button>
                                </p>
                            )}
                            {isLogin && (
                                <p className="text-sm text-gray-600 mt-2">
                                    <button className="text-black hover:text-amber-700 font-semibold transition-colors">
                                        Forgot password?
                                    </button>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 mt-8">
                    By signing up, you agree to our{" "}
                    <a href="#" className="text-black hover:text-amber-700">Terms of Service</a>{" "}
                    and{" "}
                    <a href="#" className="text-black hover:text-amber-700">Privacy Policy</a>
                </p>
            </div>
        </div>
      </section>
    );
}