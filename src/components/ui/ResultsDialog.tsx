import React from 'react';
import ArrowRight from '../../assets/arrow-right.svg';
import profileImage from '../../assets/profile.png';
import QuoteIcon from '../../assets/quote.svg';

interface ResultsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    className?: string;
}

const ResultsDialog: React.FC<ResultsDialogProps> = ({ isOpen, onClose, onNext, className = '' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] max-w-sm w-full ${className}`}>
                <div className="flex items-center justify-between p-6 pb-4">
                    <h2 className="text-white text-[16px] font-normal">Analyzing your answers...</h2>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="bg-[#031340] rounded-[12px] p-4 mb-6 border border-slate-600/30 mx-6">
                    <div className="flex justify-center">
                        <img src={QuoteIcon} alt="Quote" className="w-10 h-10 mb-0" />
                    </div>
                    <p className="text-white font-semibold text-[17px] leading-relaxed mb-2">
                        <span className="block text-center">
                            "In trading, it's not about being right, it's about making money."
                        </span>
                    </p>
                    <div className="flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="object-cover w-8 h-8 rounded-full"
                            />
                        </div>
                        <span className="text-white text-sm">Marty Schwartz</span>
                    </div>
                </div>

                {/* Next Button */}
                <div className="px-6 pb-6">
                    <button
                        onClick={onNext}
                        className="w-full text-white font-semibold py-4 px-6 transition-colors duration-200 flex items-center justify-center"
                        style={{
                            borderRadius: 108,
                            background: 'linear-gradient(135deg, #0FB084 0%, #2FA6B9 100%)',
                            paddingTop: 12,
                            paddingBottom: 12,
                        }}
                    >
                        <span className="mr-2">Next</span>
                        <img src={ArrowRight} alt="Arrow Right" className="w-5 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultsDialog;
