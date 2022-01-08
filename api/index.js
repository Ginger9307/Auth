const mongoose = require('mongoose');
const express = require('express');
const app = express();


const dotenv = require('dotenv');
dotenv.config();

// connect to DB
mongoose.connect(process.env.DB_CONNECT, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true
    }) 
    .then(() => {
        console.log('DB connected!')
    });

// import routes
const authRoute = require('./routes/auth');

// middleware
app.use(express.json());

// routre middlewares
app.use('/api/user', authRoute);

// app.post('/register', (req, res) => {
    
//     // const user = new User({
//     //     name: req.body.name,
//     //     email: req.body.email,
//     //     password: req.body.password
//     // });
    
//     const user = {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     }
//     console.log(user)
//     console.log(req)

//     try {
//         // const savedUser = user.save();
//         // res.send(savedUser);
//         res.send(user)
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })       

// root response
app.get('/', (req,res) => {
    res.send('Over')
})

// start server
app.listen(3000, () => console.log("Server is running"));