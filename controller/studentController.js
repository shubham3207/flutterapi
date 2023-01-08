const Student = require('../models/Student')

const createStudent = (req, res, next) => {
    let student = {
        'username': req.body.username,
        'password': req.body.password,
        'role': req.body.role
    }
    Student.create(student)
        .then((student) => {
            res.status(201).json(student)
        }).catch(next)
}

const getAllStudent = (req,res,next)=>{
    Student.find()
    .then((student)=>{
        res.json(student)
    }).catch((err)=> next(err))
   
}

module.exports = {
    getAllStudent,
    createStudent,
}



