const path = require('path');

const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();

const connectDB = require('./config/db');
const port = process.env.PORT || 5000



const {errorHandler} = require('./middleware/errorMiddleware')

const app = express();

//to get data from request body (req.body)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals',require('./routes/goalRoutes'));
app.use('/api/users',require('./routes/userRoutes'));

// serve frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('*',(req,res)=>{
        return res.sendFile(    path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
    })
}else{
    app.get('/',(req,res)=>res.send('Please set to production'))
}

 app.use(errorHandler);

connectDB();
app.listen(port,()=>console.log(`server started on ${port}`))