import React, {useEffect, useState} from 'react';
import {MDBCard, MDBCardBody, MDBRow,MDBCardTitle} from "mdbreact";
import { Avatar } from 'antd';
import classNames from "classnames";


function SingleTask(props) {

    const badgeStyle = 'priorityBadge priority' + props.taskObj.priority;
    const [showMenu, setShowMenu] = useState(false);
    const [hasLoaded, setLoaded] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [task, setTask] = useState(
        {
            title: props.taskObj.title,
            description: props.taskObj.description,
            listId: props.taskObj.listId,
            id: props.taskObj.id,
            assignee: props.taskObj.assignee,
            priority : props.taskObj.priority,
            type: props.taskObj.type,
            initials: props.taskObj.assignee.split(" ")[0].charAt(0) + props.taskObj.assignee.split(" ")[1].charAt(0)
        });

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


    return (
        <MDBRow>
            <MDBCard className='singleTaskContainer animated fadeInRight'>

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
                    <div className={badgeStyle}>
                        <i className="align-middle material-icons">{task.type === 'Issue' ? 'bug_report' : 'extension'}</i>
                    </div>
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
                        <p className="taskTitle">
                            {task.title}
                        </p>
                        <p className="taskDescription">
                            {task.description}
                        </p>
                        <p title={task.assignee} className="taskAssignee">
                            <Avatar className={'priority' + task.priority} style={{ color: '#FFFFFF'}}>{task.initials}</Avatar>
                        </p>

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