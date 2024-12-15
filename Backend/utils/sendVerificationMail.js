const nodemailer = require('nodemailer');

const sendVerificationMail = async (email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "22054434@kiit.ac.in",
                pass: "zosiskobclzcehru",
            },
        });

        const mailOptions = {
            from: "22054434@kiit.ac.in",
            to: email,
            subject: 'Email Verification',
            html: `
                <h1>Email Verification</h1>
                <p>Please verify your email by clicking the link below:</p>
                <a href="http://localhost:20000/verify?token=${token}">Verify Email</a>
            `,
        };
        

        const info = await transporter.sendMail(mailOptions);
        console.log(info)
        console.log('Verification email sent:', info.response);
        return true;

    } 
    
    catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = sendVerificationMail;
