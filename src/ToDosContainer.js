import React, { Component } from 'react';
import SingleList from "./SingleList";
import AddAnotherList from "./AddAnotherList";
import CardDeck from 'react-bootstrap/CardDeck';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCol,MDBCardGroup, MDBRow, MDBContainer } from "mdbreact";
import AddTask from "./AddTask";

class ToDosContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listsCollection : []
        }


        this.addNewList = this.addNewList.bind(this);
        this.removeList = this.removeList.bind(this);
        this.showLists = this.showLists.bind(this);
    }

    addNewList(name){
        var list = this.state.listsCollection;
        list =[...list, ({name: name, id : Math.random()*100+Math.random()*100})];
        this.setState({listsCollection: list});
    }
    removeList(uID){

        document.getElementById('addLIst').style.left = parseFloat(getComputedStyle(document.getElementById('addLIst')).left) -350+ 'px';
        console.log(uID);
        this.setState({
            listsCollection: this.state.listsCollection.filter(el => el.id != uID )
        });

    }

    showLists(){
        let scope = this;
        return (
          this.state.listsCollection.map(function (item,index) {
              return <SingleList item={item} key={index} removeList={scope.removeList} />
          })
        );
    }

    render() {
        return (
            <MDBContainer className="deck">
                <MDBRow>
                    {this.showLists()}
                        <AddAnotherList addList={this.addNewList}/>
                </MDBRow>
            </MDBContainer>

        );
    }
}

export default ToDosContainer;
