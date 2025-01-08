// server.js - Complete updated version
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://vensraitgroup.com', 'https://vensraitgroup.netlify.app'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Origin'],
}));

// Important: Make sure body parsing is enabled
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
app.use(express.urlencoded({ extended: true }));

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Basic health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Test email endpoint
app.get('/test-email', async (req, res) => {
    try {
        console.log('Testing email configuration...');
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVING_EMAIL,
            subject: 'Test Email',
            text: 'This is a test email'
        });
        res.json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error('Test email error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'Server is running' });
});
// In server.js, add this route handler
app.get('/api/contact', (req, res) => {
    res.json({
        message: 'Contact API endpoint is working',
        endpoints: {
            post: '/api/contact - Submit contact form',
            get: '/api/contact - This health check endpoint'
        }
    });
});
// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    console.log('Received contact form data:', req.body);

    try {
        const { name, email, phone, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email sending logic here...
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVING_EMAIL,
            subject: 'New Contact Form Submission',
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment variables loaded:', {
        EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
        RECEIVING_EMAIL: process.env.RECEIVING_EMAIL ? 'Set' : 'Not set',
        PORT: PORT
    });
});