const mongoose = require('mongoose')

const Category = require('../models/Category.model')
const News = require('../models/News.model')
const User = require('../models/User.model')
const Comment = require('../models/Comment.model')



const index = async (req, res) => {
    const news = await News.find()
        .populate('category', {'name':1, 'slug':1})
        .populate('author', 'fullname')
        .sort({ publishedAt: -1 })
        .lean()
    res.render('index', {news})
}
const articleByCategory = async (req, res) => {
    res.render('category')
}
const singleArticle = async (req, res) => {
    res.render('single')
}
const search = async (req, res) => {
    res.render('search')
}
const author = async (req, res) => {
    res.render('author')
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



