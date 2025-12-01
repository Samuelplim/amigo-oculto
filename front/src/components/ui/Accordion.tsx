import { useState } from 'react';
import { Typography } from './Typography';

interface AccordionItemProps {
    title: string;
    content: string | React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem = ({ title, content, isOpen, onToggle }: AccordionItemProps) => {
    return (
        <div className="border-b">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center py-6 text-left hover:opacity-80 transition-opacity"
            >
                <Typography.Title level={4} className="uppercase">
                    {title}
                </Typography.Title>
                <svg
                    className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="leading-relaxed">{content}</div>
            </div>
        </div>
    );
};

interface AccordionProps {
    items: {
        title: string;
        content: string | React.ReactNode;
    }[];
    allowMultiple?: boolean;
}

const Accordion = ({ items, allowMultiple = false }: AccordionProps) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const handleToggle = (index: number) => {
        if (allowMultiple) {
            setOpenIndexes((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
        } else {
            setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
        }
    };

    return (
        <div className="">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndexes.includes(index)}
                    onToggle={() => handleToggle(index)}
                />
            ))}
        </div>
    );
};

export { Accordion };
