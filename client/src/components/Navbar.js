import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Search, History, LogOut, Shield } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="bg-indigo-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Shield className="h-8 w-8 text-white" />
                            <span className="font-bold text-xl tracking-tight">VeriNews</span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                    <LayoutDashboard className="h-4 w-4 mr-2" />
                                    Dashboard
                                </Link>
                                <Link to="/analyze" className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                    <Search className="h-4 w-4 mr-2" />
                                    Analyzer
                                </Link>
                                <Link to="/history" className="hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                    <History className="h-4 w-4 mr-2" />
                                    History
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-4 text-sm hidden sm:inline-block">Welcome, {user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-indigo-700 hover:bg-indigo-800 p-2 rounded-full flex items-center justify-center transition-colors"
                            title="Logout"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
