import React, {useState,useEffect } from 'react';
import SingleTask from "./SingleTask";
import AddTask from "./AddTask";
import {apiHostName} from './StaticResources';
import {MDBCard, MDBCardBody, MDBCardTitle, MDBCol} from "mdbreact";
import classNames from "classnames";


function SingleList(props) {

    const initialState = () => {
        if(localStorage.getItem(props.item.id)){
            return JSON.parse(localStorage.getItem(props.item.id));
        }
        return props.tasks === undefined ? [] : props.tasks;
    };

    const [style, setStyle] = useState('singleLine animated fadeInRight');
    const [taskList, setTaskList] = useState(initialState);
    const [isHovered, setHovered] = useState(false);
    const [showModal, setModal] = useState(false);
    const [item, setItem] = useState({name: props.item.name, id: props.item.id, index: props.index});
    const [isEdit, setEdit] = useState(false);
    const [task, setTask] = useState(undefined);


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
        setTaskList([...taskList, taskObj]);

        const createTask = {
            method: 'POST',
            body: JSON.stringify(taskObj),
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        };

        //UNCOMMENT WITH HOST
       /* fetch(apiHostName+'tasks', createTask)
            .then((response) => {
                return response.json();
            })
            .then((jsonObject) => {
                console.log('created task: '+jsonObject.id);
            })
            .catch((error) => {
                console.log(error);
            });*/
    };

    const cloneCurrentList = () => {
        props.clone(item, JSON.stringify(taskList));
    }

    const toggleHover = () => {
        setHovered(!isHovered);
    };

    const toggleModal = () => {
        setTask(undefined);
        setModal(!showModal);
    };

    const toggleEdit = () => {
        setEdit(!isEdit);
    };
    const setName = (event) => {
        setItem({...item, name: event.target.value});
    };

    const editTask = (task) => {
        setTask(task);
        setModal(true);
    }

    const openModal = () => {
        if (showModal) {
            document.getElementById(props.item.id).classList.remove('fadeInRight');
            return (<AddTask toggle={toggleModal} showMOdal={showModal} addTask={addTask} listId={props.item.id} taskObj={task} updateTask={updateTask}/>);
        }
    };

    const removeCurrentList = () => {
        setStyle('singleLine animated fadeOutLeft');
        props.removeList(props.item.id);
    };

    const removeTask = (uID) => {
        setTaskList(taskList.filter(item => item.id !== uID));
    };

    const updateTask = (task) => {
        for(var elem in taskList){
            if(taskList[elem].id === task.id) {
                taskList[elem] = task;
                break;
            }
        }
    }

    const showTasks = () => taskList.map((item) => (
            <SingleTask
                taskObj={item}
                removeTask={removeTask}
                key={JSON.stringify(item)}
                toggleEdit = {editTask}
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
                        <a title="Remove list" onClick={removeCurrentList}
                           className={classNames('float-right btn-floating btn-small waves-effect waves-light listMenuBtn lightRed')}>
                            <i className="align-middle material-icons">remove</i>
                        </a>
                        <a title="Clone list" onClick={cloneCurrentList}
                           className={classNames('float-right btn-floating btn-small waves-effect waves-light listMenuBtn lightPurple')}>
                            <i className="align-middle material-icons">call_split</i>
                        </a>
                        <a title={!isEdit ? 'Edit title' : 'Save changes'} onClick={toggleEdit} className={classNames(
                            'float-right btn-floating btn-small waves-effect waves-light listMenuBtn lightBlue',
                            {'saveEditListName saveBtnColor': isEdit},
                            {'hide' : (isEdit && item.name === '') }
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
                        className={classNames({'hide' : isEdit},{'addNewTaskList': taskList.length > 0}, {'addNewTaskEmpty': taskList.length === 0})}>
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