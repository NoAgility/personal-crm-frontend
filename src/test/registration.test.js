import {render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import Registration from '../components/registration/Registration';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import LoginControllerWrapper from '../components/login/LoginControllerWrapper';
import LoginControllerETE from '../components/login/LoginControllerETE';
import SpringBootAdapterWrapper from '../util/SpringBootAdapterWrapper';
import SpringBootAdapterETE from '../util/SpringBootAdapterETE';
jest.setTimeout(20000);
beforeAll(() => { 
    LoginControllerWrapper.setController(LoginControllerETE);
    SpringBootAdapterWrapper.setAdapter(SpringBootAdapterETE);
});
test("Integration Test - Successful registration", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    await act( async () => {
        let testHistory, testLocation;
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
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const passwordConfirm = screen.getByPlaceholderText('Confirm Password');
        const fname = screen.getByPlaceholderText('First Name');
        const lname = screen.getByPlaceholderText('Last Name');
        const dob = screen.getByTestId('DOB');
        const generalError = screen.getByTestId('general-error');
        
        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(passwordConfirm, {target: {value: 'testpassword'}});
        fireEvent.change(fname, {target: {value: 'testname'}});
        fireEvent.change(lname, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(fname).toHaveValue('testname'));
        await waitFor(() => expect(lname).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(testLocation.pathname).toBe('/registration_success'));
    });
});
test("Integration Test - Username Taken", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    
    await act( async () => {
        const register = async () => {
            

            const username = await screen.getByPlaceholderText('Username');
            const password = await screen.getByPlaceholderText('Password');
            const passwordConfirm = await screen.getByPlaceholderText('Confirm Password');
            const fname = screen.getByPlaceholderText('First Name');
            const lname = screen.getByPlaceholderText('Last Name');
            const dob = await screen.getByTestId('DOB');
            
            
            fireEvent.change(username, {target: {value: 'testusername1'}});
            fireEvent.change(password, {target: {value: 'testpassword'}});
            fireEvent.change(passwordConfirm, {target: {value: 'testpassword'}});
            fireEvent.change(fname, {target: {value: 'testname'}});
            fireEvent.change(lname, {target: {value: 'testname'}});
            fireEvent.change(dob, {target: {value: '2000-08-01'}});
    
            await waitFor(() => expect(username).toHaveValue('testusername1'));
            await waitFor(() => expect(password).toHaveValue('testpassword'));
            await waitFor(() => expect(passwordConfirm).toHaveValue('testpassword'));
            await waitFor(() => expect(fname).toHaveValue('testname'));
            await waitFor(() => expect(lname).toHaveValue('testname'));
            await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
            
            const submit = await screen.getByTestId('submit');
            fireEvent.click(submit);
            
        }
        let testHistory, testLocation;
        render(<MemoryRouter intialEntries={"/registration"}>
            <Registration/>
            <Route
                path="*"
                render={({history, location}) => {
                    testHistory = history;
                    testLocation = location;
                }}/>
        </MemoryRouter>);

        
        
        //Attempt a valid registration
        register();
        
        await waitFor(() => expect(testLocation.pathname).toBe('/registration_success'));

        cleanup();
        render(<MemoryRouter intialEntries={"/registration"}>
        <Registration/>
        <Route
            path="*"
            render={({history, location}) => {
                testHistory = history;
                testLocation = location;
            }}/>
        </MemoryRouter>);

        await new Promise(r => setTimeout(r, 2000));
        //Attempt a registration with the same username
        register();
        const usernameError = screen.getByTestId('username-error');
        await waitFor(() => expect(usernameError).toHaveTextContent('Account username is taken'));
    });
});
test("Unit Test - Username input too short", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        let testHistory, testLocation;
        render(<MemoryRouter intialEntries={"/registration"}>
        <Registration/>
        <Route
            path="*"
            render={({history, location}) => {
                testHistory = history;
                testLocation = location;
            }}/>
        </MemoryRouter>);
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const passwordConfirm = await screen.getByPlaceholderText('Confirm Password');
        const fname = screen.getByPlaceholderText('First Name');
        const lname = screen.getByPlaceholderText('Last Name');
        const dob = screen.getByTestId('DOB');
        const usernameError = screen.getByTestId('username-error');
        
        fireEvent.change(username, {target: {value: 'te'}});
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(passwordConfirm, {target: {value: 'testpassword'}});
        fireEvent.change(fname, {target: {value: 'testname'}});
        fireEvent.change(lname, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('te'));
        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(passwordConfirm).toHaveValue('testpassword'));
        await waitFor(() => expect(fname).toHaveValue('testname'));
        await waitFor(() => expect(lname).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(usernameError).toHaveTextContent('Username must be at least 3 characters long'));
    });
    
});
test("Unit Test - Username not inputted", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        let testHistory, testLocation;
        render(<MemoryRouter intialEntries={"/registration"}>
        <Registration/>
        <Route
            path="*"
            render={({history, location}) => {
                testHistory = history;
                testLocation = location;
            }}/>
        </MemoryRouter>);
        const password = screen.getByPlaceholderText('Password');
        const passwordConfirm = await screen.getByPlaceholderText('Confirm Password');
        const fname = screen.getByPlaceholderText('First Name');
        const lname = screen.getByPlaceholderText('Last Name');
        const dob = screen.getByTestId('DOB');
        const usernameError = screen.getByTestId('username-error');
        
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(passwordConfirm, {target: {value: 'testpassword'}});
        fireEvent.change(fname, {target: {value: 'testname'}});
        fireEvent.change(lname, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(passwordConfirm).toHaveValue('testpassword'));
        await waitFor(() => expect(fname).toHaveValue('testname'));
        await waitFor(() => expect(lname).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(usernameError).toHaveTextContent('Username must be provided'));
    });
});
test("Unit Test - Password input too short", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        let testHistory, testLocation;
        render(<MemoryRouter intialEntries={"/registration"}>
        <Registration/>
        <Route
            path="*"
            render={({history, location}) => {
                testHistory = history;
                testLocation = location;
            }}/>
        </MemoryRouter>);
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const passwordConfirm = screen.getByPlaceholderText('Confirm Password');
        const fname = screen.getByPlaceholderText('First Name');
        const lname = screen.getByPlaceholderText('Last Name');
        const dob = screen.getByTestId('DOB');
        const passwordError = screen.getByTestId('password-error');
        
        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(password, {target: {value: 'te'}});
        fireEvent.change(passwordConfirm, {target: {value: 'te'}});
        fireEvent.change(fname, {target: {value: 'testname'}});
        fireEvent.change(lname, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(password).toHaveValue('te'));
        await waitFor(() => expect(passwordConfirm).toHaveValue('te'));
        await waitFor(() => expect(fname).toHaveValue('testname'));
        await waitFor(() => expect(lname).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(passwordError).toHaveTextContent('Password must be at least 8 characters long'));
    });
});
test("Unit Test - Password not inputted", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        let testHistory, testLocation;
        render(<MemoryRouter intialEntries={"/registration"}>
        <Registration/>
        <Route
            path="*"
            render={({history, location}) => {
                testHistory = history;
                testLocation = location;
            }}/>
        </MemoryRouter>);
        const username = screen.getByPlaceholderText('Username');
        const fname = screen.getByPlaceholderText('First Name');
        const lname = screen.getByPlaceholderText('Last Name');
        const dob = screen.getByTestId('DOB');
        const passwordError = screen.getByTestId('password-error');

        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(fname, {target: {value: 'testname'}});
        fireEvent.change(lname, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(fname).toHaveValue('testname'));
        await waitFor(() => expect(lname).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(passwordError).toHaveTextContent('Please provide a password'));
    });
});
test("Unit Test - Name contains non-alphabet characters", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        let testHistory, testLocation;
        render(<MemoryRouter intialEntries={"/registration"}>
        <Registration/>
        <Route
            path="*"
            render={({history, location}) => {
                testHistory = history;
                testLocation = location;
            }}/>
        </MemoryRouter>);
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const passwordConfirm = screen.getByPlaceholderText('Confirm Password');
        const fname = screen.getByPlaceholderText('First Name');
        const lname = screen.getByPlaceholderText('Last Name');
        const dob = screen.getByTestId('DOB');
        const nameError = screen.getByTestId('name-error');
        
        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(passwordConfirm, {target: {value: 'testpassword'}});
        fireEvent.change(fname, {target: {value: 'testname123'}});
        fireEvent.change(lname, {target: {value: 'testname123'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(passwordConfirm).toHaveValue('testpassword'));
        await waitFor(() => expect(fname).toHaveValue('testname123'));
        await waitFor(() => expect(lname).toHaveValue('testname123'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(nameError).toHaveTextContent('name must only contain letters'));
    });
});
test("Unit Test - Name not inputted", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        let testHistory, testLocation;
        render(<MemoryRouter intialEntries={"/registration"}>
        <Registration/>
        <Route
            path="*"
            render={({history, location}) => {
                testHistory = history;
                testLocation = location;
            }}/>
        </MemoryRouter>);
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const passwordConfirm = screen.getByPlaceholderText('Confirm Password');
        const dob = screen.getByTestId('DOB');
        const nameError = screen.getByTestId('name-error');
        
        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(passwordConfirm, {target: {value: 'testpassword'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(passwordConfirm).toHaveValue('testpassword'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(nameError.textContent).toContain('name must not be empty!'));
    });
});
test("Unit Test - DOB not inputted", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        let testHistory, testLocation;
        render(<MemoryRouter intialEntries={"/registration"}>
        <Registration/>
        <Route
            path="*"
            render={({history, location}) => {
                testHistory = history;
                testLocation = location;
            }}/>
        </MemoryRouter>);
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const passwordConfirm = screen.getByPlaceholderText('Confirm Password');
        const fname = screen.getByPlaceholderText('First Name');
        const lname = screen.getByPlaceholderText('Last Name');
        const dobError = screen.getByTestId('dob-error');
        
        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(passwordConfirm, {target: {value: 'testpassword'}});
        fireEvent.change(fname, {target: {value: 'testname'}});
        fireEvent.change(lname, {target: {value: 'testname'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(passwordConfirm).toHaveValue('testpassword'));
        await waitFor(() => expect(fname).toHaveValue('testname'));
        await waitFor(() => expect(lname).toHaveValue('testname'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(dobError).toHaveTextContent('DOB must be set'));
    });
});
