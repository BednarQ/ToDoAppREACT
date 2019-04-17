import React, { useState,useEffect } from 'react';
import {MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBRow,MDBCol,MDBBtnGroup } from 'mdbreact';
import 'antd/dist/antd.css';
import Board from "./Board";
import {apiHostName,avaliableUsers} from "./StaticResources";


function Project(props){

    const [activeBoard, setActiveBoard] = useState(props.activeBoard)
    const [loggedUser, setLoggedUser] = useState(props.user)
    const [project, setProject] = useState(props.project);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoggedUser(props.user);
    },[props.user]);

    useEffect(() => {
        setProject(props.project);
    },[props.project]);

    useEffect(() => {
        setActiveBoard(props.activeBoard);
    },[props.activeBoard]);


    return (
        <MDBContainer>
           <Board project = {project} board ={activeBoard} user={loggedUser}/>
        </MDBContainer>

    );
}

export default Project;