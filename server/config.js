// server/config.js
const config = {
    development: {
        port: 5000,
        corsOrigin: 'http://localhost:3000',
        emailUser: process.env.EMAIL_USER,
        emailPassword: process.env.EMAIL_PASSWORD,
        receivingEmail: process.env.RECEIVING_EMAIL
    },
    production: {
        port: process.env.PORT,
        // Allow both your domain and Render's domain
        corsOrigin: [
            'https://vensraitgroup.com',
            'https://www.vensraitgroup.com',
            process.env.FRONTEND_URL, // We'll set this in Render's environment variables
            'http://localhost:3000'   // For testing
        ].filter(Boolean), // Remove any undefined values
        emailUser: process.env.EMAIL_USER,
        emailPassword: process.env.EMAIL_PASSWORD,
        receivingEmail: process.env.RECEIVING_EMAIL
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];