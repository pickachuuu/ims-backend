const router = require('express').Router();
const { Business, User } = require('../models');
const { validatePassword } = require('../utils/passwordUtils');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { hashPassword } = require('../utils/passwordUtils');
const { Op } = require('sequelize');

const register = async (req, res) => {
    try{
        const {email, password, first_name, last_name} = req.body;
        const existingUser = await User.findOne({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'User with this email already exists'
            });
        }

        const newUser = await User.create({
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name
        })

        if (!newUser) {
            return res.status(400).json({
                message: 'Failed to create user'
            });
        }else{
            return res.status(201).json({
                message: 'User created successfully',
                user: newUser
            });
        }


    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ 
            where: { email },
            include: [{
                model: Business,
                as: 'business',
                attributes: ['businessName']
            }]
        });

        if (!user) {
            return res.status(404).json({ 
                message: 'No account found with this email' 
            });
        }

        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ 
                message: 'Incorrect password' 
            });
        }

        const token = jwt.sign(
            { 
                roleID: user.roleID,
                userID: user.userID,
                businessID: user.businessID || null,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const businessName = user.business ? user.business.businessName : null;

        res.status(200).json({
            message: 'Login successful',
            user: user.first_name,
            business: businessName,
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email with reset link
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        await transporter.sendMail({
            to: email,
            subject: 'Password Reset',
            html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
        });

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiration: { [Op.gt]: Date.now() },
            },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.password = await hashPassword(newPassword); // Hash the new password
        user.resetToken = null; // Clear the reset token
        user.resetTokenExpiration = null; // Clear the expiration
        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getProfile = async (req, res) => {
    try {
        console.log('User ID from request:', req.user.userID); // Debug log

        const user = await User.findOne({
            where: { userID: req.user.userID },
            include: [{
                model: Business,
                as: 'business',
                attributes: ['businessName', 'address', 'businessEmail', 'phone']
            }],
            attributes: ['first_name', 'last_name', 'email']
        });

        console.log('Found user:', user); // Debug log

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const response = {
            user: {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                business: user.business ? {
                    businessName: user.business.businessName,
                    address: user.business.address,
                    businessEmail: user.business.businessEmail,
                    phone: user.business.phone
                } : null
            }
        };

        console.log('Response being sent:', response); // Debug log
        res.status(200).json(response);
    } catch (error) {
        console.error('Detailed error in getProfile:', {
            message: error.message,
            stack: error.stack,
            user: req.user
        });
        res.status(500).json({ 
            message: 'Internal server error',
            details: error.message // Adding error details for debugging
        });
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    getProfile
};