import type { RefObject } from 'react';

export interface FlyOffsets {
    startX: number;
    startY: number;
    midX: number;
    midY: number;
    nearX: number;
    nearY: number;
}

export const defaultFlyOffsets: FlyOffsets = {
    startX: -160,
    startY: 60,
    midX: -40,
    midY: 6,
    nearX: -12,
    nearY: 2,
};

const buildOffsets = (deltaX: number, deltaY: number): FlyOffsets => ({
    startX: deltaX,
    startY: deltaY,
    midX: deltaX * 0.25,
    midY: deltaY * 0.25,
    nearX: deltaX * 0.05,
    nearY: deltaY * 0.05,
});
const LEFT_PADDING = 30;
const VERTICAL_OFFSET = -6;

const escapeAttributeValue = (value: string): string => {
    if (typeof window !== 'undefined' && window.CSS && typeof window.CSS.escape === 'function') {
        return window.CSS.escape(value);
    }
    return value.replace(/["\\]/g, '\\$&');
};

interface PrepareIconFlightOptions {
    questionId: number;
    optionValue: string;
    iconRef: RefObject<HTMLDivElement | null>;
    setOffsets: (offsets: FlyOffsets) => void;
}

export const prepareIconFlight = ({
    questionId,
    optionValue,
    iconRef,
    setOffsets,
}: PrepareIconFlightOptions): Promise<void> => {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            const escapedValue = escapeAttributeValue(optionValue);
            const optionElement = document.querySelector<HTMLElement>(
                `[data-question-id="${questionId}"][data-option-value="${escapedValue}"]`
            );
            const iconElement = iconRef.current;

            if (optionElement && iconElement) {
                const optionRect = optionElement.getBoundingClientRect();
                const iconRect = iconElement.getBoundingClientRect();

                const optionCenterY = optionRect.top + optionRect.height / 2;
                const iconCenterX = iconRect.left + iconRect.width / 2;
                const iconCenterY = iconRect.top + iconRect.height / 2;

                const deltaX = (optionRect.left + LEFT_PADDING) - iconCenterX;
                const deltaY = optionCenterY - iconCenterY + VERTICAL_OFFSET;

                setOffsets(buildOffsets(deltaX, deltaY));
            } else {
                setOffsets(defaultFlyOffsets);
            }

            resolve();
        });
    });
};

