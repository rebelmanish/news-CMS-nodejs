const express = require('express');
const router = express.Router();



const acticleController = require('../controllers/articleController')
const userController = require('../controllers/userController')
const categoryController = require('../controllers/categoryController');
const  commentController  = require('../controllers/commentController');
const isLogged = require('../middlewares/isLogged');



//Log routes


router.get('/login', userController.loginPage );
router.get('/', userController.loginPage );
router.post('/submit', userController.adminLogin );
router.get('/logout', isLogged, userController.logout );


// User CRUD Routes

router.get('/users', isLogged, userController.users );
router.get('/createUser', isLogged, userController.createUserPage );
router.post('/create', isLogged, userController.createUser );
router.get('/user', isLogged, userController.user );
router.get('/updateUser/:id', isLogged, userController.updateUserPage );
router.post('/updateUser/:id', isLogged, userController.updateUser );
router.delete('/deleteUser/:id', isLogged, userController.deleteUser );



// Categories CRUD Routes

router.get('/categories', isLogged, categoryController.categories );
router.post('/createCategory', isLogged, categoryController.createCategory );
router.get('/createCategory', isLogged, categoryController.createCategoryPage  );
router.get('/updateCategory/:id', isLogged, categoryController.updateCategoryPage );
router.post('/updateCategory/:id', isLogged, categoryController.updateCategory );
router.delete('/deleteCategory/:id', isLogged, categoryController.deleteCategory );


// Articles CRUD Routes

router.get('/articles', isLogged, acticleController.articles );
router.post('/createArticles', isLogged, acticleController.createArticle );
router.get('/createArticles', isLogged, acticleController.createArticlePage);
router.get('/updateArticle/:id', isLogged, acticleController.updateArticlePage );
router.post('/updateArticle/:id', isLogged, acticleController.updateArticle );
router.get('/deleteArticle/:id', isLogged, acticleController.deleteArticle );

// Comments Routes

router.get('/comments', isLogged, commentController.comments );
router.get('/deleteComments/:id', isLogged, commentController.deleteComment );

// dashboard

router.get('/dashboard', isLogged, userController.dashboard)

// Setting Routes

router.get('/settings', isLogged, userController.settings)




module.exports = router;



