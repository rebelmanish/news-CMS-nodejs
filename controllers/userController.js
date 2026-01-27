
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
    res.render('admin/users')
 }
const createUserPage = async (req, res) => {
    res.render('admin/users/create.ejs')
 }
const user = async (req, res) => { }
const updateUserPage = async (req, res) => {
    res.render('admin/users/update')
 }
const createUser = async (req, res) => { } 
const updateUser = async (req, res) => { }
const deleteUser = async (req, res) => { }

const dashboard = async (req, res) => {
    res.render('admin/dashboard')
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
    dashboard
}

