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

const editBusiness = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const { businessName, address } = req.body;
        const businessID = req.user.businessID;

        if (!businessID) {
            return res.status(400).json({
                success: false,
                message: 'No business associated with this user'
            });
        }

        await Business.update(
            { businessName, address },
            { where: { businessID } }
        );

        const updatedBusiness = await Business.findByPk(businessID);

        res.status(200).json({
            success: true,
            message: 'Business updated successfully',
            business: updatedBusiness
        });

    } catch (error) {
        console.error('Edit business error:', error);
        res.status(400).json({
            success: false,
            message: 'Failed to edit business',
            error: error.message
        });
    }
};

const getBusinessProfile = async (req, res) => {
    try{
        const businessID = req.user.businessID;
        if (!businessID) {
            return res.status(404).json({
                sucess: false,
                message: 'Business profile not found'
            });
        }

        const business = await Business.findByPk(businessID);

        res.status(200).json({
            sucess: true,
            message: 'Business profile sucessfuly retrieved',
            businessData: business
        })
    } catch (error){
        console.error('Edit business error:', error);
        res.status(400).json({
            success: false,
            message: 'Failed to retrieve business',
            error: error.message
        });

    }
}

module.exports = {
    createBusiness,
    editBusiness,
    getBusinessProfile
};