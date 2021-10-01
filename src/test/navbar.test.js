import {render, fireEvent, waitFor, screen, getByText} from '@testing-library/react';
import Navbar from './../components/navbar/Navbar';
import LoginControllerWrapper from '../components/login/LoginControllerWrapper';
import LoginControllerETE from '../components/login/LoginControllerETE';

beforeAll(() => { LoginControllerWrapper.setController(LoginControllerETE); })
test("Test rendering of links", async () => {
    render(<Navbar/>);

    screen.getByText("Tasks");
    screen.getByText("Meetings");
    screen.getByText("Calendar");
    screen.getByText("Inbox");
    screen.getByText("Contacts");
});