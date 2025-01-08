// src/components/layout/FooterForm.jsx
import React, { useState } from 'react';
import './Footer.css';
import { API_URL } from '../../config/api';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            // Show sending status
            setSubmitStatus({ message: 'Sending message...', isError: false });

            // Log the request details for debugging
            console.log('Sending request to:', `${API_URL}/api/contact`);
            console.log('Form data:', formData);

            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'omit',
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    message: formData.message.trim()
                })
            });
            // Log the response for debugging
            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Raw response:', responseText);

            // Then try to parse it as JSON
            let data;
            try {
                data = JSON.parse(responseText);
                console.log('Parsed response data:', data);
            } catch (error) {
                console.error('Failed to parse response:', error);
                throw new Error('Invalid server response');
            }
            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message');
            }

            // Clear form and show success
            setFormData({ name: '', email: '', phone: '', message: '' });
            setSubmitStatus({
                message: 'Thank you! Your message has been sent successfully.',
                isError: true
            });

        } catch (error) {
            console.error('Form submission error:', error);

            // Set a user-friendly error message
            setSubmitStatus({
                message: 'Unable to send message. Please try again later.',
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