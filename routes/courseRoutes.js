const exp = require('express')
const router = exp.Router()
const courseController = require('../controller/courseController')
router.route('/')
    .get(courseController.getAllCourse)
    .post(courseController.createCourse)

module.exports = router;
