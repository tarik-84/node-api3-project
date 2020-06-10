// code away!
const express = require('express')
const logger = require('./middleware/logger')
const userRouter = require('./users/userRouter')
const postRouter= require('./posts/postRouter')
const server = require('./server')


const port = 5000

server.use(express.json())
server.use(logger())
server.use('/users', userRouter)
server.use('/posts', postRouter)



server.listen(port, () => {
   console.log(`server is listening on ${port}`)
})