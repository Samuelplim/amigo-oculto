import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../libs/cn';

const linkVariants = cva('font-body transition-colors duration-200 hover:opacity-80', {
    variants: {
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            base: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
        },
        weight: {
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
        },

        underline: {
            none: 'no-underline',
            hover: 'no-underline hover:underline',
            always: 'underline',
        },
    },
    defaultVariants: {
        size: 'base',
        weight: 'normal',
        underline: 'hover',
    },
});

interface LinkProps extends VariantProps<typeof linkVariants> {
    children: React.ReactNode;
    className?: string;
    href: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ size, weight, underline, children, className, href, target, rel }, ref) => {
        const commonClassName = cn(linkVariants({ size, weight, underline }), className);

        return (
            <a
                ref={ref}
                className={commonClassName}
                href={href}
                target={target}
                rel={target === '_blank' ? 'noopener noreferrer' : rel}
            >
                {children}
            </a>
        );
    }
);

Link.displayName = 'Link';
