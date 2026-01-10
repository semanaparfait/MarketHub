import React, { useEffect, useState } from "react";
import useAxiosCRUD from "../hooks/useAxios";
import { Plus, Edit2, Trash2, Package, Search, User, LayoutDashboard, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const { data, loading, fetchAll, deleteItem, createItem, updateItem } = useAxiosCRUD("/products");
    const [searchTerm, setSearchTerm] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchAll();
    }, []);

    // 1. CREATE: Modern prompt replacement
    const handleAdd = async () => {
        const title = prompt("Enter new product title:");
        if (!title) return;

        const loadingToast = toast.loading("Adding product...");
        try {
            await createItem({ title, price: 99.99, category: 'electronics' });
            toast.success("Product added successfully (Simulated)!", { id: loadingToast });
        } catch {
            toast.error("Failed to add product.", { id: loadingToast });
        }
    };

    // 2. DELETE with confirmation
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        
        const loadingToast = toast.loading("Deleting...");
        try {
            await deleteItem(id);
            toast.success("Product deleted successfully!", { id: loadingToast });
        } catch {
            toast.error("Deletion failed.", { id: loadingToast });
        }
    };

    // 3. UPDATE simulation
    const handleUpdate = async (id) => {
        const newTitle = prompt("Enter new title:");
        if (!newTitle) return;

        try {
            await updateItem(id, { title: newTitle });
            toast.success("Product updated!");
        } catch {
            toast.error("Update failed.");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logged out");
        navigate("/account");
    };

    const productsList = data?.products || data || [];
    const filteredProducts = productsList.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-black text-white p-6 hidden lg:flex flex-col">
                <div className="flex items-center gap-2 mb-10">
                    <div className="bg-amber-500 p-2 rounded-lg">
                        <Package className="text-black" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">MarketHub</h2>
                </div>
                
                <nav className="space-y-2 flex-1">
                    <NavItem icon={<LayoutDashboard size={20}/>} label="Inventory" active />
                    <NavItem icon={<User size={20}/>} label="Account Profile" />
                </nav>

                <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-gray-400 hover:text-red-500 transition-colors mt-auto">
                    <LogOut size={20} /> <span>Sign Out</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Manage Inventory</h1>
                        <p className="text-gray-500">Welcome back, {user?.firstName || 'Admin'}. Here is your product overview.</p>
                    </div>
                    <button 
                        onClick={handleAdd}
                        className="bg-black text-white px-6 py-3 rounded-2xl font-bold hover:bg-gray-800 transition flex items-center gap-2 shadow-xl"
                    >
                        <Plus size={20} /> New Product
                    </button>
                </header>

                {/* Statistics Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <StatBox label="Total Items" value={productsList.length} />
                    <StatBox label="Active Status" value="Online" />
                    <StatBox label="Last Updated" value="Today" />
                </div>

                {/* Inventory Table Container */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Filter products by name..." 
                                className="w-full pl-12 pr-4 py-3 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-black outline-none transition"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-50">
                                    <th className="px-8 py-5 text-left font-semibold">Product Details</th>
                                    <th className="px-8 py-5 text-left font-semibold">Unit Price</th>
                                    <th className="px-8 py-5 text-center font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr><td colSpan="3" className="text-center py-20 text-gray-400 animate-pulse">Syncing with database...</td></tr>
                                ) : filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="px-8 py-5">
                                            <span className="font-bold text-gray-800 group-hover:text-black">{product.title}</span>
                                        </td>
                                        <td className="px-8 py-5 text-gray-500 font-medium">${product.price}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex justify-center gap-2">
                                                <ActionButton icon={<Edit2 size={16}/>} color="blue" onClick={() => handleUpdate(product.id)} />
                                                <ActionButton icon={<Trash2 size={16}/>} color="red" onClick={() => handleDelete(product.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Sub-components for cleaner code
const NavItem = ({ icon, label, active }) => (
    <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${active ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}>
        {icon} <span>{label}</span>
    </div>
);

const StatBox = ({ label, value }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">{label}</p>
        <span className="text-3xl font-black text-black">{value}</span>
    </div>
);

const ActionButton = ({ icon, color, onClick }) => {
    const colors = {
        blue: "text-blue-500 hover:bg-blue-50",
        red: "text-red-500 hover:bg-red-50"
    };
    return (
        <button onClick={onClick} className={`p-3 rounded-xl transition ${colors[color]}`}>
            {icon}
        </button>
    );
};