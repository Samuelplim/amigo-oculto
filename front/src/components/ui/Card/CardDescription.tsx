import { forwardRef } from 'react';
import { TextProps } from '../Typography/Text';
import { Typography } from '../Typography';

const CardDescription = forwardRef<HTMLHeadingElement, TextProps>(({ className, children, ...props }, ref) => {
    return (
        <Typography.Text ref={ref} className={`${className || ''}`} {...props}>
            {children}
        </Typography.Text>
    );
});
CardDescription.displayName = 'CardDescription';

export { CardDescription };
