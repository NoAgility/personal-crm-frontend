import { Dropdown } from 'react-bootstrap';
import { useState } from 'react';

const priorities = {
    "High": 1,
    "Medium": 2,
    "Low": 3,
    "None": -1
}
const TaskPriorityDropdown = ({change, defaultPriority}) => {

    const [priority, setPriority] = useState(Object.entries(priorities).filter(p => p[1] === defaultPriority)[0][0]);
    return (<Dropdown className="d-inline mx-2">
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
    </Dropdown>);
}

export default TaskPriorityDropdown;