import SpringBootAdapterWrapper from '../../util/SpringBootAdapterWrapper';

/**
 * Controller singleton providing an interface to the backend API
 */
const TaskController = {
    /**
     * Retrieve tasks for a user
     * @returns a list of objects representing tasks
     */
    fetchTasks: async () => {
        try {
            const data = await SpringBootAdapterWrapper.get('/task/readAllTasks').then(res => { return res.data; } )
                .catch(err => { throw err; });
            return data;
        } catch (err) {
            alert("Failed to fetch tasks");
        }
    },
    completeTask: async (task) => {
        try {
            const data = {"taskID": task.taskID}
            const res = await SpringBootAdapterWrapper.post('/task/completeTask', "", data).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to fetch tasks");
        }
    },
    /**
     * Adds a task for a user
     * @param {*} task The task to be added
     */
    addTask: async (task) => {
        try {
            
            const data = {
                "taskName": task.taskName,
                ...(task.taskDeadline !== null) && {"deadline": task.taskDeadline},
                ...(task.taskPriority !== null && task.taskPriority !== -1) && {"priority": parseInt(task.taskPriority)},
                "contactIDs": task.contactIDs.length !== 0 ? task.contactIDs : []
            }
            const res = await SpringBootAdapterWrapper.post('/task/createTask', "", data).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to create task");
        }
    },
    /**
     * Deletes a task for a user
     * @param {*} task The task to be deleted
     */
    deleteTask: async (task) => {
        try {
            const jsonTaskID = { "taskID" : task.taskID };
            await SpringBootAdapterWrapper.post('/task/deleteTask', "",  jsonTaskID).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to create task");
        }
    },
    /**
     * Updates a task name for a user
     * @param {*} task The task to be updated
     */
    updateTaskName: async (task, newName) => {
        try {
            const data = { "taskID" : task.taskID, "newTaskName": newName };
            await SpringBootAdapterWrapper.post('/task/updateTask', "",  data).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to update task note");
        }
    },
    /**
     * Updates a task note for a user
     * @param {*} task The task to be updated
     */
    updateTaskNote: async (note) => {
        try {
            const data = { "taskNoteID" : note.taskNoteID, "newTaskNote": note.note };
            await SpringBootAdapterWrapper.post('/task/updateTaskNote', "",  data).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to update task note");
        }
    },
    addTaskContact: async(task, contactID) => {
        try {
            const data = { "taskID" : task.taskID, "contactID": contactID };
            await SpringBootAdapterWrapper.post('/task/addTaskContact', "",  data).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to update task note");
        }
    },
    deleteTaskContact: async(task, contactID) => {
        try {
            const data = { "taskID" : task.taskID, "contactID": contactID };
            await SpringBootAdapterWrapper.post('/task/deleteContact', "",  data).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to update task note");
        }
    },
    addTaskNote: async (note) => {
        try {
            const data = { "taskID" : note.taskID, "taskNote": note.note };
            await SpringBootAdapterWrapper.post('/task/addTaskNote', "",  data).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to add task note");
        }
    },
    deleteTaskNote: async (note) => {
        try {
            const data = { "taskNoteID" : note.taskNoteID};
            await SpringBootAdapterWrapper.post('/task/deleteTaskNote', "",  data).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to add task note");
        }
    },
    /**
     * Updates the deadline of a task
     * @param {*} task The task to be updated
     */
    updateTaskDeadline: async (task) => {
        try {
            const data = { "taskID" : task.taskID, "deadline": task.taskDeadline };
            await SpringBootAdapterWrapper.post('/task/updateDeadline', "",  data).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to update task note");
        }
    },
    /**
     * Updates the priority of a task
     * @param {} task The priority to be updated
     */
    updatePriority: async (task) => {
        try {
            //If priority is provided
            const data = { 
                "taskID" : task.taskID,
                ...(task.taskPriority !== null) ? {"priority": parseInt(task.taskPriority)} : -1
            };
            await SpringBootAdapterWrapper.post('/task/updatePriority', "",  data).then(res => { return res.data; } )
            .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to update task priority");
        }
    }
}

export default TaskController;