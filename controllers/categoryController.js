const { Category } = require('../models');

const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const businessID = req.user.businessID;
        const category = await Category.create({ categoryName, businessID });

        if (!category) {
            return res.status(400).json({ message: 'Category creation failed' });
        }

        res.status(201).json({ message: 'Category created successfully', category });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteCategory = async (req, res) => {

}

const updateCategory = async (req, res) => {

}

const getCategories = async (req, res) => {

}

module.exports = {
    createCategory,
    deleteCategory,
    updateCategory,
    getCategories
}
    