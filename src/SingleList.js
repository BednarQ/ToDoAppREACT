import React, {useState,useEffect } from 'react';
import SingleTask from "./SingleTask";
import AddTask from "./AddTask";
import {MDBCard, MDBCardBody, MDBCardTitle, MDBCol} from "mdbreact";
import classNames from "classnames";


function SingleList(props) {

    const initialState = () => {
        if(localStorage.getItem(props.item.id)){
            return JSON.parse(localStorage.getItem(props.item.id));
        }
        return [];
    };

    const [style, setStyle] = useState('singleLine animated fadeInRight');
    const [taskList, setTaskList] = useState(initialState);
    const [isHovered, setHovered] = useState(false);
    const [showModal, setModal] = useState(false);
    const [item, setItem] = useState({name: props.item.name, id: props.item.id});
    const [isEdit, setEdit] = useState(false);


    useEffect(() => {
        localStorage.setItem(item.id, JSON.stringify(taskList));
    },[taskList]);

    useEffect(() => {
        if(localStorage.getItem('allLists')){
            var allLists = JSON.parse(localStorage.getItem('allLists'));
            for(var i=0; i<allLists.length; i++){
                if(allLists[i].id === item.id){
                    allLists[i].name = item.name;
                }
            }
            localStorage.setItem('allLists', JSON.stringify(allLists));
        }
    },[item]);


    const addTask = (taskObj) => {
        console.log(taskObj.listId);
        setTaskList([...taskList, taskObj]);
    };

    const toggleHover = () => {
        setHovered(!isHovered);
    };

    const toggleModal = () => {
        setModal(!showModal);
    };
    const toggleEdit = () => {
        setEdit(!isEdit);
    };
    const setName = (event) => {
        setItem({...item, name: event.target.value});
    };

    const openModal = () => {
        if (showModal) {
            document.getElementById(props.item.id).classList.remove('fadeInRight');
            return (<AddTask toggle={toggleModal} showMOdal={showModal} addTask={addTask} listId={props.item.id}/>);
        }
    };

    const removeCurrentList = () => {
        setStyle('singleLine animated fadeOutLeft');
        props.removeList(props.item.id);
    };

    const removeTask = (uID) => {
        setTaskList(taskList.filter(item => item.id !== uID));
    };

    const showTasks = () => taskList.map((item) => (
            <SingleTask
                taskObj={item}
                removeTask={removeTask}
                key={item.id}
            />
        )
    );

    return (
        <MDBCol id={props.item.id} className={style} style={{left: props.index * 350 + 'px'}} >
            <MDBCard>
                <MDBCardTitle>
                    <div className={classNames('lineItemTitle', {'collapse': isEdit})}>
                        {item.name}

                    </div>
                    <div className={classNames({'hide': !isEdit})}>
                        <div className="input-field editListName">
                            <input id="list_name" type="text" className="" value={item.name} onChange={setName}/>
                            <label htmlFor="list_name" className="active">List name</label>
                        </div>
                    </div>


                    <div className={classNames('listMenuBtnContainer')}>
                        <a href="#" title="Remove list" onClick={removeCurrentList}
                           className={classNames('float-right btn-floating btn-small waves-effect waves-light listMenuBtn lightRed')}>
                            <i className="align-middle material-icons">remove</i>
                        </a>
                        <a href="#" title="Clone list"
                           className={classNames('float-right btn-floating btn-small waves-effect waves-light listMenuBtn lightPurple')}>
                            <i className="align-middle material-icons">call_split</i>
                        </a>
                        <a href="#" title={!isEdit ? 'Edit title' : 'Save changes'} onClick={toggleEdit} className={classNames(
                            'float-right btn-floating btn-small waves-effect waves-light listMenuBtn lightBlue',
                            {'saveEditListName saveBtnColor': isEdit}
                        )}
                        >
                            <i className="align-middle material-icons">{!isEdit ? 'edit' : 'save'}</i>
                        </a>
                    </div>

                </MDBCardTitle>
                <MDBCardBody className="">
                    <div className="tasksContainer">
                        {showTasks()}
                    </div>
                    <div
                        className={classNames({'addNewTaskList': taskList.length > 0}, {'addNewTaskEmpty': taskList.length === 0})}>
                        <a title="Add new task"
                           className={classNames('btn-floating waves-effect waves-light lightGreen', {'pulse': isHovered})}
                           onClick={toggleModal} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
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