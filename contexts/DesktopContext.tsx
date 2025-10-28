
import React, { createContext, useState, useCallback, useContext } from 'react';
import type { WindowInstance, AppDefinition } from '../types';
import { APPS } from '../constants';

interface DesktopContextType {
    windows: WindowInstance[];
    activeWindowId: string | null;
    openWindow: (appId: string) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    toggleMinimize: (id: string) => void;
    updateWindowPosition: (id: string, newPosition: { x: number, y: number }) => void;
}

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [windows, setWindows] = useState<WindowInstance[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

    const openWindow = useCallback((appId: string) => {
        const app = APPS.find(a => a.id === appId);
        if (!app) return;

        const newWindow: WindowInstance = {
            id: `${appId}-${Date.now()}`,
            appId: app.id,
            title: app.title,
            icon: app.icon,
            position: { x: Math.random() * 200 + 50, y: Math.random() * 100 + 50 },
            size: app.defaultSize,
            isMinimized: false,
            component: app.component,
        };

        setWindows(prev => [...prev, newWindow]);
        setActiveWindowId(newWindow.id);
    }, []);

    const closeWindow = useCallback((id: string) => {
        setWindows(prev => prev.filter(w => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const focusWindow = useCallback((id: string) => {
        setActiveWindowId(id);
        setWindows(prev => {
            const windowToFocus = prev.find(w => w.id === id);
            if (!windowToFocus) return prev;
            return [...prev.filter(w => w.id !== id), windowToFocus];
        });
    }, []);
    
    const toggleMinimize = useCallback((id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
        if (!windows.find(w => w.id === id)?.isMinimized) {
            const nextActiveWindow = windows.filter(w => !w.isMinimized && w.id !== id).pop();
            setActiveWindowId(nextActiveWindow ? nextActiveWindow.id : null);
        } else {
            setActiveWindowId(id);
        }
    }, [windows]);

    const updateWindowPosition = useCallback((id: string, newPosition: { x: number, y: number }) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, position: newPosition } : w));
    }, []);

    return (
        <DesktopContext.Provider value={{
            windows,
            activeWindowId,
            openWindow,
            closeWindow,
            focusWindow,
            toggleMinimize,
            updateWindowPosition
        }}>
            {children}
        </DesktopContext.Provider>
    );
};

export const useDesktop = (): DesktopContextType => {
    const context = useContext(DesktopContext);
    if (!context) {
        throw new Error('useDesktop must be used within a DesktopProvider');
    }
    return context;
};
