const project = require('./projects-model')

function validateProjectId(req, res, next) {
    const { id } = req.params
    project.get(id)
      .then(project => {
        if (project) {
          req.project = project;
          next()
        }
        else {
          res.status(404).json({ message: "project not found" })
        }
      })
      .catch(err => {
        res.status(404).json('Error retrieving from database')
      })
  }

  function validateProjectPost(req, res, next) {
      project.insert(req.body)
        .then(project => {
            if (!req.body.name || !req.body.description || !req.body.completed) {
                res.status(400).json('Project is missing field(s)')
            } else {
                next()
            }
        })
  }

  function validateProjectUpdate(req, res, next) {
      const {id} = req.params
      const changes = req.body
      project.update(id, changes)
        .then(project => {
            if(!id) {
                res.status(404).json('project id does not exist!')
            } else {
                if (!req.body.name || !req.body.description || !req.body.completed) {
                    res.status(400).json('project missing field(s)')
                } else {
                    next()
                }
            }
        })
  }

  module.exports = {
      validateProjectPost,
      validateProjectId,
      validateProjectUpdate
  }
