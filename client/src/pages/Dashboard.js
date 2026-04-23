import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { LayoutDashboard, TrendingUp, AlertTriangle, CheckCircle, Search } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/news/stats');
                setStats(res.data.data);
            } catch (err) {
                console.error('Error fetching stats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="text-center py-12">Loading stats...</div>;

    const getCount = (label) => {
        const item = stats?.stats.find(s => s._id === label);
        return item ? item.count : 0;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <LayoutDashboard className="h-8 w-8 mr-3 text-indigo-600" />
                User Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-indigo-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Analyzed</p>
                            <h3 className="text-3xl font-bold">{stats?.total || 0}</h3>
                        </div>
                        <TrendingUp className="h-10 w-10 text-indigo-200" />
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Real News</p>
                            <h3 className="text-3xl font-bold">{getCount('Real')}</h3>
                        </div>
                        <CheckCircle className="h-10 w-10 text-green-200" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-red-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Fake News</p>
                            <h3 className="text-3xl font-bold">{getCount('Fake')}</h3>
                        </div>
                        <AlertTriangle className="h-10 w-10 text-red-200" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Suspicious</p>
                            <h3 className="text-3xl font-bold">{getCount('Suspicious')}</h3>
                        </div>
                        <AlertTriangle className="h-10 w-10 text-yellow-200" />
                    </div>
                </div>
            </div>

            <div className="bg-indigo-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-xl">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold mb-2">Ready to verify some news?</h2>
                    <p className="text-indigo-100">Our tool helps you identify potentially misleading information using rule-based analysis.</p>
                </div>
                <Link 
                    to="/analyze" 
                    className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors flex items-center"
                >
                    <Search className="h-5 w-5 mr-2" />
                    Start Analyzing
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
