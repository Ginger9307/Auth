const jwt = require('jsonwebtoken');

function auth_token (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied!');
    
    try {
        const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifiedToken;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
    
}

module.exports = auth_token;