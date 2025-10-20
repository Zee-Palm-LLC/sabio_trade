import React from 'react';
import BottomShadeImg from '../../assets/bottom_shade.png';

const BottomShade: React.FC = () => {
    return (
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 block md:hidden">
            <img src={BottomShadeImg} alt="" className="w-full h-auto object-cover" />
        </div>
    );
};

export default BottomShade;

