import React, { useState,useEffect } from 'react';
import {MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBRow,MDBCol,MDBBtnGroup } from 'mdbreact';
import { message, Alert , Button ,Typography } from 'antd';
import classNames from "classnames";
import 'antd/dist/antd.css';
import {apiHostName,avaliableUsers} from "./StaticResources";


function InitialPopup(props){

    const [isOpen,setOpen] = useState(true);

    const toggle = () => {
        setOpen(!isOpen);
        props.toggle();
    };

    const login = () =>{
        props.toggleLogin();
        toggle();
    }

    const register = () =>{
        props.toggleRegister();
        toggle();
    }



    return (
        <MDBContainer>
            <MDBModal cascading isOpen={isOpen} className="addUserModal">
                <MDBModalHeader className="modal-dialog.cascading-modal text-center text-white lightGreen darken-3" titleClass="w-100" tag="h5" toggle={toggle}>
                   Login or Register
                </MDBModalHeader>
                <MDBModalBody className="text-center">
                    <div className="row">
                        <form className="col s12">
                            <div className="inlineButtons">
                                <div className="row paddingBtns">
                                    <Button type="primary" shape="round" size="large" onClick={login} className="lightGreen">
                                       Log in
                                    </Button>
                                </div>
                                <div className="row paddingBtns">
                                    <Button type="primary" shape="round" size="large" onClick={register} className="">
                                        Register
                                    </Button>
                                </div>
                            </div>
                            {/*<div className="row">*/}
                            {/*    <div className="input-field col s6">*/}
                            {/*        <i className="material-icons prefix">face</i>*/}
                            {/*        <input id="list_name" type="text" className="" value={user.name} onChange={setName}/>*/}
                            {/*        <label htmlFor="list_name">Username</label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </form>
                    </div>
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>

    );
}

export default InitialPopup;