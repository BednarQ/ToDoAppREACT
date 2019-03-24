import React, { Component } from 'react';
import {MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBRow,MDBCol,MDBBtnGroup } from 'mdbreact';
import { AutoComplete } from 'antd';
import classNames from "classnames";
import 'antd/dist/antd.css';

const avaliableUsers = [
    'Mateusz Bednarek',
    'Mateusz Wolak-Ksiazek',
    'Jakub Sołtys' ,
    'Piotr Gagatek',
    'Andrzej Jarzyna'
];


class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            taskDesc : '',
            taskTitle : '',
            taskPriority : 'High',
            taskType : 'Issue',
            taskAssignee : ''
        };

        this.toggle = this.toggle.bind(this);
        this.createNewTask = this.createNewTask.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setPriority = this.setPriority.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setType = this.setType.bind(this);
        this.setAssignee = this.setAssignee.bind(this);

    }






    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });

        if(this.state.modal) this.props.toggle();
    };

    createNewTask(){

        this.props.addTask({
            title: this.state.taskTitle,
            description: this.state.taskDesc,
            priority: this.state.taskPriority,
            type:this.state.taskType,
            assignee: this.state.taskAssignee ,
            id : Math.random()*100+Math.random()*100,
            listId: this.props.listId});

        this.toggle();
    };
    componentDidMount() {
       this.setState({modal : !this.props.showModal});
    };

    setDescription(event){
        this.setState({taskDesc: event.target.value});
    };
    setPriority(event){
        this.setState({taskPriority: event.target.id});
    }
    setType(event){
        this.setState({taskType: event.target.id});
    };
    setTitle(event){
        this.setState({taskTitle: event.target.value});
    }
    setAssignee(value, option){
        this.setState({taskAssignee: value});
    }


    render() {
        return (
            <MDBContainer>
                <MDBModal cascading isOpen={this.state.modal} className="addTaskModal">
                    <MDBModalHeader className="modal-dialog.cascading-modal text-center text-white lightGreen darken-3" titleClass="w-100" tag="h5" toggle={this.toggle} >
                           New task
                    </MDBModalHeader>

                    <p className="text-lg-left label">Priority</p>
                    <MDBRow>
                        <MDBCol>
                            <MDBBtnGroup>
                                <MDBBtn id="High" onClick={this.setPriority} className={classNames({'activeBtn' : this.state.taskPriority === 'High'})}>High</MDBBtn>
                                <MDBBtn id="Modern" onClick={this.setPriority} className={classNames({'activeBtn' : this.state.taskPriority === 'Modern'})}>Modern</MDBBtn>
                                <MDBBtn id="Low" onClick={this.setPriority} className={classNames({'activeBtn' : this.state.taskPriority === 'Low'})}>Low</MDBBtn>
                                <MDBBtn id="Optional" onClick={this.setPriority} className={classNames({'activeBtn' : this.state.taskPriority === 'Optional'})}>Optional</MDBBtn>
                            </MDBBtnGroup>
                        </MDBCol>
                    </MDBRow>
                    <p className="text-lg-left label">Type</p>
                    <MDBRow>
                        <MDBCol>
                            <MDBBtnGroup>
                                <MDBBtn id="Issue" onClick={this.setType} className={classNames({'activeBtn' : this.state.taskType === 'Issue'})}>Issue</MDBBtn>
                                <MDBBtn id="Feature" onClick={this.setType} className={classNames({'activeBtn' : this.state.taskType === 'Feature'})}>Feature</MDBBtn>
                            </MDBBtnGroup>
                        </MDBCol>
                    </MDBRow>
                    <MDBModalBody className="text-center">
                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s6">
                                        <i className="material-icons prefix">title</i>
                                        <input id="list_name" type="text" className="" value={this.state.taskTitle} onChange={this.setTitle}/>
                                        <label htmlFor="list_name">Title</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <i className="material-icons prefix">comment</i>
                                        <textarea id="icon_prefix2" className="materialize-textarea" value={this.state.taskDesc} onChange={this.setDescription}/>
                                        <label htmlFor="icon_prefix2">Meaningful description</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <i className="material-icons prefix userIcon">face</i>

                                    <div className="input-field col s6">
                                        <AutoComplete
                                            id = "userInput"
                                            dataSource={avaliableUsers}
                                            placeholder="Assignee"
                                            onSelect = {this.setAssignee}
                                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="row">



                        </div>


                    </MDBModalBody>
                    <MDBModalFooter className="noBackgroundColor noBorder">
                        <a href="#" className="btn-floating btn-medium waves-effect waves-light lightRed"><i
                            className="material-icons" onClick={this.toggle}>close</i></a>
                        <a href="#" className="btn-floating btn-medium waves-effect waves-light lightGreen"><i
                            className="material-icons" onClick={this.createNewTask}>add</i></a>

                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default AddTask;