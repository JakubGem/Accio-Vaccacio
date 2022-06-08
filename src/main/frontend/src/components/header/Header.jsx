import React, {useState} from 'react';
import Button from "./button/Button";
import './Header.css'
import LoginModal from "../modals/loginModal/LoginModal";
import RegistrationModal from "../modals/registrationModal/RegistrationModal";
import ErrorModal from "../modals/errorModals/ErrorModal";
import NightModeTogle from "./togleNightMode/NightModeTogle";
import ReactDOM from 'react-dom/client';
import App from "../../App";
import SearchBox from "../searchBox/SearchBox";


const Header = (inSession) => {

    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);

    const renderToMyProfilePage = () => {
    //TODO: methode to render to "My profile" page
    }

    const renderToForumPage = () => {
        setErrorModalOpen(true)
    //TODO: methode to render to "Forum" page
    }

    const renderToMainPage = () => {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <React.StrictMode>
                <div className="App">
                    <Header inSession={false}/>
                    <SearchBox/>
                </div>
            </React.StrictMode>
        );
    }

    return (
        <div className="header-box">
            <span className="left-buttons">
                <Button onClick={renderToMyProfilePage}>My profile</Button>
                <Button onClick={renderToForumPage}>Forum</Button>
                <Button onClick={renderToMainPage}>Main page</Button>
            </span>

            <NightModeTogle/>

            {inSession===true ? <span className="right-buttons"><Button>Logout</Button></span> :
                <span className="right-buttons">
                    <button className="noselect" onClick={() => {setLoginModalOpen(true);}}>Log in</button>
                    <button className="noselect" onClick={() => {setRegistrationModalOpen(true);}}>Registration</button>
                </span>}
            {loginModalOpen && <LoginModal setLoginOpenModal={setLoginModalOpen} />}
            {registrationModalOpen && <RegistrationModal setRegistrationOpenModal={setRegistrationModalOpen} />}
            {errorModalOpen && <ErrorModal setErrorModalOpen={setErrorModalOpen} error={"tekst pomylki"}/>}
        </div>
    );
};

export default Header;