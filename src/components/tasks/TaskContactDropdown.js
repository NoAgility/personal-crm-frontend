import Dropdown from 'react-bootstrap/dropdown';
import ContactMenuItem from './ContactMenuItem';

const TaskContactDropdown = ({contactItems, add, remove}) => {
    return (<Dropdown className="d-inline mx-2">
        <Dropdown.Toggle id="dropdown-autoclose-outside">
            Add Contacts
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {contactItems.map(contact => 
                <ContactMenuItem 
                    key={contact.accountID}
                    contactItem={contact} 
                    add={add} 
                    remove={remove}/>)}
        </Dropdown.Menu>
    </Dropdown>);
}

export default TaskContactDropdown;