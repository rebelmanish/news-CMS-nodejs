const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'administrator') {
        next();
    } else {
        res.redirect('/admin/dashboard');
    }
};

module.exports = isAdmin;