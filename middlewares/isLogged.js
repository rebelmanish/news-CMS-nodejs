const jwt = require('jsonwebtoken');

const isLogged = async (req, res, next) => {
    const token = req.cookies.token 
    if (!token) {
        return res.status(401).redirect('/admin/');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); 
    } catch (error) {
        return res.status(401).redirect('/admin/');
    }
};

module.exports = isLogged;