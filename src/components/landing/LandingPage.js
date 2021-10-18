import './LandingPage.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router-dom';
const LandingPage = () => {

    const history = useHistory();
    const redirect = (route) => {
        history.push(route);
    }
    return <div className="landing-page">

        <div className="banner">
            <div className="banner-header">
                <div className="logo">
                <img src="/landing_logo.png" alt=""/>
                </div>
                
                <h1>NoAgility Personal CRM</h1>
            </div>
            
            <div className="row">
                <button className="login-btn" onClick={() => redirect("/login")}>Login</button>

                <button className="signup-btn" onClick={() => redirect("/register")}>Sign Up</button>
            </div>
        </div>

        <div className="information-body">
            <div className="information-text">
                A powerful CRM, made just for your personal needs.

                Connect with your colleagues, manage your schedule, organise your tasks and meetings with ease.
            </div>
            <div className="carousel-container">
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showStatus={false}
                    dynamicHeight={true}>
                    <div>
                        <img src="/rsz_1contacts.png" alt="Can't be loaded"/>
                    </div>
                    <div>
                        <img src="/rsz_meetings.png" alt="Can't be loaded"/>
                    </div>
                    <div>
                        <img src="/rsz_tasks.png" alt="Can't be loaded"/>
                    </div>
                    <div>
                        <img src="/rsz_calendar.png" alt="Can't be loaded"/>
                    </div>
                    <div>
                        <img src="/rsz_inbox.png" alt="Can't be loaded"/>
                    </div>
                </Carousel>
            </div>
        </div>
        <div className="landing-names">
            <div className="name-row">
                <h3>Ash Mulama</h3>
                <h3>Lucien Lu</h3>
                <h3>Nathan Rearick</h3>
                <h3>Oscar Rochanakij</h3>
                <h3>Robert Northby</h3>
            </div>
        </div>
    </div>
}

export default LandingPage;