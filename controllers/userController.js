const router = require('express').Router();
const { User } = require('../models');
const { validatePassword } = require('../utils/passwordUtils');
const jwt = require('jsonwebtoken');

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
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        const token = jwt.sign(
            { 
                name: user.last_name,
                roleID: user.roleID,
                userID: user.userID,
                businessID: user.businessID
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

module.exports = {
    register,
    login,
};