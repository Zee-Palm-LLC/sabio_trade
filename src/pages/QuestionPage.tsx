import React from "react";
import Logo from '../assets/logo.png';

const QuestionPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" className=" h-14" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionPage;