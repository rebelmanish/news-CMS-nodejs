const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');



const acticleController = require('../controllers/articleController')
const userController = require('../controllers/userController')
const categoryController = require('../controllers/categoryController');
const  commentController  = require('../controllers/commentController');
const isLogged = require('../middlewares/isLogged');
const isAdmin = require('../middlewares/isAdmin');



//Log routes


router.get('/login', userController.loginPage );
router.get('/', userController.loginPage );
router.post('/submit', userController.adminLogin );
router.get('/logout', isLogged, userController.logout );

// Articles CRUD Routes

router.get('/articles', isLogged, acticleController.articles );
router.post('/createArticle', isLogged, upload, acticleController.createArticle );
router.get('/createArticle', isLogged, acticleController.createArticlePage);
router.get('/updateArticle/:id', isLogged, acticleController.updateArticlePage );
router.post('/updateArticle/:id', isLogged, upload, acticleController.updateArticle );
router.delete('/deleteArticle/:id', isLogged, acticleController.deleteArticle );

// Comments Routes

router.get('/comments', isLogged, commentController.comments );
router.get('/deleteComments/:id', isLogged, commentController.deleteComment );

// dashboard

router.get('/dashboard', isLogged, userController.dashboard);

// router.use(isAdmin)


// User CRUD Routes

router.get('/users', isLogged, isAdmin, userController.users );
router.get('/createUser', isLogged, isAdmin, userController.createUserPage );
router.post('/create', isLogged, isAdmin, userController.createUser );
router.get('/user', isLogged, isAdmin, userController.user );
router.get('/updateUser/:id', isLogged, isAdmin, userController.updateUserPage );
router.post('/updateUser/:id', isLogged, isAdmin, userController.updateUser );
router.delete('/deleteUser/:id', isLogged, isAdmin, userController.deleteUser );



// Categories CRUD Routes

router.get('/categories', isLogged, isAdmin, categoryController.categories );
router.post('/createCategory', isLogged, isAdmin, categoryController.createCategory );
router.get('/createCategory', isLogged, isAdmin, categoryController.createCategoryPage  );
router.get('/updateCategory/:id', isLogged, isAdmin, categoryController.updateCategoryPage );
router.post('/updateCategory/:id', isLogged, isAdmin, categoryController.updateCategory );
router.delete('/deleteCategory/:id', isLogged, isAdmin, categoryController.deleteCategory );



// Setting Routes

router.get('/settings', isLogged, isAdmin, userController.settings)




module.exports = router;



