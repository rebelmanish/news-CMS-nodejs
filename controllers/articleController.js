const mongoose = require('mongoose')

const News = require('../models/News.model')

const articles = async (req, res) => {
    res.render('admin/articles', { user: req.user })
 }
const createArticlePage = async (req, res) => {
    res.render('admin/articles/create', { user: req.user })
 }
const createArticle = async (req, res) => { }
const updateArticlePage = async (req, res) => {
    res.render('admin/articles/update', { user: req.user })
 }
const updateArticle = async (req, res) => { }
const deleteArticle = async (req, res) => { }


module.exports = {
    articles,
    createArticle,
    createArticlePage,
    updateArticlePage,
    updateArticle,
    deleteArticle
}

