import React, { useState } from 'react';
import type { WindowComponentProps } from '../../types';
import * as geminiService from '../../services/geminiService';
import LoadingSpinner from '../common/LoadingSpinner';
import TypingOutput from '../common/TypingOutput';


const NmapWindow: React.FC<WindowComponentProps> = () => {
    const [targetIp, setTargetIp] = useState('192.168.1.101');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleScan = async () => {
        if (!targetIp) return;
        setIsLoading(true);
        setResult('');
        const scanResult = await geminiService.simulateNmapScan(targetIp);
        setResult(scanResult);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-full bg-slate-800 p-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <label htmlFor="ip-input" className="text-white font-bold md:hidden">Target IP:</label>
                <input
                    id="ip-input"
                    type="text"
                    value={targetIp}
                    onChange={(e) => setTargetIp(e.target.value)}
                    className="flex-grow bg-slate-900 text-white p-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="e.g., 192.168.1.1"
                />
                <button
                    onClick={handleScan}
                    disabled={isLoading}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-slate-600"
                >
                    {isLoading ? 'Scanning...' : 'Scan'}
                </button>
            </div>
            <div className="flex-grow bg-black rounded-md overflow-y-auto">
                {isLoading && <LoadingSpinner />}
                {result && <TypingOutput text={result} />}
            </div>
        </div>
    );
};

export default NmapWindow;