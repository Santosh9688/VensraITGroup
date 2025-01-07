// Clients.jsx
import React, { useEffect, useRef } from 'react';
import './Clients.css';
// Import all client logos
import Client1 from '../../assets/images/1.png';
import Client2 from '../../assets/images/2.png';
import Client3 from '../../assets/images/3.png';
import Client4 from '../../assets/images/4.png';
import Client5 from '../../assets/images/5.png';
import Client6 from '../../assets/images/6.png';
import Client7 from '../../assets/images/7.png';
import Client8 from '../../assets/images/8.png';

const Clients = () => {
    // Reference to control animation pause on hover
    const sliderRef = useRef(null);
    const sliderRef2 = useRef(null);

    // All client logos with their names
    const clients = [
        { img: Client1, name: 'Oracle' },
        { img: Client2, name: 'Cisco' },
        { img: Client3, name: 'HP' },
        { img: Client4, name: 'IBM' },
        { img: Client5, name: 'Microsoft' },
        { img: Client6, name: 'SAP' },
        { img: Client7, name: 'Google' },
        { img: Client8, name: 'Amazon' },
    ];

    // Effect to handle animation pause on hover
    useEffect(() => {
        const pauseAnimation = () => {
            if (sliderRef.current) sliderRef.current.style.animationPlayState = 'paused';
            if (sliderRef2.current) sliderRef2.current.style.animationPlayState = 'paused';
        };

        const resumeAnimation = () => {
            if (sliderRef.current) sliderRef.current.style.animationPlayState = 'running';
            if (sliderRef2.current) sliderRef2.current.style.animationPlayState = 'running';
        };

        const slider1 = sliderRef.current;
        const slider2 = sliderRef2.current;

        if (slider1 && slider2) {
            slider1.addEventListener('mouseenter', pauseAnimation);
            slider1.addEventListener('mouseleave', resumeAnimation);
            slider2.addEventListener('mouseenter', pauseAnimation);
            slider2.addEventListener('mouseleave', resumeAnimation);
        }

        return () => {
            if (slider1 && slider2) {
                slider1.removeEventListener('mouseenter', pauseAnimation);
                slider1.removeEventListener('mouseleave', resumeAnimation);
                slider2.removeEventListener('mouseenter', pauseAnimation);
                slider2.removeEventListener('mouseleave', resumeAnimation);
            }
        };
    }, []);

    return (
        <div className="clients-container">
            <div className="clients-header">
                <h2>Our <span className="highlight">Clients</span></h2>
                <p>We offer solutions and resources to our clients</p>
            </div>

            <div className="slider-container">
                {/* First slider */}
                <div className="logos-slider" ref={sliderRef}>
                    {clients.map((client, index) => (
                        <div className="logo-item" key={`slider1-${index}`}>
                            <img
                                src={client.img}
                                alt={client.name}
                                className="client-logo"
                            />
                        </div>
                    ))}
                </div>

                {/* Duplicate slider for seamless loop */}
                <div className="logos-slider" ref={sliderRef2}>
                    {clients.map((client, index) => (
                        <div className="logo-item" key={`slider2-${index}`}>
                            <img
                                src={client.img}
                                alt={client.name}
                                className="client-logo"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Clients;