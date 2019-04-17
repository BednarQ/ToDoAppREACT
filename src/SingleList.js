import React, {useState,useEffect } from 'react';
import SingleTask from "./SingleTask";
import AddTask from "./AddTask";
import {apiHostName} from "./StaticResources";
import {MDBCard, MDBCardBody, MDBCardTitle, MDBCol} from "mdbreact";
import {message,Spin} from "antd";
import classNames from "classnames";


function SingleList(props) {


    const [style, setStyle] = useState('singleLine animated fadeInRight');
    const [taskList, setTaskList] = useState([]);
    const [isHovered, setHovered] = useState(false);
    const [showModal, setModal] = useState(false);
    const [item, setItem] = useState(props.item);
    const [isEdit, setEdit] = useState(false);
    const [task, setTask] = useState(undefined);
    const [loggedUser, setLoggedUser] = useState(props.user);
    const [currentBoard, setCurrentBoard] = useState(props.board);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoggedUser(props.user);
    },[props.user]);
    useEffect(() => {
        getTasks();
    },[props.item]);

    useEffect(() => {
        setCurrentBoard(props.board);
        getTasks();

    },[props.board]);

    const getTasks = ()=>{
        fetch(apiHostName+'tasks')
            .then(result=>result.json())
            .then((items) =>{
                    if(items.length > 0){
                        setTaskList(items.filter((elem) => (elem.listId === item.id && elem.asignee.id === loggedUser.id)));
                        setLoading(false);
                    }
                }
            ).catch(error => message.error(error));
    }


    const addTask = (taskObj) => {
        setLoading(true);
        taskObj.ownerId = loggedUser.id;

        const createTask = {
            method: 'POST',
            body: JSON.stringify(taskObj),
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        };

        //UNCOMMENT WITH HOST
        fetch(apiHostName+'tasks', createTask)
            .then((response) => {
                return response.json();
            })
            .then((jsonObject) => {
                getTasks();
            })
            .catch((error) => {
                console.log('Error ocurred on task creation: '+error);
            });

    };

    const cloneCurrentList = () => {
        setLoading(true);
        if(props.clone(item, JSON.stringify(taskList))){
            getTasks();
            console.log('in final');
        };
    }

    const toggleHover = () => {
        setHovered(!isHovered);
    };

    const toggleModal = () => {
        setTask(undefined);
        setModal(!showModal);
    };

    const toggleEdit = () => {
        if(isEdit){
            setLoading(true);
            console.log(JSON.stringify(item));
            const updateColumn = {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            };

            //UNCOMMENT WITH HOST
            fetch(apiHostName+'columns', updateColumn)
                .then((response) => {
                    return response.json();
                })
                .then((jsonObject) => {
                    setLoading(false);
                    setEdit(false);
                })
                .catch((error) => {
                    message.error('Error occured on column update: '+error);
                });
        }else{
            setEdit(true);
        }


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
            return (<AddTask toggle={toggleModal} showMOdal={showModal} addTask={addTask} listId={item.id} taskObj={task} updateTask={updateTask}/>);
        }
    };

    const removeCurrentList = () => {
        setLoading(true);
        setStyle('singleLine animated fadeOutLeft');
        props.removeList(props.item.id);
    };

    const removeTask = (uID) => {
        setLoading(true);
        const spec = {
            method: 'DELETE',
            body: '',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        };
        //UNCOMMENT WITH HOST
        fetch(apiHostName+'tasks/'+uID, spec)
            .then((response) => {
                return response;
            })
            .then((jsonObject) => {
                getTasks();
                message.success('Task has been successfully deleted.');
            })
            .catch((error) => {
                message.error(error);
            });

    };

    const updateTask = (task) => {
        setLoading(true);
        const updateTask = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        };

        //UNCOMMENT WITH HOST
        fetch(apiHostName+'tasks', updateTask)
            .then((response) => {
                return response.json();
            })
            .then((jsonObject) => {
                getTasks();
            })
            .catch((error) => {
                console.log('Error ocurred on task creation: '+error);
            });

    };

    return (

            <MDBCol id={props.item.id} className={style} style={{left: props.index * 350 + 'px'}} >
                <Spin tip="Doing some magic..." size="large" spinning={loading}>
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


                        <div className={classNames({'hide' : loading}, 'listMenuBtnContainer')}>
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
                            {taskList.map((item) => {
                                return <SingleTask
                                    taskObj={item}
                                    removeTask={removeTask}
                                    key={JSON.stringify(item)}
                                    toggleEdit={editTask}
                                />
                            })}
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
                </Spin>
            </MDBCol>



    );

}

export default SingleList;