import React, { Component } from 'react';
import classNames from 'classnames';
import { MDBCard, MDBCardBody, MDBCol, MDBRow,} from "mdbreact";

class AddAnotherList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name : '',
            isInput : false,
            isHovered : false,
            singleList : true,
            itemsCounter : 0
        };

        this.changeMode = this.changeMode.bind(this);
        this.createNewList = this.createNewList.bind(this);
        this.setName = this.setName.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
    }

    changeMode(){
        this.setState({isInput : !this.state.isInput, name:''});
        if(this.state.isInput && this.state.name !== "") this.createNewList();
    }
    createNewList(){
        this.props.addList(this.state.name);

    }

    setName(event){
        this.setState({name: event.target.value});
    }
    toggleHover(){
        this.setState({isHovered : !this.state.isHovered});
    }


    render(){
        return(
            <MDBCol id='addLIst' className={classNames('singleLine animated fadeInRight addLineContainer')} style={{left: this.props.list.length*350+'px'}}>
                <MDBCard >

                    <MDBCardBody className="addNewLine">
                        <a href="#" className={classNames('btn-floating waves-effect waves-light',{'lightGreen' : this.state.isInput && this.state.name !== ""}, {'lightRed' : this.state.isInput && this.state.name === ""}, {'pulse': this.state.isHovered},{'btn-large initialBtn' : !this.state.isInput}, {'btn-small addBtn' : this.state.isInput})} onClick={this.changeMode} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                            <i className="align-middle material-icons">{!this.state.isInput ? "add" : this.state.name==="" ? "close" : "add" }</i>
                        </a>
                        <div className={classNames('addNewLine', {'collapse' : !this.state.isInput})}>
                            <div className="form-group">
                                    <MDBRow className="">
                                        <MDBCol>
                                            <div className="input-field">
                                                <input id="list_name" type="text" className="" value={this.state.name} onChange={this.setName}/>
                                                <label htmlFor="list_name">List name</label>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                            </div>
                        </div>
                    </MDBCardBody>
                </MDBCard>

            </MDBCol>



        );
    }
}

export default AddAnotherList;