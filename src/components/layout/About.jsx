// About.jsx
import React, { useEffect, useRef } from 'react';
import './About.css';
import { PenSquare, Server, Code } from 'lucide-react';

const About = () => {
    // Create refs for both sections we want to animate
    const discoverRef = useRef(null);
    const servicesRef = useRef(null);  // Added for services section animation

    useEffect(() => {
        // Initialize timing variables to prevent animations on page load
        const pageLoadTime = Date.now();  // Record when the page loads
        const initialDelay = 500;  // Wait 500ms before allowing animations

        // Callback function for the Intersection Observer
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                // Only trigger animations when element comes into view AND we're past initial delay
                if (entry.isIntersecting && Date.now() - pageLoadTime > initialDelay) {
                    // Handle discover section animations
                    if (entry.target === discoverRef.current) {
                        const content = entry.target.querySelector('.discover-content');
                        const image = entry.target.querySelector('.discover-image');

                        // Animate content from left
                        if (content) {
                            content.classList.remove('hidden');
                            content.classList.add('animate-from-left');
                        }
                        // Animate image from right
                        if (image) {
                            image.classList.remove('hidden');
                            image.classList.add('animate-from-right');
                        }
                    }

                    // Handle services section animations
                    if (entry.target === servicesRef.current) {
                        const cards = entry.target.querySelectorAll('.service-card');
                        // Animate each card with a staggered delay
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('fade-in-up');
                            }, index * 200); // 200ms delay between each card
                        });
                    }
                }
            });
        };

        // Configure the Intersection Observer
        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.2,  // Trigger when 20% of element is visible
            rootMargin: '0px'  // No margin adjustment
        });

        // Start observing elements after initial delay
        setTimeout(() => {
            if (discoverRef.current) observer.observe(discoverRef.current);
            if (servicesRef.current) observer.observe(servicesRef.current);
        }, initialDelay);

        // Cleanup observer on component unmount
        return () => observer.disconnect();
    }, []); // Empty dependency array since we only want to run once

    return (
        <div className="about-container">
            {/* Service Cards Section */}
            <div className="services-grid" ref={servicesRef}>
                {/* Automation Card */}
                <div className="service-card automation">
                    <div className="service-icon">
                        <PenSquare size={24} />
                    </div>
                    <h3>Automation</h3>
                    <p>We are offering Automation solutions depending on the clients business models</p>
                    <div className="card-overlay"></div>
                </div>

                {/* DevOps Card */}
                <div className="service-card devops featured">
                    <div className="service-icon devops">
                        <Server size={24} />
                    </div>
                    <h3>DevOps</h3>
                    <p>We are experts in implementing Devops practices as a culture at our client's place</p>
                    <div className="card-overlay"></div>
                </div>

                {/* Application Development Card */}
                <div className="service-card development">
                    <div className="service-icon">
                        <Code size={24} />
                    </div>
                    <h3>Application Development</h3>
                    <p>Pioneered in areas of Application Development, Integration and Modernization</p>
                    <div className="card-overlay"></div>
                </div>
            </div>

            {/* Discover Section */}
            <div className="discover-section" ref={discoverRef}>
                <div className="discover-content hidden">
                    <h2>
                        Discover our
                        <span className="highlight">Consulting Services</span>
                        we'r provided
                    </h2>
                    <p>
                        Success is defined by the goals you set. Take our interactive
                        assessment to determine your campaign objectives and instantly
                        find out how Organically, an award winning digital marketing agency.
                    </p>
                    <button className="learn-more">Learn More</button>
                </div>
                <div className="discover-image hidden">
                    <img
                        src="/placeholder-automation.jpg"
                        alt="Digital Services"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;