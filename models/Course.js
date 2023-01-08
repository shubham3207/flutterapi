const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true
     

    },
    students: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }

  

    
}, {timestamps: true} )

module.exports = mongoose.model('Course', courseSchema)