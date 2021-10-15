import { Dropdown } from 'react-bootstrap';
import React, { useState } from 'react';
import "./TaskMisc.css";

const priorities = {
    "High": 1,
    "Medium": 2,
    "Low": 3,
    "None": -1
}
const TaskPriorityDropdown = ({change, defaultPriority, owner}) => {

    const [priority, setPriority] = useState(Object.entries(priorities).filter(p => p[1] === defaultPriority)[0][0]);
    return (<Dropdown className="dropdown d-inline mx-2">

        {owner ? <React.Fragment>
            <Dropdown.Toggle id="dropdown-autoclose-outside">
            Priority: {priority}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {Object.keys(priorities).map(p => 
                <Dropdown.Item
                    key={"priority" + p}
                    onClick={() => { 
                        setPriority(p);
                        change(priorities[p])
                        }
                    }>
                    {p}
                </Dropdown.Item>
            )}
        </Dropdown.Menu>
        </React.Fragment> : <div className="unselectable-input"><h5>Priority</h5> <div>{priority}</div></div>
        }
        
    </Dropdown>);
}

export default TaskPriorityDropdown;