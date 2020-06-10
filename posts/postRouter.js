const express = require('express');
const posts = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  posts.get()
  .then(post =>{
    res.status(200).json(post)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
        message: "The posts information could not be retrieved.",
    })
  })
});

router.get('/:id', validatePostId(), (req, res) => {
  res.status(200).json(res.post)
});

router.delete('/:id', validatePostId(), (req, res, next) => {
  posts.remove(req.params.id)
       .then(() => {
         res.status(200).json({
           message: 'The post has been removed'
         })
       })
       .catch(next) 
});

router.put('/:id', validatePostId(), validatePost(), (req, res, next) => {
  posts.update(req.params.id, req.body)
       .then(post => {
         if(post) {
           res.status(200).json(post)
         } else {
           res.status(404).json({
             message: 'The post could not be found'
           })
         }
       })
       .catch(next)
});

// custom middleware

function validatePostId() {
  return(req, res, next) => {
    posts.getById(req.params.id)
        .then(post => {
          if(post) {
            res.post = post
            next()
          } else {
            res.status(400).json({
              message: 'invalid user id'
            })
          }
        })
        .catch(next) 
  }
}

function validatePost() {
  return(req, res, next) => {
    if(!req.body.text){
      return res.status(400).json({
        message: 'missing required text field'
      })
    }
    next()
  }
}

module.exports = router;
