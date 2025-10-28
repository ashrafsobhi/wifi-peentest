
import React from 'react';

interface IconProps {
    title: string;
    icon: React.ReactNode;
    onDoubleClick: () => void;
}

const Icon: React.FC<IconProps> = ({ title, icon, onDoubleClick }) => {
    return (
        <div 
            className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-white/10 transition-colors w-24 h-24 cursor-pointer"
            onDoubleClick={onDoubleClick}
        >
            <div className="w-10 h-10 text-white">
                {icon}
            </div>
            <span className="text-white text-xs mt-2 text-center break-words">{title}</span>
        </div>
    );
};

export default Icon;
