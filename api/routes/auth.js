const router = require('express').Router();
// const User = require('../model/User'); 


const mongoose = require('mongoose');
const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
});

const User = mongoose.model('User', userSchema);

router.post('/register', async (req, res) => {
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    // const user = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // }
    console.log(user)

    
    const savedUser = await user.save((err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(result);
        }

    });
    //     res.send(savedUser);
    //     // res.send(user)
    // } catch (error) {
    //     res.status(400).send(error);
    // }

    // res.send('Request');

});

module.exports = router;

