
const mongoose = require('mongoose')
const User = require('../models/User.model')
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

        const jwtData = { id: user._id, role: user.role, username: user.username }
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
    res.render('admin/users', { users })
    // console.log(users)
 }
const createUserPage = async (req, res) => {
    res.render('admin/users/create.ejs')
 }
const user = async (req, res) => { }
const updateUserPage = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.render('admin/users/update', { user })
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
    res.render('admin/dashboard')
 }

 const settings = async (req, res) => {
    res.render('admin/setting')
 }

module.exports = {
    loginPage,
    adminLogin,
    logout,
    users,
    createUserPage,
    createUser,
    user,
    updateUserPage,
    updateUser,
    deleteUser,
    dashboard,
    settings
}

