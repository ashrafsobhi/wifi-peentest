import { useState, useCallback, useRef, RefObject } from 'react';

interface UseDraggableOptions {
    onDragStop: (finalPosition: { x: number, y: number }) => void;
}

export const useDraggable = <T extends HTMLElement,>(
    handleRef: RefObject<T>,
    options: UseDraggableOptions,
) => {
    const isDragging = useRef(false);
    const initialPos = useRef({ x: 0, y: 0 });
    const positionOffset = useRef({ x: 0, y: 0 });

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        if (window.innerWidth < 768) { // Disable dragging on mobile
            return;
        }
        if (handleRef.current && handleRef.current.contains(e.target as Node)) {
            isDragging.current = true;
            const parentElement = handleRef.current.parentElement;
            if (parentElement) {
                const rect = parentElement.getBoundingClientRect();
                initialPos.current = { x: rect.left, y: rect.top };
                positionOffset.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }
        }
    }, [handleRef]);
    
    const onMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current) return;
        const parentElement = handleRef.current?.parentElement;
        if (parentElement) {
            const newX = e.clientX - positionOffset.current.x;
            const newY = e.clientY - positionOffset.current.y;
            parentElement.style.transform = `translate(${newX}px, ${newY}px)`;
        }
    }, [handleRef]);

    const onMouseUp = useCallback((e: MouseEvent) => {
        isDragging.current = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (handleRef.current?.parentElement) {
            const finalX = e.clientX - positionOffset.current.x;
            const finalY = e.clientY - positionOffset.current.y;
            options.onDragStop({ x: finalX, y: finalY });
            
            // Clear the inline style so React state can take over again.
            // The re-render will apply the final transform.
            handleRef.current.parentElement.style.transform = '';
        }
    }, [handleRef, options]);


    return { onMouseDown };
};