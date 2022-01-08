const router = require('express').Router();
const User = require('../model/User'); 
const validation = require('../validation');


// register route
router.post('/register', async (req, res) => {
    const {error} = validation.registerValidation(req.body)
    if (error) return res.send(error.details[0].message);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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

module.exports = router;

