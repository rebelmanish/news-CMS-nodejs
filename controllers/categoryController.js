const mongoose = require('mongoose')

const Category = require('../models/Category.model')

const categories = async (req, res) => {
    res.render('admin/categories')
 }
const createCategoryPage = async (req, res) => {
    res.render('admin/categories/create')
 }
const createCategory = async (req, res) => {
    
 }
const updateCategoryPage = async (req, res) => {
    res.render('admin/categories/update')
 }
const updateCategory = async (req, res) => { }
const deleteCategory = async (req, res) => { }






module.exports = {
    categories,
    createCategoryPage,
    createCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
}
