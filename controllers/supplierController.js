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

const deleteSupplier = async (req, res) => {
    try {
        const { supplierID } = req.params;
        const businessID = req.user.businessID; 

        const removedSupplier = await Supplier.destroy({
            where: { supplierID, businessID }
        });

        if (!removedSupplier) {
            return res.status(404).json({
                message: "supplier not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Supplier removed successfully',
            removedSupplier
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateSupplier = async (req, res) => {
    try {
        const { supplierID } = req.params;
        const { supplierName, contactNo } = req.body;
        const businessID = req.user.businessID;
    
        const supplier = await Supplier.findOne({
            where: {supplierID, businessID }
        });
    
        if (!supplier) {
            return res.status(404).json({
                message: "supplier not found"
            });
        }

        const updatedSupplier = await supplier.update({
            supplierName,
            contactNo
        });

        return res.status(200).json({
            success: true,
            message: 'Supplier updated successfully',
            supplier: updatedSupplier
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

    const getSuppliers = async (req, res) => {
    try {
        const businessID = req.user.businessID;
        const suppliers = await Supplier.findAll({
            where: { businessID },
            attributes: ['supplierID', 'supplierName', 'contactNo'],
            order: [['supplierName', 'ASC']]
        }); 

        if (!suppliers) {
            return res.status(200).json({
                success: true,
                message: "No suppliers found",
                suppliers: []
            });
        }

        return res.status(200).json({
            success: true,
            suppliers
        });

    } catch (error) {   
        console.error('Error fetching suppliers:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
module.exports = {
    createSupplier,
    deleteSupplier,
    updateSupplier,
    getSuppliers
};