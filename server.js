const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter Setup
// IMPORTANT: You need to replace 'your_email_password' with an App Password from your Google Account
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'csarts3537@gmail.com',
        pass: 'your_email_app_password_here' // Provide an app password, not your normal password
    }
});

// Universal Email Route for all forms
app.post('/api/send-email', async (req, res) => {
    try {
        const formData = req.body;
        
        // Format the incoming form data into a readable email string
        let emailText = 'You have received a new submission from your website:\n\n';
        for (const [key, value] of Object.entries(formData)) {
            emailText += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
        }

        const mailOptions = {
            from: 'csarts3537@gmail.com',
            to: 'csarts3537@gmail.com', // Sending to yourself
            subject: `New Website Form Submission - BIeasy`,
            text: emailText
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`BIeasy custom backend is running on http://localhost:${PORT}`);
    console.log(`To use this backend, update your HTML form 'action' attributes to http://localhost:${PORT}/api/send-email`);
});
