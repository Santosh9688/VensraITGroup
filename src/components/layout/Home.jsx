import React, { useEffect } from 'react';
import './Home.css';
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import banner3 from '../../assets/images/banner3.jpg';


const HeroSlider = () => {
    // Initialize carousel with proper settings when component mounts
    useEffect(() => {
        const carousel = document.getElementById('heroCarousel');
        new window.bootstrap.Carousel(carousel, {
            interval: 5000,  // 5 seconds between slides
            pause: false,    // This prevents pausing on hover
            ride: 'carousel',
            wrap: true      // Enables continuous looping
        });
    }, []);
    const sliderContent = [
        {
            image: banner1,
            subtitle: "Leading IT Solutions Provider",
            title: "Transforming Businesses Through Technology",
            description: "We deliver innovative IT solutions that drive growth and efficiency"
        },
        {
            image: banner2,
            subtitle: "Expert Technical Consulting",
            title: "Building Digital Success Stories",
            description: "Strategic IT consulting to help your business thrive in the digital age"
        },
        {
            image: banner3,
            subtitle: "Advanced Tech Solutions",
            title: "Empowering Your Digital Journey",
            description: "Cutting-edge technology solutions for modern business challenges"
        }
    ];

    return (
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-pause="false">
            {/* Carousel Indicators */}
            <div className="carousel-indicators">
                {sliderContent.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#heroCarousel"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            {/* Carousel Items */}
            <div className="carousel-inner">
                {sliderContent.map((slide, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="5000">
                        <div className="slider-image-container">
                            <img src={slide.image} className="d-block w-100" alt={slide.title} />
                            <div className="overlay"></div>
                        </div>
                        <div className="carousel-caption">
                            <h5 className="subtitle animate__animated animate__fadeInDown">{slide.subtitle}</h5>
                            <h1 className="title animate__animated animate__fadeInUp">{slide.title}</h1>
                            <p className="description animate__animated animate__fadeInUp">{slide.description}</p>
                            <button className="btn btn-primary animate__animated animate__fadeInUp">Learn More</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Carousel Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default HeroSlider;