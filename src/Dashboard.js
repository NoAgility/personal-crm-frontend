import { BrowserRouter as Router, Switch, Redirect, Route, withRouter} from 'react-router-dom';
import React from 'react';
import Contacts from './components/contacts/Contacts';
import Calendar from './components/calendar/Calendar';
import TaskPage from './components/tasks/Tasks';
import Inbox from './components/inbox/Inbox';
import Meetings from './components/meetings/Meetings';


const Placeholder = () => {
    return <div><h2>This page is under maintenance</h2></div>
}
const Dashboard = () => {

    return <React.Fragment>
        <Switch>
            <Redirect exact from="/home" to="/home/calendar"/>
            <Route exact path="/home/calendar" component={Calendar}/>
            <Route exact path="/home/contacts" component={Contacts}/>
            <Route exact path="/home/tasks" component={TaskPage}/>
            <Route exact path="/home/inbox" component={Inbox}/>
            <Route exact path="/home/meetings" component={Meetings}/>
        </Switch>
    </React.Fragment>
}

export default Dashboard;