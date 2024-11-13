const { Supplier } = require('../models');

const createSupplier = async (req, res) => {
    try{
        const { supplierName, contactNo } = req.body;
        const businessID = req.user.businessID;
        
        const supplier = await Supplier.create({
            supplierName,
            contactNo,
            businessID
        });

        if (!supplier) {
            return res.status(400).json({
                message: 'Failed to create supplier'
            });
        } else {
            return res.status(201).json({
                message: 'Supplier created successfully',
                supplier
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

const removeSupplier = async (req, res) => {

}

const updateSupplier = async (req, res) => {

}

module.exports = {
    createSupplier,
    removeSupplier,
    updateSupplier,
};