const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUpUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).send({success: false, msg: errors.array()});
    }
    // Check if the user exists (TODO)

    // Encrypt the password
    try {
        let salt = await bcrypt.genSalt(12);
        let encryptedPassword = await bcrypt.hash(req.body.password, salt);
        
        // Sign the token and send it back
        let payload = {
            user: {
                id: 12345
            }
        }
        jwt.sign(payload, 'supersecret', {expiresIn: '1m'}, (err, token) => {
            if(err) {throw err;}
            res.status(200).json({token});
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}


const loginUser = async (req, res, next) => {
    let userId = req.user.id;
    res.json({ success: true, user: {id: userId} });
}


module.exports = {
    signUpUser,
    loginUser
}