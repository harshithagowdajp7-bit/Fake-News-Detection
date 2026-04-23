import React, { useState } from 'react';
import api from '../utils/api';
import { Search, AlertCircle, CheckCircle, Info, RefreshCw } from 'lucide-react';

const NewsAnalyzer = () => {
    const [content, setContent] = useState('');
    const [inputType, setInputType] = useState('text');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await api.post('/news/analyze', { content, inputType });
            setResult(res.data.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Analysis failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getResultColor = (type) => {
        switch (type) {
            case 'Real': return 'text-green-600 bg-green-50 border-green-200';
            case 'Fake': return 'text-red-600 bg-red-50 border-red-200';
            case 'Suspicious': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Real': return <CheckCircle className="h-12 w-12 text-green-500" />;
            case 'Fake': return <AlertCircle className="h-12 w-12 text-red-500" />;
            case 'Suspicious': return <Info className="h-12 w-12 text-yellow-500" />;
            default: return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Analyze News</h1>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
                <form onSubmit={handleAnalyze}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Input Type</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-indigo-600"
                                    name="inputType"
                                    value="text"
                                    checked={inputType === 'text'}
                                    onChange={() => setInputType('text')}
                                />
                                <span className="ml-2">Text Content</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-indigo-600"
                                    name="inputType"
                                    value="url"
                                    checked={inputType === 'url'}
                                    onChange={() => setInputType('url')}
                                />
                                <span className="ml-2">URL</span>
                            </label>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {inputType === 'text' ? 'Paste news article text' : 'Enter news article URL'}
                        </label>
                        <textarea
                            rows={inputType === 'text' ? 8 : 2}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder={inputType === 'text' ? 'Paste the content here (min 50 characters recommended)...' : 'https://example.com/news-article'}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !content.trim()}
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Search className="h-5 w-5 mr-2" />
                                Analyze Now
                            </>
                        )}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
            </div>

            {result && (
                <div className={`bg-white rounded-xl shadow-lg border-2 p-8 ${getResultColor(result.result)}`}>
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                        <div className="flex-shrink-0">
                            {getIcon(result.result)}
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h2 className="text-2xl font-bold mb-2">Classification: {result.result}</h2>
                            <div className="flex items-center justify-center md:justify-start mb-4">
                                <span className="text-lg font-medium mr-2">Confidence Score:</span>
                                <div className="w-48 bg-gray-200 rounded-full h-4">
                                    <div 
                                        className={`h-4 rounded-full ${result.result === 'Real' ? 'bg-green-500' : result.result === 'Fake' ? 'bg-red-500' : 'bg-yellow-500'}`}
                                        style={{ width: `${result.confidenceScore}%` }}
                                    ></div>
                                </div>
                                <span className="ml-2 font-bold">{result.confidenceScore}%</span>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">Analysis Breakdown:</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    {result.explanation.length > 0 ? (
                                        result.explanation.map((exp, index) => (
                                            <li key={index}>{exp}</li>
                                        ))
                                    ) : (
                                        <li>No suspicious patterns detected.</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsAnalyzer;
