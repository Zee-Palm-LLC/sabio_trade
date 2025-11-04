// DNA Icons Service - Centralized state management for trader DNA icons

export interface DNAIconData {
    icon: string;
    archetype: string;
    quote: string;
    questionId: number;
    questionText: string;
}

// Complete mapping of all possible icons with their archetype and quote
export const DNA_ICON_MAPPING: Record<string, { archetype: string; quote: string }> = {
    '🌱': { archetype: 'The Visionary', quote: 'Big dreams start small — your growth curve is rising.' },
    '♟️': { archetype: 'The Strategist', quote: 'Thinking two moves ahead — that’s how winners trade.' },
    '🚀': { archetype: 'The Risk-Taker', quote: 'Bold call — fortune favors your fearless momentum.' },
    '📊': { archetype: 'The Analyst', quote: 'Data drives your instinct — smart, methodical, precise.' },
    '🧘': { archetype: 'The Patient', quote: 'Calm under pressure — your discipline builds profits.' },
    '🪄': { archetype: 'The Resilient', quote: 'You learn, adapt, and bounce back stronger each time.' },
    '💪': { archetype: 'The Confident', quote: 'Decisive move — self-belief turns logic into results.' },
    '🧭': { archetype: 'The Explorer', quote: 'Curious and adaptive — you thrive in new directions.' },
    '🤝': { archetype: 'The Community', quote: 'Collaboration fuels success — strong traders grow together.' },
    '💡': { archetype: 'The Innovator', quote: 'Original thinking — you spot opportunities others miss.' },
    '🦉': { archetype: 'The Wise Mentor', quote: 'Your experience guides you — insight few can match.' },
    '🧠': { archetype: 'The Thinker', quote: 'Sharp mind — you process markets faster than most.' },
    '🏗️': { archetype: 'The Builder', quote: 'Solid foundations — you’re constructing lasting financial strength.' },
    '🎯': { archetype: 'The Achiever', quote: 'Focused and driven — you hit your goals with precision.' },
    '💎': { archetype: 'The High Roller', quote: 'High stakes, high confidence — your boldness defines your edge.' }
};


// Question mappings for each quiz page
export const QUESTION_ICON_MAPPINGS = {
    // QuestionPage.tsx - Question ID 3
    questionPage: {
        3: {
            'Build long-term wealth': '♟️',
            'Generate short-term income': '🚀',
            'Learn & challenge myself': '🌱',
            'Be my own boss': '💪',
            'Being able to work from anywhere': '🧭'
        }
    },
    // AdvanceQuestionPage.tsx - Question ID 5
    advanceQuestionPage: {
        5: {
            'Sell everything': '🧘',
            'Hold and wait': '🦉',
            'Buy more (opportunity!)': '📊',
            'Optimize based on my strategy': '🧠'
        }
    },
    // TradingQuizExtraPage.tsx - Question ID 2
    tradingQuizExtraPage: {
        2: {
            '$30,000 - $50,000': '🏗️',
            '$50,000 - $100,000': '🎯',
            'More than $100,000': '💎'
        }
    }
};

// In-memory storage for DNA icons (for UI display during quiz)
// Note: DNA icons are also stored in Firestore with answers via quizDataService
let dnaIconsStorage: DNAIconData[] = [];

// Event listeners for DNA icon changes
const listeners: Set<() => void> = new Set();

export class DNAIconsService {
    // Store a DNA icon for a specific question (in-memory only for UI)
    static storeDNAIcon(questionId: number, questionText: string, selectedAnswer: string, source: 'questionPage' | 'advanceQuestionPage' | 'tradingQuizExtraPage'): void {
        console.log('DNAIconsService.storeDNAIcon called with:', { questionId, questionText, selectedAnswer, source });

        const mapping = QUESTION_ICON_MAPPINGS[source][questionId as keyof typeof QUESTION_ICON_MAPPINGS[typeof source]];
        console.log('Found mapping:', mapping);
        if (!mapping) {
            console.log('No mapping found for question ID:', questionId);
            return;
        }

        const icon = mapping[selectedAnswer as keyof typeof mapping];
        console.log('Found icon:', icon);
        if (!icon) {
            console.log('No icon found for answer:', selectedAnswer);
            return;
        }

        const iconData = DNA_ICON_MAPPING[icon];
        console.log('Found icon data:', iconData);
        if (!iconData) {
            console.log('No icon data found for icon:', icon);
            return;
        }

        const dnaIconData: DNAIconData = {
            icon,
            archetype: iconData.archetype,
            quote: iconData.quote,
            questionId,
            questionText
        };

        // Replace icon for this question if it exists, otherwise add new one
        const filteredIcons = dnaIconsStorage.filter(item => item.questionId !== questionId);
        dnaIconsStorage = [...filteredIcons, dnaIconData];
        
        console.log(`Stored DNA icon for question ${questionId}:`, dnaIconData);
        console.log('Updated icons array:', dnaIconsStorage);
        
        // Notify all listeners that DNA icons have changed
        listeners.forEach(listener => listener());
    }

    // Get all stored DNA icons (from in-memory storage)
    static getDNAIcons(): DNAIconData[] {
        return [...dnaIconsStorage];
    }

    // Get DNA icons as simple array (for backward compatibility)
    static getDNAIconsArray(): string[] {
        return this.getDNAIcons().map(item => item.icon);
    }

    // Clear all DNA icons
    static clearDNAIcons(): void {
        dnaIconsStorage = [];
        console.log('Cleared all DNA icons');
        
        // Notify all listeners
        listeners.forEach(listener => listener());
    }

    // Get DNA icons for specific questions
    static getDNAIconsForQuestions(questionIds: number[]): DNAIconData[] {
        return this.getDNAIcons().filter(item => questionIds.includes(item.questionId));
    }

    // Debug method to log current state
    static debugDNAIcons(): void {
        const icons = this.getDNAIcons();
        console.log('Current DNA Icons:', icons);
        console.log('DNA Icons Array:', this.getDNAIconsArray());
    }

    // Subscribe to DNA icon changes
    static subscribeToChanges(callback: () => void): () => void {
        listeners.add(callback);
        console.log('Subscribed to DNA icon changes. Total listeners:', listeners.size);

        // Return unsubscribe function
        return () => {
            listeners.delete(callback);
            console.log('Unsubscribed from DNA icon changes. Total listeners:', listeners.size);
        };
    }
}
