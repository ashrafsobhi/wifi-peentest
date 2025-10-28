
import React, { useState } from 'react';
import type { WindowComponentProps } from '../../types';
import * as geminiService from '../../services/geminiService';
import LoadingSpinner from '../common/LoadingSpinner';
import TypingOutput from '../common/TypingOutput';

const WifiCrackerWindow: React.FC<WindowComponentProps> = () => {
    const [step, setStep] = useState(1);
    const [output, setOutput] = useState('This tool is a GUI for the terminal commands.\nFor a more realistic experience, use the Terminal app.\n\nCommands:\n- airmon-ng start wlan0\n- airodump-ng wlan0mon\n- aircrack-ng handshake-01.cap\n\nClick "Scan for Networks" to begin.');
    const [isLoading, setIsLoading] = useState(false);

    const handleScan = async () => {
        setIsLoading(true);
        setOutput('');
        const result = await geminiService.simulateAirodump();
        setOutput(result);
        setIsLoading(false);
        setStep(2);
    };
    
    const handleCrack = async () => {
        setIsLoading(true);
        setOutput('');
        const result = await geminiService.simulateAircrack('handshake-01.cap');
        setOutput(result);
        setIsLoading(false);
        setStep(3);
    };

    return (
        <div className="flex flex-col h-full bg-slate-800 p-4">
            <div className="flex-grow bg-black rounded-md overflow-y-auto mb-4">
                {isLoading ? <LoadingSpinner /> : <TypingOutput text={output} />}
            </div>
            <div className="flex items-center justify-center space-x-4">
                {step === 1 && (
                    <button onClick={handleScan} disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-slate-600">
                        Scan for Networks
                    </button>
                )}
                {step === 2 && (
                     <button onClick={handleCrack} disabled={isLoading} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-slate-600">
                        Crack 'MyHomeWiFi'
                    </button>
                )}
                {step === 3 && (
                    <button onClick={() => setStep(1)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
};

export default WifiCrackerWindow;
