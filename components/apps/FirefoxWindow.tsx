
import React, { useState } from 'react';
import type { WindowComponentProps } from '../../types';

const FirefoxWindow: React.FC<WindowComponentProps> = () => {
    const [url, setUrl] = useState('http://192.168.1.101');

    const handleGo = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real scenario, this would navigate. Here it does nothing.
    };
    
    return (
        <div className="flex flex-col h-full bg-white">
            <div className="flex items-center p-2 bg-gray-200">
                <div className="flex space-x-2 text-gray-500">
                    <button className="w-6 h-6 rounded-full border border-gray-400">{'<'}</button>
                    <button className="w-6 h-6 rounded-full border border-gray-400">{'>'}</button>
                    <button className="w-6 h-6 rounded-full border border-gray-400">{'⟳'}</button>
                </div>
                <form onSubmit={handleGo} className="flex-grow mx-4">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full p-1 rounded-full bg-white border border-gray-300 text-gray-800 text-sm"
                    />
                </form>
            </div>
            <div className="flex-grow p-8 bg-gray-100 text-gray-800">
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4 text-center">Web Server Login</h1>
                    <p className="text-sm text-gray-600 mb-6 text-center">Running on Apache/2.4.29 (Ubuntu)</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Username</label>
                            <input type="text" placeholder="admin" className="w-full px-3 py-2 border rounded-md"/>
                        </div>
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border rounded-md"/>
                        </div>
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirefoxWindow;
