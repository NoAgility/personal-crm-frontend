const TaskList = (props) => {

    return (<div className="tasks-container">
        <div className="task-title">
            <div className="task-alias">{props.name}</div> <div className="task-date">{props.date}</div>
        </div>
        <Task/>
        <Task/>
        <Task/>
    </div>)
}

export default TaskList;