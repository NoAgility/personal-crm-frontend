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
            const data = await SpringBootAdapterWrapper.get('/task/readTasks').then(res => { return res.data; } )
                .catch(err => { throw err; });
            return data;
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
                ...(task.taskPriority !== null && task.taskPriority.length > 0) && {"priority": parseInt(task.taskPriority)},
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
    updateTaskName: async (task) => {
        try {
            const data = { "taskID" : task.taskID, "newTaskName": task.taskName };
            await SpringBootAdapterWrapper.post('/task/updateTaskNote', "",  data).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to update task note");
        }
    },
    /**
     * Updates a task note for a user
     * @param {*} task The task to be updated
     */
    updateTaskNote: async (task) => {
        try {
            const data = { "taskID" : task.taskID, "taskNote": task.taskNote };
            await SpringBootAdapterWrapper.post('/task/updateTaskNote', "",  data).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to update task note");
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
            if (task.taskPriority) {
                const data = { 
                    "taskID" : task.taskID,
                    ...(task.taskPriority !== null && task.taskPriority.length > 0) && {"priority": parseInt(task.taskPriority)}
                };
                await SpringBootAdapterWrapper.post('/task/updatePriority', "",  data).then(res => { return res.data; } )
                .catch(err => { throw err; });
            } 
            //If priority is not provided, POST with -1 representing no priority
            else {
                const data = { 
                    "taskID" : task.taskID,
                    "priority": -1
                }
                await SpringBootAdapterWrapper.post('/task/updatePriority', "",  data).then(res => { return res.data; } )
                .catch(err => { throw err; });
            }
            
            
        } catch (err) {
            alert("Failed to update task priority");
        }
    }
}

export default TaskController;