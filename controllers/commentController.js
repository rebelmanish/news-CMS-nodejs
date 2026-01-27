// router.get('/comments', comments );
// router.get('/deleteComments/:id', deleteComment );

const Comment = require('../models/Comment.model')


const comments = async (req, res) => {
    res.render('admin/comments')
 };
const deleteComment = async (req, res) => { };

module.exports = {
    comments,
    deleteComment
}
