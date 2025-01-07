// Footer.jsx
import React, { useState } from 'react';
import './Footer.css';
import { MapPin, Phone, Mail, ArrowUpCircle } from 'lucide-react';
import Logo from '../../assets/images/logo-c.png';
import FooterForm from './FooterForm';

const Footer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer">
            <div className="footer-content container">
                {/* Company Info Section */}
                <div className="footer-section company-info">
                    <img src={Logo} alt="VensraIT Logo" className="footer-logo" />
                    <div className="contact-info">
                        <div className="info-item">
                            <MapPin size={20} />
                            <p>785 Addison Ave, Suite 108, Rock Hill, South Carolina 29732</p>
                        </div>
                        <div className="info-item">
                            <Phone size={20} />
                            <div>
                                <p><a href="tel:+17048905098">(+1) (704) 890-5098</a></p>

                            </div>
                        </div>
                        <div className="info-item">
                            <Mail size={20} />
                            <p><a href="mailto:info@vensraitgroup.com">info@vensraitgroup.com</a></p>
                        </div>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="footer-section quick-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/career">Career</a></li>
                        <li><a href="/apply">Apply</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>

                {/* Contact Form Section */}
                <div className="footer-section contact-form">
                    <FooterForm />
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <div className="container">
                    <p>All rights reserved © 2025 VENSRAIT Group | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms & Conditions</a></p>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button className="scroll-top" onClick={scrollToTop}>
                <ArrowUpCircle size={32} />
            </button>
        </footer>
    );
};

export default Footer;