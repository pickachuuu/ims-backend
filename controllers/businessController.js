const { Business, User } = require('../models');
const jwt = require('jsonwebtoken');

const createBusiness = async (req, res) => {
    try {
        if (req.user.businessID) {
            return res.status(400).json({
                success: false,
                message: 'User already has a business setup'
            });
        }

        const { businessName, address, businessEmail, phone } = req.body;
        const userId = req.user.userID;

        const business = await Business.create({
            businessName,
            address,
            businessEmail,
            phone
        });

        await User.update(
            { businessID: business.businessID },
            { where: { userID: userId } }
        );

        const updatedUser = await User.findByPk(userId);
        
        const newToken = jwt.sign(
            { 
                userID: updatedUser.userID,
                email: updatedUser.email,
                businessID: business.businessID,
                roleID: updatedUser.roleID
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            success: true,
            message: 'Business created successfully',
            token: newToken,
            business
        });

    } catch (error) {
        console.error('Create business error:', error);
        res.status(400).json({
            success: false,
            message: 'Failed to create business',
            error: error.message
        });
    }
};

module.exports = {
    createBusiness
};