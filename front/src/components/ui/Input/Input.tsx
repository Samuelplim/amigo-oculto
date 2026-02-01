import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../libs/cn';

const inputVariants = cva(
    'font-body transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 border border-gray-300 rounded-md px-3 py-2',
    {
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
    }
);

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
    className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ size, weight, underline, className, ...props }, ref) => {
        const commonClassName = cn(inputVariants({ size, weight, underline }), className);

        return <input ref={ref} className={commonClassName} type="text" {...props} />;
    }
);

Input.displayName = 'Input';
