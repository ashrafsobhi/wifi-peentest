import React, { useRef, useState, useEffect } from 'react';
import { useDesktop } from '../contexts/DesktopContext';
import { useDraggable } from '../hooks/useDraggable';

interface WindowProps {
    id: string;
    appId: string;
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    position: { x: number; y: number };
    size: { width: number; height: number };
}

const Window: React.FC<WindowProps> = ({ id, title, children, position, size, icon }) => {
    const { activeWindowId, focusWindow, closeWindow, toggleMinimize, updateWindowPosition } = useDesktop();
    const isActive = activeWindowId === id;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleRef = useRef<HTMLDivElement>(null);
    const { onMouseDown } = useDraggable(handleRef, { 
        onDragStop: (finalPosition) => updateWindowPosition(id, finalPosition)
    });
    
    const desktopStyle: React.CSSProperties = {
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: size.width,
        height: size.height,
        zIndex: isActive ? 40 : 20,
        borderColor: isActive ? 'rgb(14 165 233)' : 'rgb(30 41 59)',
        boxShadow: isActive ? '0 0 30px rgba(14, 165, 233, 0.4)' : '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
    };

    const mobileStyle: React.CSSProperties = {
        top: '0.5rem',
        left: '0.5rem',
        width: 'calc(100% - 1rem)',
        height: 'calc(100% - 4rem)', // Account for taskbar and padding
        zIndex: isActive ? 40 : 20,
        borderColor: isActive ? 'rgb(14 165 233)' : 'rgb(30 41 59)',
        boxShadow: isActive ? '0 0 20px rgba(14, 165, 233, 0.3)' : '0 4px 6px -1px rgb(0 0 0 / 0.3)',
    }

    return (
        <div
            className="absolute flex flex-col rounded-lg border transition-shadow,border-color duration-200"
            style={isMobile ? mobileStyle : desktopStyle}
            onMouseDown={() => focusWindow(id)}
        >
            <div
                ref={handleRef}
                className={`flex items-center justify-between px-3 h-8 rounded-t-md ${isMobile ? 'cursor-default' : 'cursor-move'} ${isActive ? 'bg-slate-700/80' : 'bg-slate-800/90'}`}
                onMouseDown={onMouseDown}
            >
                <div className="flex items-center">
                    <div className="w-5 h-5 mr-2 text-white">{icon}</div>
                    <h2 className="text-sm font-bold text-white">{title}</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => toggleMinimize(id)} className="w-5 h-5 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 focus:outline-none"></button>
                    <button className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 focus:outline-none"></button>
                    <button onClick={() => closeWindow(id)} className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 focus:outline-none"></button>
                </div>
            </div>
            <div className="flex-grow bg-slate-900/80 backdrop-blur-md text-white rounded-b-lg overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default Window;