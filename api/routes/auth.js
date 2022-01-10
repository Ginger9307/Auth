const router = require('express').Router();
const User = require('../model/User'); 
const validation = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// register route
router.post('/register', async (req, res) => {
    // data validatation 
    const {error} = validation.registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // if the user is already exists
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send("User with this email already exists");
    
    // hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log(hashedPassword)
;
    //create new user 
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    console.log(user)

    const savedUser = await user.save((err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(result);
        }
    });
});

// login router
router.post('/login', async (req, res) => {
    // data validatation 
    const {error} = validation.loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    // if the user is not exist
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("User or password is wrorg");
    console.log(user);
    // if the password is wrong
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("User or password is wrorg")
    // simple response w/o token
    // res.send("Loged in!")

    // create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send('Loged in!')
});


module.exports = router;

