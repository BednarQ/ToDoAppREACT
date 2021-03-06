import React, { Component } from 'react';
import {MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBRow,MDBCol,MDBBtnGroup } from 'mdbreact';
import { Alert,AutoComplete } from 'antd';
import classNames from "classnames";
import 'antd/dist/antd.css';
import {apiHostName} from './StaticResources';

//COMMENT WITH HOST

//UNCOMMENT WITH HOST
    var avaliableUsers = [
    ];
    var allUsers = [];


class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            taskDesc : this.props.taskObj !== undefined ? this.props.taskObj.description :'',
            taskTitle : this.props.taskObj !== undefined ? this.props.taskObj.title :'',
            taskPriority : this.props.taskObj !== undefined ? this.props.taskObj.priority :'High',
            taskType : this.props.taskObj !== undefined ? this.props.taskObj.type :'Issue',
            taskAssignee :  this.props.taskObj !== undefined ? this.props.taskObj.asignee : {},
            id : this.props.taskObj !== undefined ? this.props.taskObj.id : '',
            listId : this.props.taskObj !== undefined ? this.props.taskObj.listId : '',
            errorMsg : ''
        };

        this.toggle = this.toggle.bind(this);
        this.createNewTask = this.createNewTask.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setPriority = this.setPriority.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setType = this.setType.bind(this);
        this.setAssignee = this.setAssignee.bind(this);
        this.updateTask = this.updateTask.bind(this);

    }

    componentDidMount() {
        this.setState({modal : !this.props.showModal});
        //UNCOMMENT WITH HOST
        if(avaliableUsers.length == 0){
            fetch(apiHostName+'/users')
                .then(result=>result.json())
                .then((items) =>{
                        items.forEach((elem) => {

                            if(elem.name != null && elem.name != ''){
                                avaliableUsers.push(elem.name);
                                allUsers.push(elem);
                            }
                        });
                    }
                ).catch(error => console.log(error));
        }



    };




    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });

        if(this.state.modal){
            this.props.toggle();
            this.setState({taskTitle: '', taskDesc : '', taskPriority : '', taskType : '', taskAssignee : '', listId : '', id: ''})
        }
    };

    createNewTask(){

        if(this.state.taskTitle === '') return this.setState({errorMsg: 'Please provide task title'});
        if(this.state.taskDesc === '') return this.setState({errorMsg: 'Please provide description'});
        if(this.state.taskAssignee === '') return this.setState({errorMsg: 'Please provide Assignee'});


        this.props.addTask({
            title: this.state.taskTitle,
            description: this.state.taskDesc,
            priority: this.state.taskPriority,
            type:this.state.taskType,
            asigneeId: this.state.taskAssignee.id ,
            listId: this.props.listId});


        this.toggle();
    };

    updateTask () {
        if(this.state.taskTitle === '') return this.setState({errorMsg: 'Please provide task title'});
        if(this.state.taskDesc === '') return this.setState({errorMsg: 'Please provide description'});
        if(this.state.taskAssignee.name === '') return this.setState({errorMsg: 'Please provide Assignee'});

        this.props.updateTask({
            title: this.state.taskTitle,
            description: this.state.taskDesc,
            priority: this.state.taskPriority,
            type:this.state.taskType,
            asignee: this.state.taskAssignee ,
            owner : this.props.user,
            id : this.state.id,
            listId: this.state.listId});

        this.toggle();
    }

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
        for(var i in allUsers){
            if(allUsers[i].name === value){
                this.setState({taskAssignee: allUsers[i]})
                break;
            }
        }
    }


    render() {
        return (
            <MDBContainer>
                <MDBModal cascading isOpen={this.state.modal} className="addTaskModal" toggle={item => {}}>
                    <MDBModalHeader className="modal-dialog.cascading-modal text-center text-white lightGreen darken-3" titleClass="w-100" tag="h5"  >
                           New task
                    </MDBModalHeader>
                    <Alert
                        message="Error"
                        description={this.state.errorMsg}
                        type="error"
                        showIcon
                        className={classNames('text-align-left',{'hide' : this.state.errorMsg === ''})}
                    />
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
                                        <label htmlFor="list_name" className={this.props.taskObj !== undefined ? 'active' : ''}>Title</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <i className="material-icons prefix">comment</i>
                                        <textarea id="icon_prefix2" className="materialize-textarea" value={this.state.taskDesc} onChange={this.setDescription}/>
                                        <label htmlFor="icon_prefix2" className={this.props.taskObj !== undefined ? 'active' : ''}>Meaningful description</label>
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
                                            defaultValue = {this.props.taskObj !== undefined ? this.props.taskObj.asignee.name : ''}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        {JSON.stringify(this.state.taskObj)}

                    </MDBModalBody>
                    <MDBModalFooter className="noBackgroundColor noBorder">
                        <a href="#" className="btn-floating btn-medium waves-effect waves-light lightRed"><i
                            className="material-icons" onClick={this.toggle}>close</i></a>
                        <a href="#" className="btn-floating btn-medium waves-effect waves-light lightGreen"><i
                            className="material-icons" onClick={this.props.taskObj !== undefined ? this.updateTask : this.createNewTask}>{this.props.taskObj !== undefined ? 'save' : 'add'}</i></a>

                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default AddTask;