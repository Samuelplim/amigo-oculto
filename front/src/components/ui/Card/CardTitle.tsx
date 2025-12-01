import { forwardRef } from 'react';
import { Typography } from '../Typography';
import { TitleProps } from '../Typography/Title';

const CardTitle = forwardRef<HTMLHeadingElement, TitleProps>(({ className, children, ...props }, ref) => {
    return (
        <Typography.Title ref={ref} level={4} className={`${className || ''}`} {...props}>
            {children}
        </Typography.Title>
    );
});
CardTitle.displayName = 'CardTitle';

export { CardTitle };
