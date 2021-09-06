import {render, fireEvent, waitFor, screen, getByPlaceholderText, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Registration from '../components/registration/Registration';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
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
        const name = screen.getByPlaceholderText('Name');
        const dob = screen.getByTestId('DOB');
        const generalError = screen.getByTestId('general-error');
        
        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(name).toHaveValue('testname'));
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
            const name = await screen.getByPlaceholderText('Name');
            const dob = await screen.getByTestId('DOB');
            
            
            fireEvent.change(username, {target: {value: 'testusername1'}});
            fireEvent.change(password, {target: {value: 'testpassword'}});
            fireEvent.change(name, {target: {value: 'testname'}});
            fireEvent.change(dob, {target: {value: '2000-08-01'}});
    
            await waitFor(() => expect(username).toHaveValue('testusername1'));
            await waitFor(() => expect(password).toHaveValue('testpassword'));
            await waitFor(() => expect(name).toHaveValue('testname'));
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
        render(<Registration/>);

        await new Promise(r => setTimeout(r, 2000));
        //Attempt a registration with the same username
        register();
        const usernameError = screen.getByTestId('username-error');
        const generalError = screen.getByTestId('general-error');
        await waitFor(() => expect(usernameError).toHaveTextContent('Username is already taken'));
        await waitFor(() => expect(generalError).toHaveTextContent('Failed'));
    });
});
test("Unit Test - Username input too short", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        render(<Registration/>);
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const name = screen.getByPlaceholderText('Name');
        const dob = screen.getByTestId('DOB');
        const usernameError = screen.getByTestId('username-error');
        const generalError = screen.getByTestId('general-error');
        
        fireEvent.change(username, {target: {value: 'te'}});
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('te'));
        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(name).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(usernameError).toHaveTextContent('Username must be at least 3 characters long'));
        await waitFor(() => expect(generalError).toHaveTextContent('Failed'));
    });
    
});
test("Unit Test - Username not inputted", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        render(<Registration/>);
        const password = screen.getByPlaceholderText('Password');
        const name = screen.getByPlaceholderText('Name');
        const dob = screen.getByTestId('DOB');
        const usernameError = screen.getByTestId('username-error');
        const generalError = screen.getByTestId('general-error');
        
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(name, {target: {value: 'testname123'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(name).toHaveValue('testname123'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(usernameError).toHaveTextContent('Username must be provided'));
        await waitFor(() => expect(generalError).toHaveTextContent('Failed'));
    });
});
test("Unit Test - Password input too short", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        render(<Registration/>);
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const name = screen.getByPlaceholderText('Name');
        const dob = screen.getByTestId('DOB');
        const passwordError = screen.getByTestId('password-error');
        const generalError = screen.getByTestId('general-error');
        
        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(password, {target: {value: 'te'}});
        fireEvent.change(name, {target: {value: 'testname'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(password).toHaveValue('te'));
        await waitFor(() => expect(name).toHaveValue('testname'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(passwordError).toHaveTextContent('Password must be at least 4 characters long'));
        await waitFor(() => expect(generalError).toHaveTextContent('Failed'));
    });
});
test("Unit Test - Password not inputted", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        render(<Registration/>);
        const username = screen.getByPlaceholderText('Username');
        const name = screen.getByPlaceholderText('Name');
        const dob = screen.getByTestId('DOB');
        const passwordError = screen.getByTestId('password-error');
        const generalError = screen.getByTestId('general-error');

        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(name, {target: {value: 'testname123'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(name).toHaveValue('testname123'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(passwordError).toHaveTextContent('Please provide a password'));
        await waitFor(() => expect(generalError).toHaveTextContent('Failed'));
    });
});
test("Unit Test - Name contains non-alphabet characters", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        render(<Registration/>);
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const name = screen.getByPlaceholderText('Name');
        const dob = screen.getByTestId('DOB');
        const nameError = screen.getByTestId('name-error');
        const generalError = screen.getByTestId('general-error');
        
        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(name, {target: {value: 'testname123'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(name).toHaveValue('testname123'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(nameError).toHaveTextContent('Name must only contain letters'));
        await waitFor(() => expect(generalError).toHaveTextContent('Failed'));
    });
});
test("Unit Test - Name not inputted", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        render(<Registration/>);
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const dob = screen.getByTestId('DOB');
        const nameError = screen.getByTestId('name-error');
        const generalError = screen.getByTestId('general-error');
        
        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(dob, {target: {value: '2000-08-01'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(dob).toHaveValue('2000-08-01'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(nameError).toHaveTextContent('Name must not be empty!'));
        await waitFor(() => expect(generalError).toHaveTextContent('Failed'));
    });
});
test("Unit Test - DOB not inputted", async () => {

    axios.defaults.adapter = require('axios/lib/adapters/http');
    
    await act( async () => {
        render(<Registration/>);
        const username = screen.getByPlaceholderText('Username');
        const password = screen.getByPlaceholderText('Password');
        const name = screen.getByPlaceholderText('Name');
        const dobError = screen.getByTestId('dob-error');
        const generalError = screen.getByTestId('general-error');
        
        fireEvent.change(username, {target: {value: 'testusername'}});
        fireEvent.change(password, {target: {value: 'testpassword'}});
        fireEvent.change(name, {target: {value: 'testname123'}});

        await waitFor(() => expect(username).toHaveValue('testusername'));
        await waitFor(() => expect(password).toHaveValue('testpassword'));
        await waitFor(() => expect(name).toHaveValue('testname123'));
        
        const submit = screen.getByTestId('submit');
        fireEvent.click(submit);
        await waitFor(() => expect(dobError).toHaveTextContent('DOB must be set'));
        await waitFor(() => expect(generalError).toHaveTextContent('Failed'));
    });
});
