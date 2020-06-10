const express = require('express');
const users = require('./userDb')
const posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser(), (req, res, next) => {
  users.insert(req.body)
       .then(user => {
         res.status(201).json(user)
       })
       .catch(next)
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res, next) => {
  posts.insert({...req.body, user_id: req.params.id})
       .then(user => {
         res.status(201).json(user)
       })
       .catch(next)
});

router.get('/', (req, res) => {
  users.get()
    .then(user => {
      res.status(200).json(user)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
          message: "The posts information could not be retrieved.",
      })
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(res.user)
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  users.getUserPosts(req.params.id)
       .then(user => {
         res.status(200).json(user)
       })
       .catch(next)
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  users.remove(req.params.id)
       .then(() => {
         res.status(200).json({
           message: 'The user has been removed'
         })
       })
       .catch(next)
});

router.put('/:id', validateUserId(), validateUser(), (req, res, next) => {
  users.update(req.params.id, req.body)
       .then(user => {
         if(user) {
           res.status(200).json(user)
         } else {
           res.status(404).json({
             message: 'The post could not be found'
           })
         }
       })
       .catch(next)
});

//custom middleware

function validateUserId() {
  return(req, res, next) => {
     users.getById(req.params.id)
          .then(user => {
            if(user){
              res.user = user
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

function validateUser() {
  return(req, res, next) => {
    if(!req.body.name) {
      return res.status(400).json({
        message: 'missing required name field'
      })
    }
    next()
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
