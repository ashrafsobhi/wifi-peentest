import React, { useState } from 'react';

interface WifiPanelProps {
    onClose: () => void;
    setConnected: (status: boolean) => void;
}

const WifiPanel: React.FC<WifiPanelProps> = ({ onClose, setConnected }) => {
    const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'failed'>('idle');

    const handleConnect = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedNetwork === 'Vip') {
            setStatus('connecting');
            setTimeout(() => {
                if (password === 'password123') {
                    setStatus('connected');
                    setConnected(true);
                    setTimeout(onClose, 1500);
                } else {
                    setStatus('failed');
                    setConnected(false);
                }
            }, 1000);
        }
    };

    const renderStatus = () => {
        switch (status) {
            case 'connecting': return <p className="text-yellow-400 text-center text-sm">جاري الاتصال...</p>;
            case 'connected': return <p className="text-green-400 text-center text-sm">تم الاتصال بنجاح!</p>;
            case 'failed': return <p className="text-red-400 text-center text-sm">كلمة السر غلط. حاول تاني.</p>;
            default: return null;
        }
    }

    const networks = ['Vip', 'MyHomeWiFi', 'Free Public Wifi', 'NeighborNet'];

    return (
        <div className="absolute bottom-12 right-2 w-64 bg-slate-800/90 backdrop-blur-md rounded-lg shadow-lg border border-slate-700 p-3 text-white z-50">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-sm">شبكات الواي فاي</h3>
                <button onClick={onClose} className="text-xl">&times;</button>
            </div>
            <ul className="space-y-1">
                {networks.map(net => (
                    <li key={net} 
                        onClick={() => { setSelectedNetwork(net); setStatus('idle'); setPassword(''); }}
                        className={`p-2 rounded-md cursor-pointer flex justify-between items-center ${selectedNetwork === net ? 'bg-sky-500/30' : 'hover:bg-white/10'}`}>
                        <span>{net}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                    </li>
                ))}
            </ul>
            {selectedNetwork === 'Vip' && (
                <form onSubmit={handleConnect} className="mt-3 border-t border-slate-700 pt-3">
                     <label htmlFor="wifi-pass" className="text-xs mb-1 block">كلمة السر لشبكة "{selectedNetwork}":</label>
                     <input
                        id="wifi-pass"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-900 p-1 rounded-md text-xs border border-slate-600"
                        autoFocus
                     />
                     <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 rounded-md py-1 mt-2 text-sm font-semibold" disabled={status === 'connecting'}>
                        اتصال
                     </button>
                     <div className="h-4 mt-1">
                        {renderStatus()}
                     </div>
                </form>
            )}
        </div>
    );
};
export default WifiPanel;
