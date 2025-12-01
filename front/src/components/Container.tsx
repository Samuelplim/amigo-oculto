import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <div className={`w-full lg:px-32 md:px-16 px-8 pt-4 pb-24 md:pb-0 flex flex-col gap-8 ${className}`}>
            {children}
        </div>
    );
};
