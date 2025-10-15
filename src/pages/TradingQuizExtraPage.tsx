import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BreakingNewsPng from '../assets/breaking_news.png';
import CleanFocused from '../assets/clean_and_focused.svg';
import ClearRoutine from '../assets/clear_routine.svg';
import DayTradingPng from '../assets/day_trading.png';
import DividendPng from '../assets/dividend.png';
import Exploring from '../assets/exploring.svg';
import FastMoves from '../assets/fast_moves.svg';
import IpoPng from '../assets/ipo.png';
import Logo from '../assets/logo.png';
import SteadyPng from '../assets/steady.png';
import { BackButton, ProgressIndicator } from '../components';
import IconOptionCard, { type IconOption } from '../components/ui/IconOptionCard';
import extraQuiz from '../data/extraQuiz.json';

interface ExtraQuestion {
    id: number;
    title: string;
    subtitle?: string;
    options: IconOption[];
}

// hydrate options with icons from assets for question 1 and trading terms icons for question 4
const mapExtraQuestions: ExtraQuestion[] = (extraQuiz as any).questions.map((q: any) => {
    if (q.id === 1) {
        const iconMap: Record<string, string> = {
            'clear_routine.svg': ClearRoutine,
            'fast_moves.svg': FastMoves,
            'clean_and_focused.svg': CleanFocused,
            'exploring.svg': Exploring,
        };
        return {
            ...q,
            options: q.options.map((o: any) => ({ label: o.label, icon: iconMap[o.icon] }))
        };
    }
    if (q.id === 4) {
        // Prefer PNG icons provided in assets if available (fallback to SVGs)
        return {
            ...q,
            options: [
                { label: 'Dividend income', icon: (DividendPng) as string },
                { label: 'Day trading', icon: (DayTradingPng) as string },
                { label: 'Steady portfolio growth', icon: (SteadyPng) as string },
                { label: 'IPO investing', icon: (IpoPng) as string},
                { label: 'Breaking news trading', icon: (BreakingNewsPng) as string }
            ]
        };
    }
    return q;
});

const TradingQuizExtraPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromProfile = location.state?.fromProfile || false;

    // If coming from profile, show only question 5 (index 4) - "How much time are you ready to spend to achieve your goal?"
    const [current, setCurrent] = useState(fromProfile ? 4 : 0);
    const [selected, setSelected] = useState<Record<number, string>>({});

    const total = 13;
    const questionOffset = 8;
    const question = mapExtraQuestions[fromProfile ? 4 : current];

    const handleSelect = (value: string) => {
        setSelected(prev => ({ ...prev, [question.id]: value }));
        setTimeout(() => {
            if (fromProfile) {
                // If from profile, navigate to scratch after answering
                navigate('/scratch');
            } else {
                // Normal flow
                if (current < mapExtraQuestions.length - 1) {
                    setCurrent(current + 1);
                } else {
                    navigate('/lead');
                }
            }
        }, 200);
    };

    return (
        <div className="min-h-screen text-white" style={{ background: 'var(--bg-gradient)' }}>
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                {/* Header */}
                <div className="flex flex-col items-center pt-8 pb-4 px-4">
                    <div className="flex justify-between w-full mb-3">
                        <BackButton onClick={() => navigate(-1)} />
                        <div className="flex items-center">
                            <img src={Logo} alt="SabioTrade" className="h-14" />
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="font-bold text-base" style={{ color: 'var(--color-primary)' }}>
                                {fromProfile ? 13 : current + 1 + questionOffset} /
                            </span>
                            <span className="font-bold text-base" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                {total}
                            </span>
                        </div>
                    </div>
                </div>

                <ProgressIndicator current={fromProfile ? 13 : current + 1 + questionOffset} total={total} />

                <div className="flex flex-col justify-center px-4 mb-1 mt-5">
                    <div className="text-center mb-6">
                        <h2 className="text-white text-2xl font-bold leading-tight">
                            {question.title}
                        </h2>
                        {question.subtitle && (
                            <p className="text-white/70 text-sm mt-2">{question.subtitle}</p>
                        )}
                    </div>

                    <IconOptionCard
                        options={question.options}
                        selected={selected[question.id] || null}
                        onSelect={handleSelect}
                    />
                </div>
            </div>
        </div>
    );
};

export default TradingQuizExtraPage;


