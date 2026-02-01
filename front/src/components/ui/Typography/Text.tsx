import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../libs/cn';

const textVariants = cva('font-body', {
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
        align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
        },
        variant: {
            default: '',
            warning: 'text-yellow-600',
        },
    },
    defaultVariants: {
        size: 'base',
        weight: 'normal',
    },
});

export interface TextProps
    extends VariantProps<typeof textVariants>, Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'> {
    children: React.ReactNode;
    className?: string;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
    ({ size = 'base', weight = 'normal', children, className, align, variant, ...props }, ref) => {
        const commonClassName = cn(textVariants({ size, weight, align, variant }), className);

        return (
            <p ref={ref as React.Ref<HTMLParagraphElement>} className={commonClassName} {...props}>
                {children}
            </p>
        );
    }
);

Text.displayName = 'Text';
