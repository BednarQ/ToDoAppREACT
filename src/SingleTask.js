import React, {useEffect, useState} from 'react';
import {MDBCard, MDBCardBody, MDBRow} from "mdbreact";
import classNames from "classnames";


function SingleTask(props) {

    const badgeStyle = 'priorityBadge priority' + props.taskObj.priority;
    const [showMenu, setShowMenu] = useState(false);
    const [hasLoaded, setLoaded] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [task, setTask] = useState({description: props.taskObj.description, listId: props.taskObj.listId, id: props.taskObj.id, isMoving : false});

    const toggleMenu = () => {
        if(isEdit) setEdit(false);
        setShowMenu(!showMenu);
        setLoaded(true);
    };

    const removeCurrentTask = () => {
        props.removeTask(props.taskObj.id);
    };

    const setDescription = (event) => {
        setTask({...task,description: event.target.value});
    };

    const toggleEdit = () => {
        setEdit(!isEdit);
    };

    useEffect(() => {
        if(localStorage.getItem(task.listId)){
            var allTasks = JSON.parse(localStorage.getItem(task.listId));
            for(var i=0; i<allTasks.length; i++){
                if(allTasks[i].id === task.id){
                    allTasks[i].description = task.description;
                }
            }
            localStorage.setItem(task.listId, JSON.stringify(allTasks));
        }
    },[task]);

    const onDragStart = (event, task) => {
        setTask({...task, isMoving: true});
    };

    const onDragOver=(event, task) => {
        setTask({...task, isMoving: false});
    };


    return (
        <MDBRow className={classNames({'hideElement' : task.isMoving })}>
            <MDBCard className='singleTaskContainer animated fadeInRight'  draggable="true" onDragStart={(e)=>onDragStart(e, task)} onDragOver={(e) => onDragOver(e, task)}>

                <MDBCardBody className="singleTaskBody">
                    <div className={classNames(
                        'editTitleContainer animated',
                        {'editMode': isEdit},
                        {'show fadeInRight': showMenu},
                        {'hideElement': !showMenu},
                        {'fadeOutLeft': !showMenu && hasLoaded})}>
                        <a href="#" title="Edit title"
                           className={classNames(
                               'show float-right btn-floating editTaskNameBtn waves-effect waves-light listMenuBtn lightBlue btn-smallx',
                               {'saveBtnColor': isEdit})}
                           onClick={toggleEdit}
                        >
                            <i className="align-middle material-icons">{isEdit ? 'save' : 'edit'}</i>
                        </a>
                    </div>
                    <div className={badgeStyle}/>
                    <div className="singleTaskMenuContainer">

                        <a href="#" onClick={toggleMenu}>
                            <i className="align-middle material-icons">menu</i>
                        </a>
                        <div className={classNames('singleTaskMenuButtonsContainer animated',
                            {'show fadeInRight': showMenu},
                            {'hideElement': !showMenu},
                            {'fadeOutLeft': !showMenu && hasLoaded})}>
                            <a href="#"
                                title="Remove task"
                                onClick={removeCurrentTask}
                                className={
                                    classNames(
                                        'float-right btn-floating btn-smallx waves-effect waves-light listMenuBtn lightRed'
                                    )
                                }
                            >
                                <i className="align-middle material-icons">remove</i>
                            </a>
                        </div>
                    </div>


                    <div className={classNames('taskDescription', {'collapse': isEdit})}>
                        {task.description}
                        {task.isMoving ? 'true' : 'false'}
                    </div>
                    <div className={classNames({'hide': !isEdit})}>
                        <div className="input-field editListName">
                            <textarea id="task_description" className="materialize-textarea" value={task.description}
                                      onChange={setDescription}/>
                            <label htmlFor="task_description" className="active">Description</label>
                        </div>
                    </div>
                    <br/>
                </MDBCardBody>
            </MDBCard>
        </MDBRow>
    );
}

export default SingleTask;