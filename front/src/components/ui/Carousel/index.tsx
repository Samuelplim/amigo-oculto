import { useState, ReactNode } from 'react';
import { ChevronLeft } from '../Image/ChevronLeft';
import { ChevronRight } from '../Image/ChevronRight';

interface CarouselProps<T> {
    items: T[];
    renderItem: (props: { item: T; index: number; isActive: boolean; isPast: boolean }) => ReactNode;
    initialIndex?: number;
    className?: string;
}

export const Carousel = <T,>({ items, renderItem, initialIndex = 0, className = '' }: CarouselProps<T>) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    const handlePrevious = () => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
    };

    const hasPrevious = activeIndex > 0;
    const hasNext = activeIndex < items.length - 1;

    return (
        <div className={`relative ${className}`}>
            {/* Items Container */}
            <div className="flex items-start justify-center gap-8">
                {/* Previous Item - Hidden on mobile/tablet */}
                {hasPrevious && (
                    <div className="hidden xl:block flex-1 max-w-md min-h-[526px] opacity-60">
                        {renderItem({
                            item: items[activeIndex - 1],
                            index: activeIndex - 1,
                            isActive: false,
                            isPast: true,
                        })}
                    </div>
                )}

                {/* Current Item */}
                <div className="flex-1 max-w-md min-h-[526px]">
                    {renderItem({ item: items[activeIndex], index: activeIndex, isActive: true, isPast: false })}
                </div>

                {/* Next Item - Hidden on mobile/tablet */}
                {hasNext && (
                    <div className="hidden xl:block flex-1 max-w-md min-h-[526px] opacity-60">
                        {renderItem({
                            item: items[activeIndex + 1],
                            index: activeIndex + 1,
                            isActive: false,
                            isPast: false,
                        })}
                    </div>
                )}
            </div>

            {/* Navigation Buttons - Below Current Card */}
            <div className="flex justify-start gap-4 mt-8" style={{ maxWidth: '28rem', margin: '2rem auto 0' }}>
                <button
                    onClick={handlePrevious}
                    disabled={!hasPrevious}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Item anterior"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                    onClick={handleNext}
                    disabled={!hasNext}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Próximo item"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>
            </div>
        </div>
    );
};
