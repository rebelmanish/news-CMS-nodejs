const mongoose = require('mongoose')

const Category = require('../models/Category.model')

const categories = async (req, res) => {
    const categories = await Category.find().lean()
    res.render('admin/categories', { user: req.user, categories })
 }
const createCategoryPage = async (req, res) => {
    res.render('admin/categories/create', { user: req.user })
 }
const createCategory = async (req, res) => {
    const { cat, description } = req.body
    try {
        await Category.create({
            name: cat,
            description: description
        })
        res.redirect('/admin/categories')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
        res.redirect('/admin/categories')
    }
 }
const updateCategoryPage = async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findById(id).lean()
        if (!category) {
            return res.status(404).send('Category not found')
        }
        res.render('admin/categories/update', { user: req.user, category })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
 }
const updateCategory = async (req, res) => {
    const { id } = req.params
    const { cat, description } = req.body
    try {
        const category = await Category.findByIdAndUpdate(id, {
            name: cat,
            description: description
        })
        if (!category) {
            return res.status(404).send('Category not found')
        }
        res.redirect('/admin/categories')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
 }
const deleteCategory = async (req, res) => {
    const { id } = req.params
    console.log(`Try to delete ${id}` )
    try {
        const result = await Category.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
        res.status(200).json({ message: 'Category deleted successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to delete category' })
    }
 }






module.exports = {
    categories,
    createCategoryPage,
    createCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
}
