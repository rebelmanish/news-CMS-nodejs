const mongoose = require('mongoose')

const Category = require('../models/Category.model')
const News = require('../models/News.model')
const User = require('../models/User.model')
const Comment = require('../models/Comment.model')



const index = async (req, res) => {
    res.render('index')
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



