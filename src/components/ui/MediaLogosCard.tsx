import React from 'react';
import Brands from '../../assets/brands.png';

const MediaLogosCard: React.FC = () => {
    return (
        <div className='flex justify-center'>
            <img src={Brands} alt="Brands" />
        </div>
    );
};

export default MediaLogosCard;
