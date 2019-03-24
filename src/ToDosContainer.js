import React, {Component} from 'react';
import SingleList from "./SingleList";
import AddAnotherList from "./AddAnotherList";
import {MDBContainer, MDBRow} from "mdbreact";
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class ToDosContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listsCollection: []
        };


        this.addNewList = this.addNewList.bind(this);
        this.removeList = this.removeList.bind(this);
        this.showLists = this.showLists.bind(this);
        this.cloneList = this.cloneList.bind(this);
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

    render() {
        return (

            <MDBContainer className="deck">
                <div class="navigationContainer">
                    <h4> Some Fancy Board Name</h4>
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
                        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="user" />User</span>}>
                            <Menu.Item key="setting:3">Log In</Menu.Item>
                            <Menu.Item key="setting:4">Register</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>

                <MDBRow>
                    {this.showLists()}
                    <AddAnotherList addList={this.addNewList} list={this.state.listsCollection}/>
                </MDBRow>
            </MDBContainer>

        );
    };
}

export default ToDosContainer;
