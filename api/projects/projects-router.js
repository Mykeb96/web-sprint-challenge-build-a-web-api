const express = require('express')
const router = express.Router()
const mw = require('./projects-middleware')
const project = require('./projects-model')

router.get('/', (req, res) => {
    project.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => res.status(500).json({ message: err.message }))
})

router.get('/:id', mw.validateProjectId, (req, res) => {
    const {id} = req.params
    project.get(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

router.post('/', mw.validateProjectPost, (req, res) => {
    project.insert(req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

router.put('/api/projects/:id', mw.validateProjectUpdate, (req, res) => {
    const {id} = req.params
    const changes = req.body
    project.update(id, changes)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })

})

router.delete('/api/projects/:id', mw.validateProjectId, (req, res) => {
    const {id} = req.params
    project.delete(id)
        .then(project => {
            res.status(200).json('project deleted')
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })

})

router.get('/api/projects/:id/actions', mw.validateProjectId, (req, res) => {
    const {id} = req.params
    project.getProjectActions(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

module.exports = router