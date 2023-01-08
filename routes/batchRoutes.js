const exp = require('express')
const router = exp.Router()
const batchController = require('../controller/batchController')
router.route('/')
    .get(batchController.getAllBatch)
    .post(batchController.createBatch)


module.exports = router;
