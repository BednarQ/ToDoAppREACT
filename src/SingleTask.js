import React, {Component, useEffect, useState} from 'react';
import { MDBCard, MDBCardBody,MDBCardTitle,MDBBadge, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem , MDBRow } from "mdbreact";
import classNames from "classnames";



function SingleTask(props){

    const badgeStyle = 'priorityBadge priority'+props.taskObj.priority;
    const animationStyle = 'singleTaskMenuButtonsContainer animated';
    const [showMenu, setShowMenu] = useState(false);
    const [hasLoaded, setLoaded] = useState(false);

    const toggleMenu =() =>{
        setShowMenu(!showMenu);
        setLoaded(true);
    };

    useEffect(() => {
        setShowMenu(false);
    }, [props])


    return(
            <MDBRow>
                <MDBCard className="singleTaskContainer">

                    <MDBCardBody className="singleTaskBody">
                        <div className={badgeStyle}/>
                        <div className="singleTaskMenuContainer">

                            <a href="#" onClick={toggleMenu}>
                                <i className="align-middle material-icons">menu</i>
                            </a>
                            <div className={classNames(animationStyle,
                                {'show fadeInRight' : showMenu},
                                {'hideElement' : !showMenu},
                                {'fadeOutLeft' : !showMenu && hasLoaded })}>
                                <a
                                    title="Remove task"
                                    onClick={props.removeTask.bind(null, props.taskObj.id)}
                                    className={
                                        classNames(
                                            'float-right btn-floating btn-smallx waves-effect waves-light listMenuBtn lightRed'
                                            )
                                    }
                                >
                                    <i className="align-middle material-icons">remove</i>
                                </a>
                                <a  title="Edit title"
                                    className={classNames('show float-right btn-floating btn-smallx waves-effect waves-light listMenuBtn lightBlue')}
                                >
                                    <i className="align-middle material-icons">edit</i>
                                </a>
                            </div>
                        </div>
                        {props.taskObj.description}
                        <br/>
                        </MDBCardBody>
                </MDBCard>
            </MDBRow>
    );
}

export default SingleTask;