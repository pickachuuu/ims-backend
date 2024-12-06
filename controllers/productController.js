const { Product, Supplier } = require('../models');
const { Op } = require('sequelize')

const createProduct = async (req, res) => {
    try {
        const { productName, quantity, price, categoryID, supplierID } = req.body;
        const businessID = req.user.businessID;
        console.log(categoryID, supplierID);
        
        const newProduct = await Product.create({
            productName,
            quantity,
            price,
            businessID: businessID,
            categoryID: categoryID || null,
            supplierID: supplierID || null
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
        const { productID } = req.params;
        const businessID = req.user.businessID;
        const product = await Product.findOne({
            where: {
                productID,
                businessID
            }
        });

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        } else {
            await product.destroy();
            return res.status(200).json({
                message: 'Product deleted successfully'
            });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
}


const removeProducts = async (req, res) => {
    try {
        const { productIDs } = req.body; 
        const businessID = req.user.businessID;

        if (!Array.isArray(productIDs) || productIDs.length === 0) {
            return res.status(400).json({ message: 'No product IDs provided' });
        }

        const deletedCount = await Product.destroy({
            where: {
                productID: {
                    [Op.in]: productIDs
                },
                businessID: businessID 
            }
        });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'No products found to delete' });
        }

        return res.status(200).json({
            message: `${deletedCount} product(s) deleted successfully`
        });
    } catch (error) {
        console.error('Error deleting products:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productID } = req.params;
        const { productName, quantity, price, supplierID, categoryID } = req.body;
        const businessID = req.user.businessID;

        const product = await Product.findOne({
            where: { 
                productID,
                businessID 
            }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        const updatedProduct = await product.update({
            productName,
            quantity,
            price,
            supplierID,
            categoryID
        });

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: updatedProduct
        });


    } catch (error) {
        console.error('Update error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const businessID = req.user.businessID;
        const products = await Product.findAll({
            where: { businessID },
            attributes: ['productID', 'productName', 'quantity', 'price', 'supplierID', 'categoryID'],
        }); 

        if (!products) {
            return res.status(404).json({
                message: "No products found"
            });
        }

        return res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getLowStockProducts = async (req, res) => {
    try {
        const businessID = req.user.businessID;
        const products = await Product.findAll({
            where: { businessID, quantity: { [Op.lt]: 10 } },
            attributes: ['productID', 'productName', 'quantity', 'price']
        });

        return res.status(200).json({
            success: true,
            message: products.length === 0 ? "No low stock products found" : "Low stock products retrieved successfully",
            products,
            count: products.length
        });

    } catch (error) {
        console.error('Error fetching low stock products:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createProduct,
    removeProduct,
    removeProducts,
    updateProduct,
    getProducts,
    getLowStockProducts
};