require('dotenv').config()
const exp = require('express')
const mongoose = require('mongoose')
const batchRoutes = require('./routes/batchRoutes')
const studentRoutes = require('./routes/studentRoutes')
const courseRoutes = require('./routes/courseRoutes')

const app = exp()

const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/flutterapi')
.then(()=>{
    console.log('connected')
    app.listen(port, ()=>{
        console.log(`running on port : ${port}`)
    })
    
}).catch((err)=> console.log(err)) 

app.use(exp.json())


//route level middleware
app.use('/batch', batchRoutes)
app.use('/student', studentRoutes)
app.use('/course', courseRoutes)


// app.use(auth.verifyUser)
//error handling middlware



app.use((err, req,res,next) => {
    console.log(err.stack)
    if(res.statusCode==200) res.status(500)
    res.json({"msg": err.message})
})