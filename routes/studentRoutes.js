const exp = require('express')
const router = exp.Router()
const studentController = require('../controller/studentController')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Student = require('../models/Student')

router.route('/')
    .get(studentController.getAllStudent)
// .post(studentController.createStudent)

router.post('/register', (req, res, next) => {
    Student.findOne({ username: req.body.username })
        .then(user => {
            if (user != null) {
                let err = new Error(`User ${req.body.username} already exists`)
                res.status(400)
                return next(err)
            } bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) return next(err);

                user = new Student()
                user.username = req.body.username
                user.password = hash
                if (req.body.role) user.role = req.body.role
                user.save().then(user => {
                    res.status(201).json({
                        'status': 'Student registered successfully',
                        userId: user._id,
                        username: user.username,
                        role: user.role
                    })
                }).catch(next)
            })
        }).catch(next)

})
router.post('/login', (req, res, next) => {
    Student.findOne({ username: req.body.username })
        .then(user => {
            if (user == null) {
                let err = new Error(`User ${req.body.username} not registered`)
                res.status(404)
                return next(err)
            }

            bcrypt.compare(req.body.password, user.password, (err, statuss) => {
                if (err) return next(err)
                if (!statuss) {
                    let err = new Error('Password does not match')
                    return next(err)
                }
                let data = {
                    userId: user._id,
                    username: user.username,
                    role: user.role
                }
                jwt.sign(data, process.env.SECRET,
                    { 'expiresIn': '1d' },
                    (err, token) => {
                        if (err) return next(err)

                        res.json({
                            'statuss': 'Login Successful',
                            token: token

                        })


                    })


            })

        }).catch(next)


})
module.exports = router;
