function isAuthenticated(req, res, next) {
    if (req.session) {
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized: No user logged in' });
    }
}

module.exports = isAuthenticated;
