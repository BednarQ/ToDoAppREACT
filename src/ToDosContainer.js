import React, { useState,useEffect } from 'react';
import {MDBContainer, MDBRow} from "mdbreact";
import {Menu, Icon, message,Alert} from 'antd';
import CreateUser from "./CreateUser";
import LogIn from "./LogIn";
import NewBoard from "./NewBoard";
import Project from "./Project";
import classNames from "classnames";
import {apiHostName} from "./StaticResources";
import NewProject from "./NewProject";
import InitialPopup from "./InitialPopup"

const SubMenu = Menu.SubMenu;


function ToDosContainer(props) {
    const [columns, setColumns] = useState([]);

    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState({});

    const [boards, setBoards] = useState([]);
    const [currentBoard, setCurrentBoard] = useState({});

    const [user, setUser] = useState({});

    const [showRegister, isRegister] = useState(false);
    const [showLogin, isLogin] = useState(false);
    const [showInitialPopup, isInitialPopup] = useState(false);
    const [showBoard, isBoard] = useState(false);
    const [showProject, isProject] = useState(false);


    useEffect(() => {
        fetch(apiHostName+'projects')
            .then(result=>result.json())
            .then((items) =>{
                    setProjects(items);
            }
            ).catch(error => message.error(error))
    },[]);

    useEffect(() => {
        if(currentProject.id != undefined){
            fetch(apiHostName+'boards')
                .then(result=>result.json())
                .then((items) =>{
                        if(items.length > 0){
                            setBoards(items.filter((elem) =>{
                                return (elem.projectId === currentProject.id)
                            } ));
                        }
                    }
                ).catch(error => message.error(error))
        }

    },[currentProject]);

    useEffect( () => {
        if(user.id === undefined){
            toggleInitialPopup(true);
        }
    },[user]);


    const addProject = (newProject) => {
        setProjects([...projects, newProject]);
    };
    const addBoard = (newBoard) => {
        setBoards([...boards, newBoard]);
    };

    const toggleRegister = () =>{
        isRegister(!showRegister)
    };

    const toggleLogin = () =>{
        isLogin(!showLogin)
    };
    const toggleBoard = () =>{
        isBoard(!showBoard)
    };
    const toggleProject = () =>{
        isProject(!showProject)
    };
    const toggleInitialPopup = () =>{
        isInitialPopup(!showInitialPopup)
    };
    const openInitialPopup = () =>{
        if (showInitialPopup) {
            return (<InitialPopup toggle={toggleInitialPopup} showModal={showInitialPopup} toggleRegister={toggleRegister} toggleLogin={toggleLogin}/>);
        }
    };

    const openRegister = () =>{
        if (showRegister) {
            return (<CreateUser toggle={toggleRegister} showModal={showRegister}/>);
        }
    };
    const openLogin = () =>{
        if (showLogin) {
            return (<LogIn toggle={toggleLogin} showModal={showLogin} setUser={setActiveUser}/>);
        }
    };
    const openBoard = () =>{
        if (showBoard) {
            return (<NewBoard toggle={toggleBoard} showModal={showBoard} user={user} currentProject={currentProject} addBoard = {addBoard}/>);
        }
    };
    const openProject = () =>{
        if (showProject) {
            return (<NewProject toggle={toggleProject} showModal={showProject} setUser={setActiveUser} addProject = {addProject}/>);
        }
    };


    const setActiveUser = (user) =>{
        setUser(user);
    };
    const logOut = () =>{
        setUser({});
        setCurrentBoard({});
        setCurrentProject({});
    }
    const handleMenuAction = (item) =>{

        if(item.key.includes('project_')){
            for(var i in projects){
                if(projects[i].id == item.key.split('_')[1]){
                    setCurrentProject(projects[i]);
                    setCurrentBoard({});
                    break;
                }
            }
        }else if(item.key.includes('board_')){
            for(var i in boards){
                if(boards[i].id == item.key.split('_')[1]){
                    setCurrentBoard(boards[i]);
                }
            }
        }else if(item.key === 'deleteCurrentProject'){
            const spec = {
                method: 'DELETE',
                body: '',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            };
            //UNCOMMENT WITH HOST
            fetch(apiHostName+'projects/'+currentProject.id, spec)
                .then((response) => {
                    return response;
                })
                .then((jsonObject) => {
                    setProjects(projects.filter(item => item.id !== currentProject.id));
                    setCurrentProject({});
                    message.success('Project has been successfully deleted.');
                })
                .catch((error) => {
                    message.error(error);
                });
        }else if(item.key === 'deletecurrentboard'){
            const spec = {
                method: 'DELETE',
                body: '',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            };
            //UNCOMMENT WITH HOST
            fetch(apiHostName+'boards/'+currentBoard.id, spec)
                .then((response) => {
                    return response;
                })
                .then((jsonObject) => {
                    setBoards(boards.filter(item => item.id !== currentBoard.id));
                    setCurrentBoard({});
                    message.success('Board has been successfully deleted.');
                })
                .catch((error) => {
                    message.error(error);
                });
        }
    };


        return (

            <MDBContainer className="deck">
                <div className="navigationContainer">
                    <h4>{currentProject.name} - {currentBoard.name}</h4>
                    <Menu
                        mode="horizontal"
                        className="navigation"
                        defaultSelectedKeys={["project_"+currentProject.id]}
                        onClick={handleMenuAction}
                    >
                        <SubMenu className={classNames({'hide' : user.id === undefined})} title={<span className="submenu-title-wrapper" ><Icon type="form" />Project</span>}>
                            <Menu.ItemGroup key="projects" title="Existing projects" className={classNames({'hide' : projects.length === 0})}>
                            {
                               projects.map(function(item, i){
                                return <Menu.Item
                                        key={"project_"+item.id}
                                        >
                                    {item.name}
                                    </Menu.Item>
                                })
                            }
                            </Menu.ItemGroup>
                            <Menu.Item key="createProject" onClick={toggleProject}>Create new project</Menu.Item>
                            <Menu.Item key="deleteCurrentProject" className={classNames({'hide' : currentProject.id === undefined})}>Delete current project</Menu.Item>

                        </SubMenu>
                        <SubMenu className={classNames({'hide' : (user.id === undefined || currentProject.id === undefined)})} title={<span className="submenu-title-wrapper"><Icon type="pic-center" />Board</span>}>
                            <Menu.ItemGroup key="projects" title="Existing projects" className={classNames({'hide' : boards.length === 0})}>
                                {
                                    boards.map(function(item, i){
                                        return <Menu.Item
                                            key={"board_"+item.id}
                                        >
                                            {item.name}
                                        </Menu.Item>
                                    })
                                }
                            </Menu.ItemGroup>
                            <Menu.Item key="createBoard" onClick={toggleBoard} >Create new board</Menu.Item>
                            <Menu.Item key="deletecurrentboard">Delete current board</Menu.Item>
                        </SubMenu>
                        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="user" />{user.id === undefined? 'User' :user.name}</span>}>
                            <Menu.Item key="setting:5" onClick={toggleLogin} className={classNames({'hide' :user.id !== undefined})}>Log In</Menu.Item>
                            <Menu.Item key="setting:6" className={classNames({'hide' :user.id === undefined})} onClick={logOut}>Log Out</Menu.Item>
                            <Menu.Item key="setting:7" onClick={toggleRegister} className={classNames({'hide' : user.id !== undefined})}>Register</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>

                <MDBRow>
                    <div className={classNames({'hide' : currentBoard.id === undefined || user.id === undefined} )}>
                        <Project project = {currentProject} activeBoard = {currentBoard} user = {user}/>
                    </div>

                </MDBRow>

                {openRegister()}
                {openLogin()}
                {openProject()}
                {openBoard()}
                {openInitialPopup()}
            </MDBContainer>

        );
}

export default ToDosContainer;
