const { body, validationResult } = require('express-validator');

const loginValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .matches(/^\S+$/).withMessage('Username must not contain spaces')
        .isLength({ min: 4, max: 15 }).withMessage('Username must be at leat 4 characters'),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6, max: 12 }).withMessage('Password must be at leat 6 characters')
]

const userValidation = [
    body('username').trim()
        .notEmpty().withMessage('Username is required')
        .matches(/^\S+$/).withMessage('Username must not contain spaces')
        .isLength({ min: 4, max: 15 }).withMessage('Username must be at leat 4 to 15 characters'),

    body('fullname')
        .trim()
        .notEmpty().withMessage('Fullname is required')
        .isLength({ min: 5, max: 25 }).withMessage('Fullname must be 5 to 25 characters long'),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6, max: 12 }).withMessage('Password must be at leat 6 characters'),
 
    body('role')
        .trim()
        .notEmpty().withMessage('Role is required')
        .isIn(['author', 'administrator']).withMessage('Role must be author or administrator')
]

const userUpdateValidation = [
    body('fullname')
        .trim()
        .notEmpty().withMessage('Fullname is required')
        .isLength({ min: 5, max: 25 }).withMessage('Fullname must be 5 to 25 characters long'),

    body('password')
        .optional({ checkFalsy: true})
        .isLength({ min: 6, max: 12 }).withMessage('Password must be at leat 6 characters'),

    body('role')
        .trim()
        .notEmpty().withMessage('Role is required')
        .isIn(['author', 'administrator']).withMessage('Role must be author or administrator')
]

const catValidation = [
        body('cat')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 10 }).withMessage('Category name must be 3 to 10 characters long'),

        body('description')
        .isLength({ max: 100 }).withMessage('Description must be at most 100 characters long'),
]

const articleValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 5, max: 50 }).withMessage('Title must be 5 to 50 characters long'),

    body('content')
        .trim()
        .notEmpty().withMessage('Content is required')
        .isLength({ min: 10, max: 1000 }).withMessage('Content must be 10 to 1000 characters long'),

    body('category')
        .trim()
        .notEmpty().withMessage('Category is required')
        .isMongoId().withMessage('Category must be a valid ObjectId')
]


module.exports = { 
    loginValidation,
    catValidation,
    userValidation,
    userUpdateValidation,
    articleValidation
}