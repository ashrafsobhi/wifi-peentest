import React from 'react';
import { DesktopProvider } from './contexts/DesktopContext';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';

const App: React.FC = () => {
    return (
        <DesktopProvider>
            <div
                className="w-screen h-screen bg-cover bg-center transition-all duration-500"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop)` }}
            >
                <Desktop />
                <Taskbar />
            </div>
        </DesktopProvider>
    );
};

export default App;