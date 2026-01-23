const express = require('express');
const router = express.Router();

const { 
    index, 
    articleByCategory, 
    singleArticle, 
    search, 
    author, 
    addComment
 } = require('../controllers/siteController');


 // home route

router.get('/', index );
router.get('/category/:name', articleByCategory );
router.get('/article/:id', singleArticle )
router.get('/search', search )
router.get('/author', author )
router.post('/comment/id', addComment )



module.exports = router;



