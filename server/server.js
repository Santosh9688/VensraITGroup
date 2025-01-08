// server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

// First, let's add startup diagnostics
console.log('Starting server with configuration:', {
    emailUser: process.env.EMAIL_USER ? 'Set' : 'Not set',
    emailPassword: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set',
    port: process.env.PORT,
    receivingEmail: process.env.RECEIVING_EMAIL
});

const app = express();

// Add request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - Received ${req.method} request to ${req.path}`);
    next();
});

// Configure CORS
app.use(cors());
app.use(express.json());

// Add a simple diagnostic endpoint
app.get('/diagnostics', (req, res) => {
    res.json({
        serverTime: new Date().toISOString(),
        environmentVariables: {
            emailConfigured: !!process.env.EMAIL_USER,
            portConfigured: !!process.env.PORT,
            receivingEmailConfigured: !!process.env.RECEIVING_EMAIL
        },
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage()
    });
});

// Create email transporter with verification
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    debug: true // Enable debug logging
});

// Verify email configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('Email configuration verified successfully');
    }
});

// Test email endpoint with detailed logging
app.get('/test-email', async (req, res) => {
    console.log('Test email endpoint accessed');
    try {
        console.log('Verifying email configuration...');
        await transporter.verify();
        console.log('Email configuration verified');

        console.log('Attempting to send test email...');
        const testMailResult = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVING_EMAIL,
            subject: 'VensraIT Server Test',
            text: 'This is a test email from your server.'
        });

        console.log('Test email sent successfully:', testMailResult.messageId);
        res.json({
            status: 'success',
            message: 'Test email sent successfully',
            details: {
                messageId: testMailResult.messageId,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Test email failed',
            error: {
                name: error.name,
                message: error.message,
                code: error.code
            }
        });
    }
});

// Start server with enhanced logging
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
=================================================
Server Status:
- Port: ${PORT}
- Email User: ${process.env.EMAIL_USER ? 'Configured' : 'Missing'}
- Receiving Email: ${process.env.RECEIVING_EMAIL ? 'Configured' : 'Missing'}
- Environment: ${process.env.NODE_ENV}
=================================================
    `);
});