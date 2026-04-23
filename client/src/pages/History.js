import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { History as HistoryIcon, Clock, ExternalLink, Trash2 } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await api.get('/news/history');
                setHistory(res.data.data);
            } catch (err) {
                console.error('Error fetching history:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const getStatusBadge = (type) => {
        const base = "px-2 py-1 rounded-full text-xs font-bold ";
        switch (type) {
            case 'Real': return base + "bg-green-100 text-green-800";
            case 'Fake': return base + "bg-red-100 text-red-800";
            default: return base + "bg-yellow-100 text-yellow-800";
        }
    };

    if (loading) return <div className="text-center py-12">Loading history...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                    <HistoryIcon className="h-8 w-8 mr-3 text-indigo-600" />
                    Analysis History
                </h1>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {history.length} records found
                </span>
            </div>

            {history.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                    <p className="text-gray-500 text-lg">No history found. Start analyzing news to see results here!</p>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-xl overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Preview</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {history.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 truncate max-w-xs">
                                            {item.content}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                                            {item.inputType === 'url' ? <ExternalLink className="h-3 w-3 mr-1" /> : null}
                                            {item.inputType.toUpperCase()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={getStatusBadge(item.result)}>
                                            {item.result}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900">{item.confidenceScore}%</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default History;
