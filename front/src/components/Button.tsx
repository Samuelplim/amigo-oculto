import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../libs/cn';

const buttonVariants = cva(
    'flex items-center justify-center gap-2 rounded border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            size: {
                sm: 'px-4 py-2 text-sm',
                base: 'px-6 py-3 text-base',
                lg: 'px-8 py-4 text-lg',
            },
            fullWidth: {
                true: 'w-full',
                false: 'w-fit',
            },
        },
        defaultVariants: {
            size: 'base',
            fullWidth: false,
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    title: string;
    icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ size, fullWidth, icon, className, title, ...props }, ref) => {
        return (
            <button ref={ref} className={cn(buttonVariants({ size, fullWidth }), className)} {...props}>
                {icon && icon}
                {title}
            </button>
        );
    }
);

Button.displayName = 'Button';
