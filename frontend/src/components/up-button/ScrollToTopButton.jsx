import React, { useState } from 'react';
import './scroll-to-top-button.css';
import { RiArrowUpCircleFill } from 'react-icons/ri';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        setIsVisible(scrollTop > 100);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        setIsVisible(true);
    }, []);

    return (
        <button
            className={`scroll-to-top up-button ${isVisible ? 'opacity-100' : 'opacity-0'} `}
            onClick={scrollToTop}
        >
            <RiArrowUpCircleFill />
        </button>
    );
};

export default ScrollToTopButton;
