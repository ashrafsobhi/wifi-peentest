import React, { useState, useEffect } from 'react';
import { useDesktop } from '../contexts/DesktopContext';
import WifiPanel from './WifiPanel';

const WifiIcon: React.FC<{ connected: boolean }> = ({ connected }) => (
    <div title={connected ? "Network Connection: Connected" : "Network Connection: Disconnected"}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {connected ? (
                 <><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></>
            ) : (
                <><path d="M1 1l22 22m-2-2a16 16 0 0 0-21.16-21.16M8.53 16.11a6 6 0 0 1 6.95 0M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 5.07-2.91" /></>
            )}
        </svg>
    </div>
);

const Taskbar: React.FC = () => {
    const { windows, activeWindowId, focusWindow, toggleMinimize } = useDesktop();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isWifiPanelOpen, setIsWifiPanelOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleTaskbarIconClick = (id: string) => {
        const window = windows.find(w => w.id === id);
        if (window) {
            if (window.id === activeWindowId && !window.isMinimized) {
                toggleMinimize(id);
            } else {
                if (window.isMinimized) {
                    toggleMinimize(id);
                }
                focusWindow(id);
            }
        }
    };

    return (
        <>
            <footer className="absolute bottom-0 left-0 right-0 h-10 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-2 z-50">
                <div className="flex items-center space-x-1">
                    {/* Could add a Start Menu button here */}
                </div>
                <div className="flex-1 flex items-center justify-start space-x-2 overflow-x-auto">
                    {windows.map(win => (
                        <button
                            key={win.id}
                            onClick={() => handleTaskbarIconClick(win.id)}
                            className={`flex items-center space-x-2 px-2 py-1 rounded-md h-8 transition-colors ${
                                activeWindowId === win.id && !win.isMinimized
                                    ? 'bg-sky-500/30'
                                    : 'hover:bg-white/10'
                            }`}
                            title={win.title}
                        >
                            <div className="w-5 h-5 text-white">{win.icon}</div>
                            <span className="text-white text-xs truncate hidden sm:inline">{win.title}</span>
                        </button>
                    ))}
                </div>
                <div className="flex items-center space-x-3 text-white text-xs">
                    <button onClick={() => setIsWifiPanelOpen(prev => !prev)} className="p-1 rounded-md hover:bg-white/10">
                        <WifiIcon connected={isConnected} />
                    </button>
                    <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </footer>
            {isWifiPanelOpen && <WifiPanel onClose={() => setIsWifiPanelOpen(false)} setConnected={setIsConnected} />}
        </>
    );
};

export default Taskbar;