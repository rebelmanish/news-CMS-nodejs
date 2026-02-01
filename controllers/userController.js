
const mongoose = require('mongoose')
const User = require('../models/User.model')

const loginPage = async (req, res) => {
    res.render('admin/login',{
        layout: false
    })
 }

const adminLogin = async (req, res) => { }

const logout = async (req, res) => {
    res.render('admin/logout')
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

