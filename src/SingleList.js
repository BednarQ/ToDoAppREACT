import React, { useState,useEffect } from 'react';
import SingleTask from "./SingleTask";
import AddTask from "./AddTask";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from "mdbreact";
import classNames from "classnames";


function SingleList(props){

    const [taskList, setTaskList] = useState([]);
    const [isHovered, setHovered] = useState(false);
    const [showModal, setModal] = useState(false);
    const [item, setItem] = useState({name : props.item.name});
    const [isEdit, setEdit] = useState(false);

    const addTask =(taskObj) =>{
        setTaskList([...taskList, taskObj]);
    };

    const toggleHover =() =>{
        setHovered(!isHovered);
    };

    const toggleModal =() =>{
        setModal(!showModal);
    };
    const toggleEdit =() =>{
        setEdit(!isEdit);
    };
    const setName =(event) =>{
        setItem({name : event.target.value});
    };

    const openModal =() =>{
        if(showModal){
            document.getElementById(props.item.id).classList.remove('fadeInRight');
            return (<AddTask toggle={toggleModal} showMOdal={showModal} addTask={addTask}/>);
        }
    }

    const removeCurrentList = () => {
        props.removeList(props.item.id);
    };

    const removeTask = (uID) => {
        setTaskList(taskList.filter(item => item.id !== uID));
    };

    const showTasks = () => {
        return(
            taskList.map((item, index) => {
                return <SingleTask
                    taskObj={item}
                    removeTask ={removeTask}
                    key = {index}
                />;
            })
        );
    };

    useEffect(() => {
            setItem({name : props.item.name});
            setTaskList(props.task)
        }, [props])


        return(
            <MDBCol id={props.item.id} className='singleLine animated fadeInRight'>
                <MDBCard >
                    <MDBCardTitle>
                        <div className={classNames('lineItemTitle',{'collapse' : isEdit})}>
                            {item.name}
                        </div>
                        <div className={classNames({'hide' : !isEdit})}>
                            <div className="input-field editListName">
                                <input id="list_name" type="text" className="" value={item.name} onChange={setName}/>
                                <label htmlFor="list_name" className="active">List name</label>
                            </div>
                        </div>


                        <div className="listMenuBtnContainer">
                            <a title="Remove list" onClick={removeCurrentList} className={classNames('float-right btn-floating btn-small waves-effect waves-light listMenuBtn lightRed')}>
                                <i className="align-middle material-icons">remove</i>
                            </a>
                            <a title="Clone list" className={classNames('float-right btn-floating btn-small waves-effect waves-light listMenuBtn lightPurple')}>
                                <i className="align-middle material-icons">call_split</i>
                            </a>
                            <a  title={!isEdit ? 'Edit title' : 'Save changes'} onClick={toggleEdit} className={classNames('float-right btn-floating btn-small waves-effect waves-light listMenuBtn lightBlue',{'saveEditListName' : isEdit})}>
                                <i className="align-middle material-icons">{!isEdit ? 'edit' : 'save'}</i>
                            </a>
                        </div>

                    </MDBCardTitle>
                    <MDBCardBody className="">
                        <div className="tasksContainer">
                            {showTasks()}
                        </div>
                        {/*<div className={classNames({'addNewTaskList' : this.state.tasksList.length > 0},{'addNewTaskEmpty' : this.state.tasksList.length === 0})}>
                            <a title="Add new task" className={classNames('btn-floating waves-effect waves-light lightGreen', {'pulse': this.state.isHovered})} onClick={this.toggleModal} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                                <i className="align-middle material-icons">add</i>
                            </a>
                        </div>*/}
                        <div className={classNames({'addNewTaskList' : taskList.length > 0},{'addNewTaskEmpty' : taskList.length === 0})}>
                            <a title="Add new task" className={classNames('btn-floating waves-effect waves-light lightGreen', {'pulse': isHovered})} onClick={toggleModal} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                                <i className="align-middle material-icons">add</i>
                            </a>
                        </div>
                    </MDBCardBody>
                </MDBCard>
                {openModal()}
            </MDBCol>


        );

}

export default SingleList;