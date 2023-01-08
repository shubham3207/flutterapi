const Batch = require('../models/Batch')

const createBatch = (req, res, next) => {
    let batch = {
        'name': req.body.name,
    }
    Batch.create(batch)
        .then((batch) => {
            res.status(201).json(batch)
        }).catch(next)
}

const getAllBatch = (req,res,next)=>{
    Batch.find()
    .then((batch)=>{
        res.json(batch)
    }).catch((err)=> next(err))
   
}

module.exports = {
    createBatch,
    getAllBatch,
}




