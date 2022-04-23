const express = require('express')
const roomRouter = require('./routes/index')
const mongoose = require('mongoose')
const userRouter=require('./routes/user')


mongoose.connect('mongodb://localhost:27024/CS477Project',err=>{
  if(err){
    console.log('DB error: ', err)
  }else{
    console.log('DB connected')
  }
})

const server = express()
server.use(express.json())




server.use('/rooms',roomRouter)
server.use('/users',userRouter)
// server.use('/rooms',userRouter)
server.use((err,req,res,next)=>{
    res.send(err.message)
})

server.listen(5070,()=>{
    console.log("listening on port 5070...")
})