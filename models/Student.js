const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Usernames should be longer thant 5 characters']

    },

    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User'],
        default: 'User'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
    
}, {timestamps: true} )

module.exports = mongoose.model('Student', userSchema)