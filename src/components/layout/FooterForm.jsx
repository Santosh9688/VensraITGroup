// src/components/layout/FooterForm.jsx
import React, { useState } from 'react';
import './Footer.css';
import API_URL from '../../config/api';

const FooterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState({
        message: '',
        isError: false
    });

    // Validation functions
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Phone validation
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // In your handleSubmit function in FooterForm.jsx, update the try-catch block:
    // FooterForm.jsx
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setSubmitStatus({ message: 'Sending...', isError: false });

            // Updated health check URL
            try {
                const testResponse = await fetch(`${API_URL}/health`);
                if (!testResponse.ok) {
                    throw new Error('Server health check failed');
                }
            } catch (error) {
                console.error('Server connection test failed:', error);
                setSubmitStatus({
                    message: 'Cannot connect to server. Please try again later.',
                    isError: true
                });
                return;
            }

            // Updated API endpoint URL
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server responded with status ${response.status}`);
            }

            const data = await response.json();

            setSubmitStatus({ message: 'Message sent successfully!', isError: false });
            setFormData({ name: '', email: '', phone: '', message: '' });

        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus({
                message: 'Failed to send message. Please try again later.',
                isError: true
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    placeholder="Name:"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-row">
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email:"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone:"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
            </div>

            <div className="form-group">
                <textarea
                    name="message"
                    placeholder="Message:"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-btn">
                Send
            </button>

            {submitStatus.message && (
                <div className={`submit-status ${submitStatus.isError ? 'error' : 'success'}`}>
                    {submitStatus.message}
                </div>
            )}
        </form>
    );
};

export default FooterForm;