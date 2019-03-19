import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBIcon,MDBInput,MDBRow,MDBCol,MDBBtnGroup,MDBBadge } from 'mdbreact';
import classNames from "classnames";

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            taskDesc : '',
            taskPriority : 'High'
        }

        this.toggle = this.toggle.bind(this);
        this.createNewTask = this.createNewTask.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setPriority = this.setPriority.bind(this);

    }



    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });

        if(this.state.modal) this.props.toggle();
    }

    createNewTask(){
        this.props.addTask({description: this.state.taskDesc, priority: this.state.taskPriority, id : Math.random()*100+Math.random()*100});
        this.toggle();
    }
    componentDidMount() {
       this.setState({modal : !this.props.showModal});
    }

    setDescription(event){
        this.setState({taskDesc: event.target.value});
    }
    setPriority(event){
        this.setState({taskPriority: event.target.id});
    }


    render() {
        return (
            <MDBContainer>
                <MDBModal cascading isOpen={this.state.modal} toggle={this.toggle} className="addTaskModal">
                    <MDBModalHeader className="modal-dialog.cascading-modal text-center text-white lightGreen darken-3" titleClass="w-100" tag="h5" toggle={this.toggle}>
                            Create new task!
                    </MDBModalHeader>
                    <MDBModalBody className="text-center">
                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s6">
                                        <i className="material-icons prefix">mode_edit</i>
                                        <textarea id="icon_prefix2" className="materialize-textarea" value={this.state.taskDesc} onChange={this.setDescription}></textarea>
                                        <label htmlFor="icon_prefix2">Meaningful description</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <p className="text-lg-left label">Priority</p>
                        <MDBRow>
                            <MDBCol>
                                <MDBBtnGroup horizontal>
                                    <MDBBtn id="High" onClick={this.setPriority} className={classNames({'activeBtn' : this.state.taskPriority == 'High'})}>High</MDBBtn>
                                    <MDBBtn id="Modern" onClick={this.setPriority} className={classNames({'activeBtn' : this.state.taskPriority == 'Modern'})}>Modern</MDBBtn>
                                    <MDBBtn id="Low" onClick={this.setPriority} className={classNames({'activeBtn' : this.state.taskPriority == 'Low'})}>Low</MDBBtn>
                                    <MDBBtn id="Optional" onClick={this.setPriority} className={classNames({'activeBtn' : this.state.taskPriority == 'Optional'})}>Optional</MDBBtn>
{/*                                    <MDBBtn id="5" onClick={this.setPriority} className={classNames({'activeBtn' : this.state.taskPriority == '5'})}>5</MDBBtn>*/}
                                </MDBBtnGroup>
                            </MDBCol>
                        </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter className="noBackgroundColor noBorder">
                        <a className="btn-floating btn-medium waves-effect waves-light lightRed"><i
                            className="material-icons" onClick={this.toggle}>close</i></a>
                        <a className="btn-floating btn-medium waves-effect waves-light lightGreen"><i
                            className="material-icons" onClick={this.createNewTask}>add</i></a>

                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default AddTask;