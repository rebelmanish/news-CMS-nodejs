const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path');

const News = require('../models/News.model')
const Category = require('../models/Category.model')
const User = require('../models/User.model');

const articles = async (req, res) => {
    try {
        let articles
        if (req.user.role == 'administrator') {
            articles = await News.find()
            .populate('category', 'name')
            .populate('author', 'username')
            .lean()
        }else {
            articles = await News.find({ author: req.user.id })
            .populate('category', 'name')
            .populate('author', 'username')
            .lean()
        }
        

        // console.log('articles: ', articles)
        res.render('admin/articles', { user: req.user, articles })
    } catch (error) {
        console.log(error)
        res.status(500).send('error', { message: 'Unable to fetch articles' })
    }
 }
const createArticlePage = async (req, res) => {
    const categories= await Category.find().lean()
    // console.log(categories)
    res.render('admin/articles/create', { user: req.user, categories })
 }
const createArticle = async (req, res) => {
    const {title, content, category} = req.body

    
    try {
        // Validate the author and category ObjectIds
        // console.log("UserId",await req.user.id)
        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.status(400).json({ error: 'Invalid author ID format' });
        }
        
        console.log('Category: ', category)

        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ error: 'Invalid category ID format' });
        }

         // Create the article with valid ObjectIds
        const article = await News.create({
            title,
            content,
            img: req.file ? req.file.filename : null,
            author:  req.user.id,
            category:  category,
        })
        
        res.redirect('/admin/articles')
    } catch (error) {
        console.log(error)
        res.redirect('/admin/createArticle')
    }
 }
const updateArticlePage = async (req, res) => {
    const { id } = req.params
    try {
        const article = await News.findById(id)
        .populate('category', 'name')
        .populate('author', 'username')
        .lean()
        
        if(!article){
            return res.status(404).send('error', { message: 'Article not found' })
        }

        if(req.user.role == 'author' ){
            if(req.user.id != article.author._id){
            return res.status(401).send('Unauthorized')
            }
        }

        const categories= await Category.find().lean()
        res.render('admin/articles/update', { user: req.user, article, categories })
    } catch (error) {
        console.log(error)
        res.status(500).send('error', { message: 'Unable to fetch article' })
    }
 }
const updateArticle = async (req, res) => {
    const id = req.params.id
    try {
        const {title, content, category} = req.body
        const article = await News.findById(id);
        if (!article) {
            return res.status(404).send('error', { message: 'Article not found' })
        }
        if(req.user.role == 'author' ){
            if(req.user.id != article.author._id){
            return res.status(401).send('Unauthorized')
            }
        }
        article.title = title;
        article.content = content;
        article.category = category;
        if (req.file) {
            // Delete the old image file if it exists
            if (article.img) {
                const oldImagePath = path.join(
                    __dirname,
                    '../public/uploads/',
                    article.img
                );
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            article.img = req.file.filename;
        }
        await article.save();
        res.redirect('/admin/articles');
    } catch (error) {
        console.log(error)
        res.status(500).send('error', { message: 'Unable to update article' })
    }
 }
const deleteArticle = async (req, res) => {
    const { id } = req.params
    try {
        const news = await News.findById(id)
        if(!news){
            return res.status(404).json({ success: false, message: 'Article not found' });
        }
        if(req.user.role == 'author' ){
            if(req.user.id != news.author._id){
            return res.status(401).send('Unauthorized')
            }
        }

        if (news.img) {
            const imagePath = path.join(
                __dirname,
                '../public/uploads/',
                news.img
            );

            console.log('ImgPath: ', imagePath);
            console.log('newsImg: ', news.img);


            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        //  Delete article from DB
        await News.findByIdAndDelete(id);

        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.status(500).send('error', { message: 'Unable to delete article' })
    }
 }


module.exports = {
    articles,
    createArticle,
    createArticlePage,
    updateArticlePage,
    updateArticle,
    deleteArticle
}

