const express = require('express');
const router = express.Router();



const acticleController = require('../controllers/articleController')
const userController = require('../controllers/userController')
const categoryController = require('../controllers/categoryController');
const  commentController  = require('../controllers/commentController');






//Log routes


router.get('/login', userController.loginPage );
router.get('/', userController.loginPage );
router.post('/submit', userController.adminLogin );
router.get('/logout', userController.logout );


// User CRUD Routes

router.get('/users', userController.users );
router.get('/createUser', userController.createUserPage );
router.post('/create', userController.createUser );
router.get('/user', userController.user );
router.get('/updateUser/:id', userController.updateUserPage );
router.post('/updateUser/:id', userController.updateUser );
router.delete('/deleteUser/:id', userController.deleteUser );



// Categories CRUD Routes

router.get('/categories', categoryController.categories );
router.post('/createCategory', categoryController.createCategory );
router.get('/createCategory', categoryController.createCategoryPage  );
router.get('/updateCategory/:id', categoryController.updateCategoryPage );
router.post('/updateCategory/:id', categoryController.updateCategory );
router.delete('/deleteCategory/:id', categoryController.deleteCategory );


// Articles CRUD Routes

router.get('/articles', acticleController.articles );
router.post('/createArticles', acticleController.createArticle );
router.get('/createArticles', acticleController.createArticlePage);
router.get('/updateArticle/:id', acticleController.updateArticlePage );
router.post('/updateArticle/:id', acticleController.updateArticle );
router.get('/deleteArticle/:id', acticleController.deleteArticle );

// Comments Routes

router.get('/comments', commentController.comments );
router.get('/deleteComments/:id', commentController.deleteComment );

// dashboard

router.get('/dashboard', userController.dashboard)

// Setting Routes

router.get('/settings', userController.settings)





module.exports = router;



