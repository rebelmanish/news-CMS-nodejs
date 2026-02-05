
const mongoose = require('mongoose')
const User = require('../models/User.model')
const News = require('../models/News.model')
const Settings = require('../models/Setting.model')
const Category = require('../models/Category.model')
const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const loginPage = async (req, res) => {
    res.render('admin/login',{
        layout: false
    })
 }

const adminLogin = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })

        
        if (! user ) {
            return res.status(401).send('Invalid username or password')  
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (! isMatch ) {
            return res.status(400).send('Invalid username or password')  
        }

        const jwtData = { id: user._id, role: user.role, username: user.username, fname: user.fullname }
        const token = jwt.sign( jwtData, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 }) // 1 hour
        res.redirect('/admin/dashboard')
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
 }

const logout = async (req, res) => {
    res.clearCookie('token')
    res.redirect('/admin/login')
 }

const users = async (req, res) => {
    const users = await User.find()
    res.render('admin/users', { users, user: req.user })
    // console.log(users)
 }
const createUserPage = async (req, res) => {
    res.render('admin/users/create.ejs', { user: req.user})
 }
const user = async (req, res) => { }
const updateUserPage = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.render('admin/users/update', { user,  user: req.user })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
        res.redirect('/admin/users')
    }
 }
const createUser = async (req, res) => {
    await User.create(req.body)
    res.redirect('/admin/users')
 } 
const updateUser = async (req, res) => {
    const id = req.params.id
    const { fullname, password, role } = req.body
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        user.fullname = fullname || user.fullname
        if (password && password.trim() !== '') {
            user.password = password
        }

        user.role = role || user.role
        await user.save()
        res.redirect('/admin/users')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')    
        res.redirect('/admin/users')
    }
 }
const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.json({ success: true })
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
        res.redirect('/admin/users')
    }
 }

const dashboard = async (req, res) => {
    try {
        let articleCount

        if (req.user.role == 'administrator') {
            articleCount = await News.countDocuments();
        }else{
            articleCount = await News.countDocuments({author: req.user.id});
        }

        const userCount = await User.countDocuments();
        const categoryCount = await Category.countDocuments();
        
        res.render('admin/dashboard', { 
            user: req.user,
            articleCount,
            userCount, 
            categoryCount
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to load dashboard');
    }
 }

 const settings = async (req, res) => {
    try {
        const settings = await Settings.findOne().lean()
        res.render('admin/setting', { user: req.user , settings})
    } catch (error) {
        console.log(error)
        res.status(500).send('Failed to load settings page')
    }
 }
const saveSettings = async (req, res) => {
    const { web_title, footer_description } = req.body;
    const newLogo = req.file ? req.file.filename : null;

    try {
        const existingSettings = await Settings.findOne({});

        // If a new logo is uploaded and an old one exists → delete old file
        if (newLogo && existingSettings?.website_logo) {
            const oldImagePath = path.join(
                __dirname,
                '../public/uploads/',
                existingSettings.website_logo
            );

            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        await Settings.findOneAndUpdate(
            {},
            {
                website_title: web_title,
                footer_description,
                ...(newLogo && { website_logo: newLogo })
            },
            { new: true, upsert: true }
        );

        res.redirect('/admin/settings');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to save settings');
    }
};

module.exports = {
    loginPage,
    adminLogin,
    logout,
    users,
    createUserPage,
    createUser,
    user,
    saveSettings,
    updateUserPage,
    updateUser,
    deleteUser,
    dashboard,
    settings
}

