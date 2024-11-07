const router = require('express').Router();
const { User } = require('../models');

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

const login = (req, res) => {
};

module.exports = {
    register,
    login,
};