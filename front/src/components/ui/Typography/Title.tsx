import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../libs/cn';

const titleVariants = cva('tracking-wide font-title uppercase', {
    variants: {
        level: {
            1: 'text-4xl lg:text-7xl',
            2: 'text-3xl lg:text-4xl',
            3: 'text-2xl lg:text-3xl',
            4: 'text-xl lg:text-2xl',
            5: 'text-lg lg:text-xl',
            6: 'text-base lg:text-lg',
            8: 'text-8xl',
            hiper: 'text-9xl lg:text-[244px] leading-none',
            heroSection: 'text-[289px] leading-52',
        },
        align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
        },
    },
    defaultVariants: {
        level: 1,
        align: 'left',
    },
});

export interface TitleProps extends VariantProps<typeof titleVariants> {
    children: React.ReactNode;
    className?: string;
}
export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
    ({ level = 1, align, children, className }, ref) => {
        const commonClassName = cn(titleVariants({ level, align }), className);
        switch (level) {
            case 1:
                return (
                    <h1 ref={ref} className={commonClassName}>
                        {children}
                    </h1>
                );
            case 2:
                return (
                    <h2 ref={ref} className={commonClassName}>
                        {children}
                    </h2>
                );
            case 3:
                return (
                    <h3 ref={ref} className={commonClassName}>
                        {children}
                    </h3>
                );
            case 4:
                return (
                    <h4 ref={ref} className={commonClassName}>
                        {children}
                    </h4>
                );
            case 5:
                return (
                    <h5 ref={ref} className={commonClassName}>
                        {children}
                    </h5>
                );
            case 6:
                return (
                    <h6 ref={ref} className={commonClassName}>
                        {children}
                    </h6>
                );
            default:
                return (
                    <h1 ref={ref} className={commonClassName}>
                        {children}
                    </h1>
                );
        }
    }
);

Title.displayName = 'Title';
