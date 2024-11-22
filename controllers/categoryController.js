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
    try {
        const { categoryID } = req.params;
        const category = await Category.findByPk(categoryID);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}

const updateCategory = async (req, res) => {
    try {
        const { categoryID } = req.params;
        const { categoryName } = req.body;
        const category = await Category.findByPk(categoryID);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.update({ categoryName });
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getCategories = async (req, res) => {
    try {
        const businessID = req.user.businessID;
        const categories = await Category.findAll({ where: { businessID } });

        if (!categories) {
            return res.status(404).json({ message: 'No categories found' });
        }

        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createCategory,
    deleteCategory,
    updateCategory,
    getCategories
}
    