import React from 'react';
import type { AppDefinition } from './types';
import TerminalWindow from './components/apps/TerminalWindow';
import NmapWindow from './components/apps/NmapWindow';
import WifiCrackerWindow from './components/apps/WifiCrackerWindow';
import MetasploitWindow from './components/apps/MetasploitWindow';
import FirefoxWindow from './components/apps/FirefoxWindow';
import MissionBriefingWindow from './components/apps/MissionBriefingWindow';

const TerminalIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm1 3v2h4V7H5zm-1 4v2h2v-2H4zm3 0v2h4v-2H7zm-3 4v2h2v-2H4zm3 0v2h4v-2H7z"/></svg>
);

const NmapIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);

const WifiIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
);

const MetasploitIcon: React.FC<{className?: string}> = ({className}) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 13l-4-4h8l-4 4zm-4-6h8v2H8v-2z"/></svg>
);

const FirefoxIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l1.41-1.41L12 13.17l4.09-4.09L17.5 10.5 12 16 6.5 10.5z"/></svg>
);

const MissionIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm2-8h8v2H8v-2zm0-4h8v2H8V8z"/></svg>
);


export const APPS: AppDefinition[] = [
    {
        id: 'mission_briefing',
        title: 'CybHack Mission',
        icon: <MissionIcon />,
        component: MissionBriefingWindow,
        defaultSize: { width: 700, height: 600 },
    },
    {
        id: 'terminal',
        title: 'Terminal',
        icon: <TerminalIcon />,
        component: TerminalWindow,
        defaultSize: { width: 700, height: 450 },
    },
    {
        id: 'nmap',
        title: 'Nmap Scan',
        icon: <NmapIcon />,
        component: NmapWindow,
        defaultSize: { width: 600, height: 400 },
    },
    {
        id: 'wifi_cracker',
        title: 'WiFi Cracker',
        icon: <WifiIcon />,
        component: WifiCrackerWindow,
        defaultSize: { width: 600, height: 400 },
    },
    {
        id: 'metasploit',
        title: 'Metasploit',
        icon: <MetasploitIcon />,
        component: MetasploitWindow,
        defaultSize: { width: 600, height: 400 },
    },
    {
        id: 'firefox',
        title: 'Firefox',
        icon: <FirefoxIcon />,
        component: FirefoxWindow,
        defaultSize: { width: 800, height: 600 },
    },
];