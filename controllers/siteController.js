const mongoose = require('mongoose')

const Category = require('../models/Category.model')
const News = require('../models/News.model')
const User = require('../models/User.model')
const Comment = require('../models/Comment.model')



const index = async (req, res) => {
    const news = await News.find()
        .populate('category', { 'name': 1, 'slug': 1 })
        .populate('author', 'fullname')
        .sort({ publishedAt: -1 })
        .lean()

    const categoryInUse = await News.distinct('category')
    const menus = await Category.find({ '_id': { $in: categoryInUse } }).select('name slug').lean();
    res.render('index', { news, menus })
}
const articleByCategory = async (req, res) => {
    const slug = req.params.name
    const category = await Category.findOne({ slug })
    if (!category) {
        return res.status(404).send('Category not found')
    }
    const news = await News.find({ category: category?._id })
        .populate('category', { 'name': 1, 'slug': 1 })
        .populate('author', 'fullname')
        .sort({ publishedAt: -1 })
        .lean()
    const categoryInUse = await News.distinct('category')
    const menus = await Category.find({ '_id': { $in: categoryInUse } }).select('name slug').lean();
    res.render('category', { news, menus, category })
}
const singleArticle = async (req, res) => {
    const singleNews = await News.findById(req.params.id)
        .populate('category', { 'name': 1, 'slug': 1 })
        .populate('author', 'fullname')
        .sort({ publishedAt: -1 })
        .lean()

    const categoryInUse = await News.distinct('category')
    const menus = await Category.find({ '_id': { $in: categoryInUse } }).select('name slug').lean();
    res.render('single', { singleNews, menus })
}
const search = async (req, res) => {
    const searchQuery = req.query.search
    const news = await News.find({
        $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { content: { $regex: searchQuery, $options: 'i' } }
        ]
    })
        .populate('category', { 'name': 1, 'slug': 1 })
        .populate('author', 'fullname')
        .sort({ publishedAt: -1 })
        .lean()

    const categoryInUse = await News.distinct('category')
    const menus = await Category.find({ '_id': { $in: categoryInUse } }).select('name slug').lean();
    res.render('search', { news, menus, searchQuery })
}
const author = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId).select('fullname');
    if (!user) {
        return res.status(404).send('User not found');
    }
    const authorName = user.fullname;
    const news = await News.find({ author: userId })
        .populate('category', { 'name': 1, 'slug': 1 })
        .populate('author', 'fullname')
        .sort({ publishedAt: -1 })
        .lean()

    const categoryInUse = await News.distinct('category')
    const menus = await Category.find({ '_id': { $in: categoryInUse } }).select('name slug').lean();
    // console.log('category:', category)
    console.log('News:', news)
    res.render('author', { news, menus, authorName })
}
const addComment = async (req, res) => { }



module.exports = {
    index,
    articleByCategory,
    singleArticle,
    search,
    author,
    addComment
}



