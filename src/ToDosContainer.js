import React, {Component} from 'react';
import SingleList from "./SingleList";
import AddAnotherList from "./AddAnotherList";
import {MDBContainer, MDBRow} from "mdbreact";

class ToDosContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listsCollection: []
        };


        this.addNewList = this.addNewList.bind(this);
        this.removeList = this.removeList.bind(this);
        this.showLists = this.showLists.bind(this);
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
        list = [...list, ({name: name, id: Math.random() * 100 + Math.random() * 100})];
        this.setState({listsCollection: list});

    };

    removeList(uID) {
        this.setState({
            listsCollection: this.state.listsCollection.filter(el => el.id !== uID)
        });

    };

    showLists() {
        let scope = this;
        return (
            this.state.listsCollection.map(function (item, index) {
                return <SingleList item={item} key={item.id} removeList={scope.removeList} index={index}/>
            })
        );
    };

    render() {
        return (
            <MDBContainer className="deck">
                <MDBRow>
                    {this.showLists()}
                    <AddAnotherList addList={this.addNewList} list={this.state.listsCollection}/>
                </MDBRow>
            </MDBContainer>

        );
    };
}

export default ToDosContainer;
