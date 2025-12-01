import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../libs/cn';

const selectVariants = cva('border text-sm rounded-lg block w-full transition-colors cursor-pointer', {
    variants: {
        tamanho: {
            sm: 'p-2 text-sm',
            base: 'p-2.5 text-sm',
            lg: 'p-3 text-base',
        },
    },
    defaultVariants: {
        tamanho: 'base',
    },
});

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement>,
        VariantProps<typeof selectVariants> {
    options: { value: string; label: string }[];
    placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ tamanho, options, placeholder, className, ...props }, ref) => {
        return (
            <select ref={ref} className={cn(selectVariants({ tamanho }), className)} {...props}>
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }
);

Select.displayName = 'Select';
