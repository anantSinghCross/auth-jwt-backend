const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { error } = require('console');

const app = express();

app.use(bodyParser.json());

app.listen(3000,() => {
    console.log('\n🟢 Server is running...\n');
});

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
