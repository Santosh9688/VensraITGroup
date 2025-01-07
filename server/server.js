// server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Add this at the top of your server.js after the imports
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Create transporter with more secure settings
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // Only for development
    }
});

// Logging helper
const logError = (error, context) => {
    console.error('==== Error Details ====');
    console.error('Context:', context);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    console.error('====================');
};

// Contact form endpoint with enhanced error handling
app.post('/api/contact', async (req, res) => {
    console.log('Received form submission:', req.body);

    try {
        const { name, email, phone, message } = req.body;

        // Validate inputs
        if (!name || !email || !phone || !message) {
            throw new Error('Missing required fields');
        }

        // Prepare email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVING_EMAIL,
            subject: 'New Contact Form Submission - VensraIT',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Message:</strong> ${message}</p>
                </div>
            `
        };

        // Log attempt
        console.log('Attempting to send email:', {
            to: process.env.RECEIVING_EMAIL,
            from: process.env.EMAIL_USER
        });

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);

        res.status(200).json({
            success: true,
            message: 'Thank you! Your message has been sent successfully.'
        });

    } catch (error) {
        logError(error, 'Email sending failed');

        res.status(500).json({
            success: false,
            message: 'Error sending message. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Test routes
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/api/contact', (req, res) => {
    res.send('Contact API is working');
});

// Verify email configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log('=================================');
    console.log(`Server is running on port ${PORT}`);
    console.log(`Test the server: http://localhost:${PORT}`);
    console.log(`Test the API: http://localhost:${PORT}/api/contact`);
    console.log('=================================');
});

server.on('error', (error) => {
    console.error('Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try a different port or close the application using this port.`);
    }
});