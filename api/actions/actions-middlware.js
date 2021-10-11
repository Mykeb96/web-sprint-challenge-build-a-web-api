const e = require('express')
const action = require('./actions-model')

function validateActionPost (req, res, next) {
    action.insert(req.body)
        .then(action => {
            if (!req.body.project_id || !req.body.descrption || !req.body.notes || !req.body.completed) {
                res.status(400).json('action is missing field(s)')
            } else {
                action.get(req.body.project_id)
                    .then (action => {
                        if (action) {
                            next()
                        } else {
                            res.status(404).json('Project not found')
                        }
                    })
                    .catch (err => {
                        res.status(400).json({ message: err.message })
                    })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

function validateActionUpdate(req, res, next) {
    const {id} = req.params
    const changes = req.body
    action.update(id, changes)
      .then(action => {
          if(!id) {
              res.status(404).json('action id does not exist!')
          } else {
              if (!req.body.project_id || !req.body.description || !req.body.completed || !req.body.noets) {
                  res.status(400).json('action missing field(s)')
              } else {
                  next()
              }
          }
      })
}


function validateActionId(req, res, next) {
    const { id } = req.params
    action.get(id)
      .then(action => {
        if (action) {
          req.action = action;
          next()
        }
        else {
          res.status(404).json({ message: "action not found" })
        }
      })
      .catch(err => {
        res.status(404).json('Error retrieving from database')
      })
  }

module.exports = {
    validateActionPost,
    validateActionUpdate,
    validateActionId
}