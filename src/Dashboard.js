import { BrowserRouter as Router, Switch, Redirect, Route, withRouter} from 'react-router-dom';
import React from 'react';
import Contacts from './components/contacts/Contacts';
import Calendar from './components/calendar/Calendar';
import TaskPage from './components/tasks/Task';
const Dashboard = () => {

    return <React.Fragment>
        <Switch>
            <Redirect exact from="/home" to="/home/calendar"/>
            <Route exact path="/home/calendar" component={Calendar}/>
            <Route exact path="/home/contacts" component={Contacts}/>
            <Route exact path="/home/tasks" component={TaskPage}/>
        </Switch>
    </React.Fragment>
}

export default Dashboard;