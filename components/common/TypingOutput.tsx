
import React, { useState, useEffect } from 'react';

interface TypingOutputProps {
    text: string;
    onFinished?: () => void;
}

const TypingOutput: React.FC<TypingOutputProps> = ({ text, onFinished }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText(''); // Reset on new text
        if (!text) return;

        let i = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(prev => prev + text.charAt(i));
            i++;
            if (i > text.length -1) {
                clearInterval(intervalId);
                if (onFinished) onFinished();
            }
        }, 10); // Adjust speed here

        return () => clearInterval(intervalId);
    }, [text, onFinished]);

    return (
        <pre className="font-fira-code text-sm whitespace-pre-wrap p-4">{displayedText}</pre>
    );
};

export default TypingOutput;
