import React, { useState, useEffect } from 'react';  // Added useEffect for scroll handling
import logo from '../../assets/images/logo.png';
import './Header.css';

const Header = () => {
    // State for mobile menu and scroll position
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Add scroll effect handler
    useEffect(() => {
        // Function to handle scroll events
        const handleScroll = () => {
            // Check if page is scrolled more than 50px
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Add scroll event listener when component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this runs once on mount

    // Navigation items array for easy maintenance
    const navigationItems = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <header className={`header-container ${isScrolled ? 'header-scrolled' : ''}`}>
            <nav className={`navbar navbar-expand-lg ${isScrolled ? 'navbar-scrolled' : ''}`}>
                <div className="container">
                    {/* Logo Section */}
                    <a className="navbar-brand" href="/">
                        <img
                            src={logo}
                            alt="Vensrait Group"
                            className="logo"
                        />
                    </a>

                    {/* Mobile Toggle Button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navigation Links */}
                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav ms-auto">
                            {navigationItems.map((item, index) => (
                                <li key={index} className="nav-item">
                                    <a
                                        className="nav-link"
                                        href={item.path}
                                        onClick={() => setIsOpen(false)} // Close mobile menu when link is clicked
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;