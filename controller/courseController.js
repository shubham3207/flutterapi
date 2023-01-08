const Course = require('../models/Course')

const createCourse = (req, res, next) => {
    let course = {
        'name': req.body.name,
    }
    Course.create(course)
        .then((course) => {
            res.status(201).json(course)
        }).catch(next)
}

const getAllCourse = (req,res,next)=>{
    Course.find()
    .then((course)=>{
        res.json(course)
    }).catch((err)=> next(err))
   
}


module.exports = {
    createCourse,
    getAllCourse,
}

