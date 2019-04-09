import React, { useState,useEffect } from 'react';
import {MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBRow,MDBCol,MDBBtnGroup } from 'mdbreact';
import { message, Alert , Button } from 'antd';
import classNames from "classnames";
import 'antd/dist/antd.css';
import {apiHostName} from "./StaticResources";

function LogIn(props){

    const [isOpen,setOpen] = useState(true);
    const [user, setUser] = useState({name : '', password: ''});
    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const toggle = () => {
        setOpen(!isOpen);
        props.toggle();
    };


    const login = () => {
        if(user.name === '') return setErrorMsg('Provide username');
        if(user.password === '') return setErrorMsg('Provide password');

        setErrorMsg('');
        setLoading(true);

        //UNCOMMENT WITH HOST
       /* fetch(apiHostName+'/users')
            .then(result=>result.json())
            .then(item => props.setUser(item))
            .catch((error) => {
                toggle();
                message.error(error.message === 'Failed to fetch' ? 'Connection cannot be established, please try again later' : error.message);
            });*/

    };

    const setName = (event) => {
        setUser({...user,  name: event.target.value});
    };
    const setPassword = (event) => {
        setUser({...user,  password: event.target.value});
    };

    return (
        <MDBContainer>
            <MDBModal cascading isOpen={isOpen} className="addUserModal">
                <MDBModalHeader className="modal-dialog.cascading-modal text-center text-white lightGreen darken-3" titleClass="w-100" tag="h5" toggle={toggle}>
                    Log In
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
                                    <i className="material-icons prefix">face</i>
                                    <input id="list_name" type="text" className="" value={user.name} onChange={setName}/>
                                    <label htmlFor="list_name">Username</label>
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
                                <Button type="primary" loading={isLoading} onClick={login} className="lightGreen">
                                    {isLoading ? 'Please wait' : 'Log In'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>

    );
}

export default LogIn;