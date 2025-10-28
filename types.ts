
import React from 'react';

export interface WindowInstance {
    id: string;
    appId: string;
    title: string;
    icon: React.ReactNode;
    position: { x: number; y: number };
    size: { width: number; height: number };
    isMinimized: boolean;
    component: React.ComponentType<WindowComponentProps>;
}

export interface AppDefinition {
    id: string;
    title: string;
    icon: React.ReactNode;
    component: React.ComponentType<WindowComponentProps>;
    defaultSize: { width: number; height: number };
}

export interface WindowComponentProps {
    windowId: string;
    onClose: () => void;
}
