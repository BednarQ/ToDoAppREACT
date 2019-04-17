import React, { useState,useEffect } from 'react';
import {MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBRow,MDBCol,MDBBtnGroup } from 'mdbreact';
import { message, Alert , Button,Avatar  } from 'antd';
import classNames from "classnames";
import 'antd/dist/antd.css';
import {apiHostName} from "./StaticResources";

function CreateUser(props){

    const [isOpen,setOpen] = useState(true);
    const [user, setUser] = useState({password: '', email: '',login: '',firstName : '',lastName: ''});
    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const toggle = () => {
        setOpen(!isOpen);
        props.toggle();
    };

    const createUser = () => {
        if(user.firstName === '') return setErrorMsg('Provide first name');
        if(user.lastName === '') return setErrorMsg('Provide last name');

        var passwordFormat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        var emaiLFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(user.password.length < 8) return setErrorMsg('Password must contain at least 8 characters');
        if(!passwordFormat.test(user.password)) return setErrorMsg('Password must contain at least one special character');
        if(user.email === '') return setErrorMsg('Provide email address');
        if(!emaiLFormat.test(user.email)) return setErrorMsg('Please provide valid email address');

        var firstName = user.firstName;
        var lastName = user.lastName;
        setErrorMsg('');
        setLoading(true);
        var userToCreate = {name: firstName + ' ' + lastName, login: user.login, password: user.password, email: user.email};
        console.log(userToCreate);
        const createUser = {
            method: 'POST',
            body: JSON.stringify(userToCreate),
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        };
        //UNCOMMENT WITH HOST
        fetch(apiHostName+'users', createUser)
            .then((response) => {
                return response;
            })
            .then((jsonObject) => {
                toggle();
                message.success('Your account has been created. Now you can use provided credentials to log in.');
            })
            .catch((error) => {
                toggle();
                message.error(error.message === 'Failed to fetch' ? 'Connection cannot be established, please try again later' : error.message);
            });

    }

    const setLogin = (event) => {
        setUser({...user, login: event.target.value});
    }
    const setFirstName = (event) => {
        setUser({...user, firstName: event.target.value});
    }
    const setLastName = (event) => {
        setUser({...user, lastName: event.target.value});
    }
    const setPassword = (event) => {
        setUser({...user,  password: event.target.value});
    }
    const setEmail = (event) => {
        setUser({...user,  email: event.target.value});
    }

    return (
        <MDBContainer>
            <MDBModal cascading isOpen={isOpen} className="addUserModal">
                <MDBModalHeader className="modal-dialog.cascading-modal text-center text-white lightGreen darken-3" titleClass="w-100" tag="h5" toggle={toggle}>
                    Register
                </MDBModalHeader>
                <MDBModalBody className="text-center">
                    <Alert
                        message="Error"
                        description={errorMsg}
                        type="error"
                        showIcon
                        className={classNames('text-align-left',{'hide' : errorMsg === ''})}
                    />
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">done</i>
                                    <input id="list_name" type="text" className="" value={user.firstName} onChange={setFirstName}/>
                                    <label htmlFor="list_name">First Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">done_outline</i>
                                    <input id="list_name" type="text" className="" value={user.lastName} onChange={setLastName}/>
                                    <label htmlFor="list_name">Last Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">face</i>
                                    <input id="list_name" type="text" className="" value={user.login} onChange={setLogin}/>
                                    <label htmlFor="list_name">Username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">email</i>
                                    <textarea id="icon_prefix2" className="materialize-textarea" value={user.email} onChange={setEmail}/>
                                    <label htmlFor="icon_prefix2">E-Mail</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="icon_prefix2" className="materialize-textarea" value={user.password} onChange={setPassword} type="password"/>
                                    <label htmlFor="icon_prefix2">Password</label>
                                </div>
                            </div>
                            <div className="row registerBtn">
                                <Button type="primary" loading={isLoading} onClick={createUser} className="lightGreen">
                                    {isLoading ? 'Please wait' : 'Register'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>

    );
}

export default CreateUser;