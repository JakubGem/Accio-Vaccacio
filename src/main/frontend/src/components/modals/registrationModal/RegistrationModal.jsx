import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import ErrorModal from "../errorModals/ErrorModal";
import ReCAPTCHA from "react-google-recaptcha";

const RegistrationModal = (props) => {

    const [disabledBtn, setDisabledBtn] = useState(true)

    const [fullName, setFullName] = useState("")
    const [nickName, setNickName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [showRegistrationModal, setShowRegistrationModal] = useState(true);
    const handleCloseRegistrationModal = () => {
        setToPropsModalClose();
        setShowRegistrationModal(false);
    }
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorText, setErrorText]= useState("");

    function showErrorModal(data){
        setErrorText(data);
        setErrorModalOpen(true);
    }


    const sendDataToServer = () => {
        if (password === repeatPassword){
            const url = "http://localhost:8080/new_user_registration";

            axios.post(url,{
                fullName: fullName,
                nickName: nickName,
                birthday: birthday,
                email: email,
                password: password,
            })
                .then(res=>{
                    if (res.data !== ""){
                        showErrorModal(res.data)
                    }else {
                        handleCloseRegistrationModal();
                    }
                })
        }else {
            showErrorModal("The passwords are not the same")
        }
    }

    const setToPropsModalClose = () => {
        props.close(false)
    }

    return (
        <Modal show={showRegistrationModal} onHide={handleCloseRegistrationModal} style={{background: "rgba(0, 0, 0, 0.6)", color: "orange"}}>
            <Modal.Header closeButton style={{background: "rgb(40,40,40)"}}>
                <Modal.Title>Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background: "rgb(20,20,20)"}}>
                <Form style={{background: "rgb(20,20,20)"}}>
                    <Form.Group className="mb-3" controlId="control-input-1">
                        <Form.Label style={{color: "orange"}}>Full name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Full name"
                            value={fullName}
                            onChange={e=> setFullName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="textarea-1"
                    >
                        <Form.Label style={{color: "orange"}}>Nickname</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nickname"
                            value={nickName}
                            onChange={e=> setNickName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="textarea-2"
                    >
                        <Form.Label style={{color: "orange"}}>Birthday</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Birthday"
                            value={birthday}
                            onChange={e=> setBirthday(e.target.value)}
                            min="1940-01-01" max="2010-01-01"
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="textarea-3"
                    >
                        <Form.Label style={{color: "orange"}}>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={e=> setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="textarea-4"
                    >
                        <Form.Label style={{color: "orange"}}>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={e=> setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="textarea-5"
                    >
                        <Form.Label style={{color: "orange"}}>Repeat password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="********"
                            value={repeatPassword}
                            onChange={e=> setRepeatPassword(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer  style={{background: "rgb(40,40,40)"}}>
                <ReCAPTCHA
                    size="normal"
                    sitekey="6Let98ogAAAAAH3niinH0n8_di4vhssvE5YL_AuF"
                    onChange={() => setDisabledBtn(false)}
                />
                <Button variant="outline-secondary" onClick={handleCloseRegistrationModal}>
                    Close
                </Button>
                <Button disabled={disabledBtn} variant="outline-warning" onClick={sendDataToServer}>
                    Submit
                </Button>
            </Modal.Footer>
            {errorModalOpen && <ErrorModal errorText={errorText} visible={errorModalOpen} close={setErrorModalOpen}/>}
        </Modal>
    );
};

export default RegistrationModal;