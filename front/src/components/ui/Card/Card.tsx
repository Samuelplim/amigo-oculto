import * as React from 'react';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={`p-8 rounded shadow-lg ${className || ''}`} {...props}>
                {children}
            </div>
        );
    }
);
Card.displayName = 'Card';

export { Card };
