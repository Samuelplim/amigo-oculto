import React from 'react';
import { Link } from '@tanstack/react-router';

interface NavItemProps {
    href: string;
    title: string;
    className?: string; // Allow passing additional classes for mobile/desktop variations
    onClick?: () => void; // For mobile nav toggle
}

export const NavItem: React.FC<NavItemProps> = ({
    href,
    title,
    className = 'hover:text-gray-300 transition-colors font-body',
    onClick,
}) => {
    return (
        <li>
            <Link
                to={href}
                className={className}
                onClick={onClick}
                activeProps={{
                    className: 'font-semibold underline decoration-2 underline-offset-4',
                }}
            >
                {title.toLowerCase()}
            </Link>
        </li>
    );
};
