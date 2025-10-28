import React from 'react';
import { useDesktop } from '../contexts/DesktopContext';
import { APPS } from '../constants';
import Icon from './Icon';
import Window from './Window';

const Desktop: React.FC = () => {
    const { windows, openWindow } = useDesktop();

    return (
        <main className="w-full h-full p-2 md:p-4 flex flex-row flex-wrap content-start items-start">
            {APPS.map(app => (
                <Icon
                    key={app.id}
                    title={app.title}
                    icon={app.icon}
                    onDoubleClick={() => openWindow(app.id)}
                />
            ))}
            
            {windows.map(win => (
                !win.isMinimized && (
                    <Window
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        position={win.position}
                        size={win.size}
                        appId={win.appId}
                        icon={win.icon}
                    >
                        <win.component windowId={win.id} onClose={() => {}} />
                    </Window>
                )
            ))}
        </main>
    );
};

export default Desktop;