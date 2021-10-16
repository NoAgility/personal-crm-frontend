import {render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import Registration from '../components/registration/Registration';
import { MemoryRouter, Route } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import TaskPage from '../components/tasks/Tasks';
import TaskList from '../components/tasks/TaskList';
import Login from '../components/login/Login';
import LoginControllerWrapper from '../components/login/LoginControllerWrapper';
import LoginControllerETE from '../components/login/LoginControllerETE';
import SpringBootAdapterWrapper from '../util/SpringBootAdapterWrapper';
import SpringBootAdapterETE from '../util/SpringBootAdapterETE';
import CookieManager from '../util/CookieManager';
import TaskDetails from '../components/tasks/TaskDetails';
jest.setTimeout(20000);
jest.unmock('../components/contacts/Contacts');
beforeAll(() => { 

    axios.defaults.adapter = require('axios/lib/adapters/http');

    LoginControllerWrapper.setController(LoginControllerETE);
    SpringBootAdapterWrapper.setAdapter(SpringBootAdapterETE);
    document.body.innerHTML = '';
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'status=active',
    });

    CookieManager.eraseCookies();
    
});
test("Unit Test - TasksPage Component renders", async () => {
    const { container } = render(<TaskPage/>);

    const createTaskButton = container.querySelector(".create-task-btn");
    await waitFor(() => expect(createTaskButton).not.toBeNull());
});
test("Unit Test - TaskList, TaskItem Component renders for today", async () => {
    const { container } = render(<TaskList contacts={[]} allContacts={[]} tasks={[{taskName: "Test Task", taskPriority: -1, taskDeadline: new Date().toString(), taskContactAccounts: [], taskNoteList: []}]} label={"date"} editOptions={{update: jest.fn(), delete: jest.fn()}}/>);
    await waitFor(() => expect(container).toHaveTextContent("Test Task"));
    await waitFor(() => expect(container).toHaveTextContent("Today"));
});
test("Unit Test - TaskDetails Component renders", async () => {
    const { container, unmount } = render(<TaskDetails
    task={{taskName: "Test Task", taskPriority: -1, taskDeadline: "2021-10-26 13:30", taskContactAccounts: [], taskNoteList: []}}
    contacts={[]}
    allContacts={[]}
    show={jest.fn}
    onHide={jest.fn}
    onUpdate={jest.fn}
    onDelete={jest.fn}
    />, {container: document.body});

    
    await waitFor(() => expect(container.textContent).not.toBeNull());
    await waitFor(() => expect(container.textContent).toContain("Test Task"));
    await waitFor(() => expect(container.textContent).toContain("Priority : None"));
    await waitFor(() => expect(container.textContent).toContain("Due at October 26, 2021  :  1:30 PM"));
    unmount();
})
test("ETE Test - Register -> Login -> Create Task -> See Task", async () => {
    
    await act( async () => {
        let testHistory, testLocation;

        /**
         * Create new account
         */
        render(<MemoryRouter intialEntries={"/registration"}>
            <Registration/>
            <Route
                path="*"
                render={({history, location}) => {
                    testHistory = history;
                    testLocation = location;
                }}/>
        </MemoryRouter>
        );
        var username = screen.getByPlaceholderText('Username');
        var password = screen.getByPlaceholderText('Password');
        var name = screen.getByPlaceholderText('Name');
        var dob = screen.getByTestId('DOB');
        
        fireEvent.change(username, {target: {value: 'task_test_user_1'}});
        fireEvent.change(password, {target: {value: 'password'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('task_test_user_1'));
        await waitFor(() => expect(password).toHaveValue('password'));
        await waitFor(() => expect(name).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        var submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(testLocation.pathname).toBe('/registration_success'));
        await cleanup();
        await new Promise(r => setTimeout(r, 2000));
        
        /**
         * Login to new account
         */
        render(<MemoryRouter intialEntries={"/login"}>
        <Login/>
        <Route
            path="*"
            render={({history, location}) => {
                testHistory = history;
                testLocation = location;
        }}/>
        </MemoryRouter>);
        const username2 = screen.getByPlaceholderText('Username');
        const password2 = screen.getByPlaceholderText('Password');

        fireEvent.change(username2, {target: {value: 'task_test_user_1'}});
        fireEvent.change(password2, {target: {value: 'password'}});
        await waitFor(() => expect(username2).toHaveValue('task_test_user_1'));
        await waitFor(() => expect(password2).toHaveValue('password'));

        submit = screen.getByTestId("submit");
        fireEvent.click(submit);
        await waitFor(() => expect(testLocation.pathname).toBe('/home'));
        await cleanup();
        /**
         * Render Task page and add task
         */
        const {container, getByTestId, getByPlaceholderText, getByText, unmount} = render(<div><TaskPage/></div>, {container: document.body});

        const addTaskBtn = container.querySelector(".create-task-btn");

        await waitFor(() => expect(addTaskBtn).not.toBeNull());
        
        fireEvent.click(addTaskBtn);

        const taskNameInput = getByPlaceholderText("Task Name");

        fireEvent.change(taskNameInput, {target: {value: "Task 1"}});

        await waitFor(() => expect(taskNameInput).toHaveValue("Task 1"));

        const taskSubmit = container.querySelector(".meeting-submit");
        await waitFor(() => expect(taskSubmit).not.toBeNull());

        fireEvent.click(taskSubmit);

        //Look for new task to be displayed
        await new Promise(r => setTimeout(r, 2000));
        const task = container.querySelector(".task");
        await waitFor(() => expect(task).not.toBeNull());
        unmount();
    });
});