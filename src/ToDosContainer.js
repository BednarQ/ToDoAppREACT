import React, {Component} from 'react';
import SingleList from "./SingleList";
import AddAnotherList from "./AddAnotherList";
import {MDBContainer, MDBRow} from "mdbreact";
import { Menu, Icon } from 'antd';
import CreateUser from "./CreateUser";
import LogIn from "./LogIn";
import classNames from "classnames";

const SubMenu = Menu.SubMenu;


class ToDosContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board : {name : 'Some test name'},
            listsCollection: [],
            showRegister : false,
            showLogin : false,
            user : {name:'Mateusz Bednarek'}
        };


        this.addNewList = this.addNewList.bind(this);
        this.removeList = this.removeList.bind(this);
        this.showLists = this.showLists.bind(this);
        this.cloneList = this.cloneList.bind(this);
        this.openRegister = this.openRegister.bind(this);
        this.openLogin = this.openLogin.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.setUser = this.setUser.bind(this);
    }

    componentDidMount(){
        const savedLists = localStorage.getItem('allLists');
        if(savedLists){
            this.setState({listsCollection : JSON.parse(savedLists)});
        }
    };

    componentDidUpdate(){
        localStorage.setItem('allLists', JSON.stringify(this.state.listsCollection));
    };

    addNewList(name) {
        var list = this.state.listsCollection;
        list = [...list, ({name: name, id: Math.random() * 100 + Math.random() * 100, tasksList : []})];
        this.setState({listsCollection: list});

    };

    removeList(uID) {
        this.setState({
            listsCollection: this.state.listsCollection.filter(el => el.id !== uID)
        });

    };

    cloneList(passedList, relatedTasks){
        var currentList = this.state.listsCollection;

        var newList = {name: passedList.name+'_copy', id: Math.random() * 100 + Math.random() * 100};

        var passedTaskList = JSON.parse(relatedTasks);

        passedTaskList.map(function (item, index) {
            item.listId = newList.id;
            item.id =  Math.random()*100+Math.random()*100
        });

        newList.taskList = passedTaskList;

        currentList.splice(passedList.index + 1, 0 , newList);
        this.setState({listsCollection : currentList});
    }

    showLists() {
        let scope = this;
        return (
            this.state.listsCollection.map(function (item, index) {
                return <SingleList item={item} key={item.id} removeList={scope.removeList} clone={scope.cloneList} tasks={item.taskList} index={index}/>
            })
        );
    };

    toggleRegister(){
        this.setState({
            showRegister: !this.state.showRegister
        });
    };

    toggleLogin(){
        this.setState({
            showLogin: !this.state.showLogin
        });
    };

    openRegister(){
        if (this.state.showRegister) {
            return (<CreateUser toggle={this.toggleRegister} showModal={this.state.showRegister}/>);
        }
    }
    openLogin(){
        if (this.state.showLogin) {
            return (<LogIn toggle={this.toggleLogin} showModal={this.state.showLogin}/>);
        }
    }

    setUser(user){
        this.setState({user : this.state.user.name !== '' ? {name : ''} : user});
    }

    render() {
        return (

            <MDBContainer className="deck">
                <div className="navigationContainer">
                    <h4>{this.state.board.name}</h4>
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                        className="navigation"
                    >
                        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="pic-center" />Board</span>}>
                            <Menu.Item key="setting:3">Create</Menu.Item>
                            <Menu.Item key="setting:4">Remove</Menu.Item>
                        </SubMenu>
                        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="user" />{this.state.user.name === ''? 'User' : this.state.user.name}</span>}>
                            <Menu.Item key="setting:5" onClick={this.toggleLogin} className={classNames({'hide' : this.state.user.name !== ''})}>Log In</Menu.Item>
                            <Menu.Item key="setting:6" onClick={this.setUser} className={classNames({'hide' : this.state.user.name === ''})}>Log Out</Menu.Item>
                            <Menu.Item key="setting:7" onClick={this.toggleRegister} className={classNames({'hide' : this.state.user.name !== ''})}>Register</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>

                <MDBRow>
                    {this.showLists()}
                    <AddAnotherList addList={this.addNewList} list={this.state.listsCollection}/>
                </MDBRow>

                {this.openRegister()}
                {this.openLogin()}
            </MDBContainer>

        );
    };
}

export default ToDosContainer;
