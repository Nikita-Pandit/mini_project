const crypto = require('crypto'); // Import crypto module
const studentModel = require('../models/studentModel');
const resetPassword = require('../utils/resetPassword');

const forgotPasswordController = async (req, res) => {
    const { email } = req.body;
console.log(email)
    try {
        const user = await studentModel.findOne({ email });
        if (!user) {
            // Avoid exposing whether the email exists for security reasons
            return res.status(200).json({ message: 'If the email exists, a reset link will be sent.' });
        }

        // Generate a token and set expiration time
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = Date.now() + 3600000; // 1 hour validity

        // Save token and expiration in the user record
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpires;
        await user.save().catch(error => {
            console.error('Error saving user:', error);
            return res.status(500).json({ message: 'Failed to save reset token. Please try again later.' });
        });
        // Send the reset email
        const resetEmailSent = await resetPassword(email, resetToken, user.name);
        if (resetEmailSent) {
            res.status(200).json({ message: 'If the email exists, a reset link will be sent.' });
        } else {
            res.status(500).json({ message: 'Failed to send reset email. Please try again later.' });
        }
    } catch (err) {
        console.error('Error in forgotPasswordController:', err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { forgotPasswordController };
