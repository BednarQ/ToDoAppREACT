import React, { useState,useEffect } from 'react';
import {MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBRow,MDBCol,MDBBtnGroup } from 'mdbreact';
import { message, Alert , Button } from 'antd/lib/index';
import classNames from "classnames";
import 'antd/dist/antd.css';
import {apiHostName,avaliableUsers} from "./StaticResources";


function NewBoard(props){

    const [isOpen,setOpen] = useState(true);
    const [project, setProject] = useState(props.currentProject);
    const [board, setBoard] = useState({name: '', projectId : props.currentProject.id, userId: props.user.id});
    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const toggle = () => {
        setOpen(!isOpen);
        props.toggle();
    };


    const create = () => {
        if(board.name === '') return setErrorMsg('Provide board name');

        setErrorMsg('');
        setLoading(true);
        const newBoard = {
            method: 'POST',
            body: JSON.stringify(board),
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        };
        //UNCOMMENT WITH HOST
        fetch(apiHostName+'boards', newBoard)
            .then((response) => {
                return response.json();
            })
            .then((jsonObject) => {
                board.id = jsonObject.id;
                props.addBoard(jsonObject);
                toggle();
                message.success('Board has been created.');
            })
            .catch((error) => {
                toggle();
                message.error(error.message === 'Failed to fetch' ? 'Connection cannot be established, please try again later' : error.message);
            });
    };

    const setName = (event) => {
        setBoard({...board,  name: event.target.value});
    };

    return (
        <MDBContainer>
            <MDBModal cascading isOpen={isOpen} className="addUserModal">
                <MDBModalHeader className="modal-dialog.cascading-modal text-center text-white lightGreen darken-3" titleClass="w-100" tag="h5" toggle={toggle}>
                    Create new Board for Project: {project.name}
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
                                    <i className="material-icons prefix">subject</i>
                                    <input id="list_name" type="text" className="" value={board.name} onChange={setName}/>
                                    <label htmlFor="list_name">Name</label>
                                </div>
                            </div>
                            <div className="row registerBtn">
                                <Button type="primary" loading={isLoading} className="lightGreen" onClick={create}>
                                    {isLoading ? 'Please wait' : 'Create project'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>

    );
}

export default NewBoard;