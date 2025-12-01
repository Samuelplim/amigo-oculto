import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../libs/cn';

const inputTextVariants = cva(
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

interface InputTextProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
        VariantProps<typeof inputTextVariants> {
    className?: string;
    label: string;
}

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
    ({ size, weight, underline, className, label, ...props }, ref) => {
        const commonClassName = cn(inputTextVariants({ size, weight, underline }), className);

        return (
            <div className="flex flex-col">
                <label>{label}</label>
                <input ref={ref} className={commonClassName} type="text" {...props} />
            </div>
        );
    }
);

InputText.displayName = 'InputText';
