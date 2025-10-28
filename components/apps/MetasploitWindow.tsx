
import React, { useState } from 'react';
import type { WindowComponentProps } from '../../types';
import * as geminiService from '../../services/geminiService';
import LoadingSpinner from '../common/LoadingSpinner';
import TypingOutput from '../common/TypingOutput';

const VULNERABILITIES = [
    'ms17_010_eternalblue',
    'proftpd_133c_backdoor',
    'unix/ftp/vsftpd_234_backdoor',
];

const MetasploitWindow: React.FC<WindowComponentProps> = () => {
    const [targetIp, setTargetIp] = useState('192.168.1.101');
    const [vulnerability, setVulnerability] = useState(VULNERABILITIES[0]);
    const [result, setResult] = useState('Ready to exploit.');
    const [isLoading, setIsLoading] = useState(false);

    const handleExploit = async () => {
        if (!targetIp || !vulnerability) return;
        setIsLoading(true);
        setResult('');
        const exploitResult = await geminiService.simulateMetasploit(targetIp, vulnerability);
        setResult(exploitResult);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-full bg-slate-800 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="ip-input-msf" className="block text-white font-bold mb-1">Target IP:</label>
                    <input
                        id="ip-input-msf"
                        type="text"
                        value={targetIp}
                        onChange={(e) => setTargetIp(e.target.value)}
                        className="w-full bg-slate-900 text-white p-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        placeholder="From Nmap Scan"
                    />
                </div>
                <div>
                    <label htmlFor="vuln-select" className="block text-white font-bold mb-1">Vulnerability:</label>
                    <select
                        id="vuln-select"
                        value={vulnerability}
                        onChange={(e) => setVulnerability(e.target.value)}
                        className="w-full bg-slate-900 text-white p-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                        {VULNERABILITIES.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
            </div>
            <button
                onClick={handleExploit}
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-slate-600 mb-4"
            >
                {isLoading ? 'Exploiting...' : 'Exploit'}
            </button>
            <div className="flex-grow bg-black rounded-md overflow-y-auto">
                {isLoading && <LoadingSpinner />}
                {result && <TypingOutput text={result} />}
            </div>
        </div>
    );
};

export default MetasploitWindow;
