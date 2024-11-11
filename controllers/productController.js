const { Product } = require('../models');

const createProduct = async (req, res) => {
    try {
        const { productName, quantity, price } = req.body;
        const businessID = req.user.businessID;
        
        const newProduct = await Product.create({
            productName,
            quantity,
            price,
            businessID: businessID
        });

        console.log(newProduct);

        if (!newProduct) {
            return res.status(400).json({
                message: 'Failed to create product'
            });
        }else{
            return res.status(201).json({
                message: 'Product created successfully',
                product: newProduct
            });
        }
        
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const removeProduct = async (req, res) => {
    try {
        
    } catch (error) {

    }
}

const updateProduct = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    createProduct,
    updateProduct,
};