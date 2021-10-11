const { response } = require('express')
const express = require('express')
const router = express.Router()
const mw = require('./actions-middlware')
const action = require('./actions-model')

router.get('/', (req, res) => {
    action.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    action.get(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

router.post('/', mw.validateActionPost, (req, res) => {
    action.insert(req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

router.put('/:id', mw.validateActionUpdate, (req, res) => {
    const {id} = req.params
    const changes = req.body
    action.update(id, changes)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

router.delete('/:id', mw.validateActionId, (req, res) => {
    const {id} = req.params
    action.remove(id)
        .then(action => {
            res.status(200).json()
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

module.exports = router