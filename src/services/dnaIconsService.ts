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
    '♟️': { archetype: 'Strategist', quote: "You're building foundations, not chasing hype." },
    '🚀': { archetype: 'Risk-Taker', quote: "Quick thinking — you spot moves before others." },
    '🌱': { archetype: 'Visionary', quote: "Curious minds master the markets." },
    '💪': { archetype: 'Confident', quote: "Ownership mindset — you lead your own path." },
    '🧭': { archetype: 'Explorer', quote: "Freedom fuels your focus — trade on your terms." },
    '🧘': { archetype: 'Emotional', quote: "Awareness is power — every trader starts here." },
    '🦉': { archetype: 'Patient', quote: "Holding your ground — classic discipline." },
    '📊': { archetype: 'Risk-Taker', quote: "Buying when others panic — a true contrarian spirit." },
    '🧠': { archetype: 'Composed', quote: "Composure over chaos — strong mental game." },
    '🏗️': { archetype: 'Builder', quote: "Steady progress builds lasting wealth." },
    '🎯': { archetype: 'Focused', quote: "Precision beats speed — you aim true." },
    '💎': { archetype: 'Disciplined', quote: "Patience pays — you wait for the right moment." }
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

const STORAGE_KEY = 'sabio_trader_dna_icons';

// Event listeners for DNA icon changes
const listeners: Set<() => void> = new Set();

export class DNAIconsService {
    // Store a DNA icon for a specific question
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

        // Get existing DNA icons
        const existingIcons = this.getDNAIcons();
        console.log('Existing icons:', existingIcons);
        
        // Replace icon for this question if it exists, otherwise add new one
        const filteredIcons = existingIcons.filter(item => item.questionId !== questionId);
        const updatedIcons = [...filteredIcons, dnaIconData];

        // Store in localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIcons));
        
        console.log(`Stored DNA icon for question ${questionId}:`, dnaIconData);
        console.log('Updated icons array:', updatedIcons);
        
        // Notify all listeners that DNA icons have changed
        listeners.forEach(listener => listener());
    }

    // Get all stored DNA icons
    static getDNAIcons(): DNAIconData[] {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error retrieving DNA icons:', error);
            return [];
        }
    }

    // Get DNA icons as simple array (for backward compatibility)
    static getDNAIconsArray(): string[] {
        return this.getDNAIcons().map(item => item.icon);
    }

    // Clear all DNA icons
    static clearDNAIcons(): void {
        localStorage.removeItem(STORAGE_KEY);
        console.log('Cleared all DNA icons');
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
