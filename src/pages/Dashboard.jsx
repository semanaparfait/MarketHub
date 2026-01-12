import React, { useEffect, useState } from "react";
import useAxiosCRUD from "../hooks/useAxios";
import { 
  Plus, Edit2, Trash2, Package, Search, User, X, 
  Save, LogOut, Info, LayoutDashboard, Star 
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    
    // --- State Management ---
    const [currentView, setCurrentView] = useState("products"); 
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});

    // --- CRUD Logic ---
    const { data, loading, fetchAll, deleteItem, createItem, updateItem } = useAxiosCRUD("/products");

    useEffect(() => {
        fetchAll();
    }, []);

    // Filter local list for search UX
    const productsList = data?.products || data || [];
    const filteredProducts = productsList.filter(p => 
        p.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Handler Functions ---
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newProduct = {
            id: Date.now(),
            title: formData.get("title"),
            price: parseFloat(formData.get("price")),
            description: formData.get("description") || "No description provided",
            category: formData.get("category") || "electronics",
            thumbnail: formData.get("thumbnail") || "https://via.placeholder.com/150",
            stock: 10,
            rating: 5.0
        };

        const loadToast = toast.loading("Adding to MarketHub...");
        try {
            // Save to localStorage
            const existingProducts = JSON.parse(localStorage.getItem("marketHub_products")) || [];
            existingProducts.push(newProduct);
            localStorage.setItem("marketHub_products", JSON.stringify(existingProducts));
            
            // Simulated POST request
            await createItem(newProduct);
            toast.success("Product added to view!", { id: loadToast });
            setShowAddModal(false);
            e.target.reset();
        } catch {
            toast.error("Failed to add product", { id: loadToast });
        }
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedUser = {
            ...user,
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email")
        };
        
        // Simulating profile update
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success("Profile saved successfully!");
    };

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logged out");
        navigate("/account");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* --- Sidebar --- */}
            <aside className="w-64 bg-black text-white p-6 hidden lg:flex flex-col border-r border-gray-800">
                <div className="flex items-center gap-2 mb-10">
                    <div className="bg-amber-500 p-2 rounded-lg"><Package className="text-black" size={24} /></div>
                    <h2 className="text-2xl font-bold italic tracking-tighter">MarketHub</h2>
                </div>
                
                <nav className="space-y-2 flex-1">
                    <button 
                        onClick={() => setCurrentView("products")}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${currentView === "products" ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:bg-gray-900'}`}
                    >
                        <LayoutDashboard size={20} /> <span>Inventory</span>
                    </button>
                    <button 
                        onClick={() => setCurrentView("profile")}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${currentView === "profile" ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:bg-gray-900'}`}
                    >
                        <User size={20} /> <span>My Profile</span>
                    </button>
                </nav>

                <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-gray-500 hover:text-red-500 transition-colors mt-auto border-t border-gray-800 pt-6">
                    <LogOut size={20} /> <span>Sign Out</span>
                </button>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 p-6 md:p-10">
                {currentView === "products" ? (
                    <>
                        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900">Manage Products</h1>
                                <p className="text-gray-500">Inventory status for {user.firstName || 'Admin'}</p>
                            </div>
                            <button 
                                onClick={() => setShowAddModal(true)}
                                className="bg-black text-white px-8 py-3 rounded-2xl font-bold hover:bg-gray-800 transition flex items-center gap-2 shadow-xl active:scale-95"
                            >
                                <Plus size={20} /> New Product
                            </button>
                        </header>

                        {/* Search & Table */}
                        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 relative bg-gray-50/50">
                                <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search your inventory..." 
                                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-black outline-none transition"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-50">
                                            <th className="px-8 py-5 text-left font-bold">Product Title</th>
                                            <th className="px-8 py-5 text-left font-bold">Price</th>
                                            <th className="px-8 py-5 text-center font-bold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {loading ? (
                                            <tr><td colSpan="3" className="text-center py-20 text-gray-400 animate-pulse">Syncing catalog...</td></tr>
                                        ) : filteredProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50/80 transition-colors group">
                                                <td className="px-8 py-5 font-bold text-gray-800 group-hover:text-black">{product.title}</td>
                                                <td className="px-8 py-5 text-gray-500 font-medium">${product.price}</td>
                                                <td className="px-8 py-5">
                                                    <div className="flex justify-center gap-2">
                                                        <button onClick={() => setSelectedProduct(product)} className="p-2 text-green-500 hover:bg-green-50 rounded-xl transition"><Info size={18}/></button>
                                                        <button onClick={() => updateItem(product.id, {title: "Modified"})} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition"><Edit2 size={18}/></button>
                                                        <button onClick={() => deleteItem(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"><Trash2 size={18}/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    /* --- Profile View --- */
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl font-black text-gray-900 mb-8">Account Settings</h1>
                        <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16"></div>
                            
                            <div className="flex items-center gap-8 mb-10 pb-10 border-b border-gray-100 relative z-10">
                                <img src={user.image} alt="Avatar" className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-lg" />
                                <div>
                                    <h2 className="text-2xl font-black">{user.firstName} {user.lastName}</h2>
                                    <p className="text-gray-400 font-medium text-sm">Member ID: {user.id || 'N/A'}</p>
                                </div>
                            </div>

                            <form onSubmit={handleProfileUpdate} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                                        <input name="firstName" defaultValue={user.firstName} className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-black outline-none transition" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                                        <input name="lastName" defaultValue={user.lastName} className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-black outline-none transition" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input name="email" defaultValue={user.email} className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-black outline-none transition" />
                                </div>
                                <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 shadow-xl transition active:scale-95">
                                    <Save size={20}/> Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>

            {/* --- Modals --- */}

            {/* 1. Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl p-10 relative">
                        <button onClick={() => setShowAddModal(false)} className="absolute top-8 right-8 text-gray-300 hover:text-black transition-colors"><X size={28}/></button>
                        <h2 className="text-3xl font-black mb-1 text-gray-900 leading-tight">New Listing</h2>
                        <p className="text-gray-400 mb-8 font-medium">Add a fresh item to your digital storefront.</p>
                        
                        <form onSubmit={handleAddProduct} className="space-y-3">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-2">Product Title</label>
                                <input name="title" required placeholder="e.g. Virunga Gold" className="w-full p-2 bg-gray-50 rounded border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-2">Price ($)</label>
                                <input name="price" type="number"  min={1} required placeholder="0.00" className="w-full p-2 bg-gray-50 rounded border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-2">Product Category</label>
                                <input name="category" required placeholder="e.g. electronics/shoes" className="w-full p-2 bg-gray-50 rounded border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-2">Product Description</label>
                               <textarea name="description" id="description" className="w-full resize-none p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-2">Product Title</label>
                                <input name="thumbnail" required placeholder="e.g. https://" className="w-full p-2 bg-gray-50 rounded border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <button type="submit" className="w-full bg-black text-white py-4 rounded-3xl font-bold text-lg hover:bg-gray-800 shadow-2xl active:scale-95 transition-all">
                                Publish Product
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* 2. Details Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-4xl rounded-[48px] shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]">
                        <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-10 bg-white/80 p-2 rounded-full"><X size={20}/></button>
                        
                        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-12">
                            <img src={selectedProduct.thumbnail || selectedProduct.images?.[0]} alt="detail" className="max-w-full h-auto drop-shadow-2xl object-contain rounded-2xl" />
                        </div>

                        <div className="md:w-1/2 p-10 md:p-16 overflow-y-auto">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                    <Star size={12} fill="currentColor"/> {selectedProduct.rating || '5.0'}
                                </span>
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{selectedProduct.category}</span>
                            </div>
                            
                            <h2 className="text-4xl font-black mb-4 text-gray-900">{selectedProduct.title}</h2>
                            <p className="text-3xl font-light text-gray-400 mb-6">${selectedProduct.price}</p>
                            
                            <p className="text-gray-500 leading-relaxed mb-8">
                                {selectedProduct.description || "No detailed description available for this item."}
                            </p>

                            <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-300 mb-1">Brand</p>
                                    <p className="font-bold text-gray-800">{selectedProduct.brand || 'Generic'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-300 mb-1">Stock Status</p>
                                    <p className={`font-bold ${selectedProduct.stock < 5 ? 'text-red-500' : 'text-green-500'}`}>
                                        {selectedProduct.availabilityStatus || `${selectedProduct.stock} Available`}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-300 mb-1">Shipping</p>
                                    <p className="font-medium text-gray-600 text-sm">{selectedProduct.shippingInformation || 'Standard'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-300 mb-1">Return Policy</p>
                                    <p className="font-medium text-gray-600 text-sm">{selectedProduct.returnPolicy || '30 Days'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}