import {fetch, post} from '../../util/SpringBootAdapter';

const TaskController = {
    fetchTasks: async () => {
        try {
            const data = await fetch('/task/readTasks').then(res => { return res.data; } )
                .catch(err => { throw err; });
            return data;
        } catch (err) {
            alert("Failed to fetch tasks");
        }
    },
    addTask: async (task) => {
        try {
            console.log(task);
            const data = await post('/task/createTask', "", task).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to create task");
        }
    },
    deleteTask: async (task) => {
        try {
            const jsonTaskID = { "taskID" : task.taskID };
            await post('/task/createTask', "",  jsonTaskID).then(res => { return res.data; } )
                .catch(err => { throw err; });
        } catch (err) {
            alert("Failed to create task");
        }
    }
}

export default TaskController;