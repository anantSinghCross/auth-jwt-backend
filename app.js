const express = require('express');
const { check, validationResult } = require('express-validator');

const app = express();

app.use(express.json());

app.listen(3000,() => {
    console.log('\n🟢 Server is running...\n');
});

// TODO: Add JWT authentication, login, signup and addition of users in MongoDB
// TODO: Added JWT verification for protected routes

app.post('/login',[
    check('name', 'Please enter a name').notEmpty(),
    check('email', 'Please enter an email').isEmail(),
    check('password', 'Please enter password considering the constraints').notEmpty().isLength({min: 6})
], (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).send({success: false, msg: errors.array()});
    }
    const jsonData = {
        'dataReceived': req.body,
        'token': 'someToken'
    }
    res.send(jsonData);
});
