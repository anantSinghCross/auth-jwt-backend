const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let tokenString = req.header('Authorization');
    if(!tokenString){
        return res.status(401).json({ success: false, msg: 'No Token' });
    }
    try {
        let decoded = jwt.verify(tokenString, 'supersecret')
        req.user = decoded.user;    
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success:false, msg: 'Unauthorised Token' });
    }
};