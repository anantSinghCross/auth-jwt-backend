const express = require('express');
const { check } = require('express-validator');
const { signUpUser, loginUser } = require('./controllers/auth.js');
const auth = require('./middleware/auth.js');

const app = express();

app.use(express.json());

app.listen(3000,() => {
    console.log('\n🟢 Server is running...\n');
});

// TODO: Add JWT authentication, login, signup and addition of users in MongoDB
// TODO: Added JWT verification for protected routes

app.post('/signup',[
    check('name', 'Please enter a name').notEmpty(),
    check('email', 'Please enter an email').isEmail(),
    check('password', 'Please enter password considering the constraints').notEmpty().isLength({min: 6})
], signUpUser);

app.get('/login', auth, loginUser);