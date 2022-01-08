const mongoose = require('mongoose');

// const { init } = require ('../dbConfig')
// const { ObjectId } = require('mongodb')

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

module.exports = mongoose.model('User', userSchema);