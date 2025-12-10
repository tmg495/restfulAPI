const express = require('express')
const app = express()
const PORT = 3000
const taskOps = require('./taskOps.js')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/tasks', (req, res) => {
    const tasks = taskOps.getTasks()
    res.json(tasks)
})

app.post('/tasks', (req, res) => {
    const newTask = taskOps.addTask(req.body)
    res.status(201).json(newTask)
})

app.get('/tasks/:id', (req, res) => {
    const task = taskOps.taskById(req.params.id)
    if (task == undefined) {
        res.status(404).send(`Task ID ${req.params.id} not found`)
    } else {
        res.json(task)
    }
})

app.put('/tasks/:id', (req, res) => {
    const err = taskOps.catchBadData(req.body)
    if (err != '') {
        res.status(400).send(err)
    }
    const updatedTask = taskOps.updateTask(req.body, req.params.id)
    if (updatedTask == undefined) {
        res.status(404).send(`Task ID ${req.params.id} not found`)
    } else {
        res.json(updatedTask)
    }
})

app.delete('/tasks/:id', (req, res) => {
    const index = taskOps.deleteTask(req.params.id)
    if (index == -1) {
        res.status(404).send(`Task ID ${req.params.id} not found`)
    } else {
        res.status(204).send()
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})