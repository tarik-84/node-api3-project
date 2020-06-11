// code away!
const express = require('express')
const logger = require('./middleware/logger')
const userRouter = require('./users/userRouter')
const postRouter= require('./posts/postRouter')
const server = require('./server')
const welcomeRouter = require('./welcome/welcome-router')


const port = process.env.PORT || 5000

server.use(express.json())
server.use(logger())
server.use('/', welcomeRouter)
server.use('/users', userRouter)
server.use('/posts', postRouter)



server.listen(port, () => {
   console.log(`server is listening on ${port}`)
})