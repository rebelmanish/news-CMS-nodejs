const express = require('express');
const router = express.Router();



const acticleController = require('../controllers/articleController')
const userController = require('../controllers/userController')
const categoryController = require('../controllers/categoryController');
const  commentController  = require('../controllers/commentController');






//Log routes


router.get('/login', userController.loginPage );
router.post('/submit', userController.adminLogin );
router.get('/logout', userController.logout );


// User CRUD Routes

router.get('/users', userController.users );
router.get('/create', userController.createUserPage );
router.post('/create', userController.createUser );
router.get('/user', userController.user );
router.get('/updateUser/:id', userController.updateUserPage );
router.post('/updateUser/:id', userController.updateUser );
router.get('/deleteUser/:id', userController.deleteUser );



// Categories CRUD Routes

router.get('/categories', categoryController.categories );
router.post('/create', categoryController.createCategory );
router.get('/category', categoryController.category );
router.get('/updateCategory/:id', categoryController.updateCategoryPage );
router.post('/updateCategory/:id', categoryController.updateCategory );
router.get('/deleteCategory/:id', categoryController.deleteCategory );


// Articles CRUD Routes

router.get('/articles', acticleController.articles );
router.post('/create', acticleController.createArticle );
router.get('/article', acticleController.article );
router.get('/updateArticle/:id', acticleController.updateArticlePage );
router.post('/updateArticle/:id', acticleController.updateArticle );
router.get('/deleteArticle/:id', acticleController.deleteArticle );

// Comments Routes

router.get('/comments', commentController.comments );
router.get('/deleteComments/:id', commentController.deleteComment );






module.exports = router;



