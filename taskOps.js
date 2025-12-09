let taskArray = [
    {
        id: 0,
        title: 'Make a list of tasks',
        completed: false
    },
    {
        id: 1,
        title: 'Make the functions that edit the list',
        completed: false
    },
    {
        id: 2,
        title: 'Party',
        completed: false
    }
]

const getTasks = function() {
    return taskArray
}

const addTask = function(task) {
    let id = 0
    do
        id = Math.floor(Math.random() * 1000)
    while ((taskArray.findIndex((task) => task.id == id)) != -1)
    const newTask = {
        id: id,
        title: task.title,
        completed: false
    }
    taskArray.push(newTask)
    return newTask
}

const taskById = function(id) {
    return taskArray.find((task) => task.id == id)
}

const updateTask = function(body, id) {
    const index = taskArray.findIndex((task) => task.id == id)
    const oldTask = taskArray[index]
    if (index == -1) {
        return undefined
    } else {
        newTitle = body.title == undefined ? oldTask.title : body.title
        newStatus = body.completed == undefined ? oldTask.completed : body.completed
        const newTask = {
            id: parseInt(id),
            title: newTitle,
            completed: newStatus
        }
        taskArray.splice(index, 1, newTask)
        return newTask
    }
}

const deleteTask = function(id) {
    const index = taskArray.findIndex((task) => task.id == id)
    taskArray.splice(index, 1)
    return index
}

module.exports = {
    getTasks,
    addTask,
    taskById,
    updateTask,
    deleteTask
}