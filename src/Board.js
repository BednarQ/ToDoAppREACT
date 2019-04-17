import React, { useState,useEffect } from 'react';
import {MDBContainer, MDBRow} from 'mdbreact';
import classNames from "classnames";
import 'antd/dist/antd.css';
import SingleList from "./SingleList";
import AddAnotherList from "./AddAnotherList";
import {apiHostName} from "./StaticResources";
import {message,Spin} from "antd";


function Board(props){

    const [board, setBoard] = useState(props.board);
    const [columns, setColumns] = useState([]);
    const [loggedUser, setLoggedUser] = useState(props.user);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoggedUser(props.user);
    },[props.user]);

    useEffect(() => {
        setBoard(props.board);
        fetch(apiHostName+'columns')
            .then(result=>result.json())
            .then((items) =>{
                    if(items.length > 0){
                        setColumns(items.filter((elem) =>{
                            return (elem.boardId === props.board.id)
                        } ));
                    }
                }
            ).catch(error => message.error(error))
    },[props.board]);

    const addNewColumn = (name) => {
        var newColumn = {name: name, boardId : board.id};


        const columnSpec = {
            method: 'POST',
            body: JSON.stringify(newColumn),
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        };
        fetch(apiHostName+'columns', columnSpec)
            .then((response) => {
                return response.json();
            })
            .then((jsonObject) => {
                newColumn.id = jsonObject.id;
                setColumns([...columns, newColumn]);
            })
            .catch((error) => {
                console.log('Error occured on column creation: '+error);
            });

    };

    const removeColumn = (uID) => {
        const spec = {
            method: 'DELETE',
            body: '',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        };
        //UNCOMMENT WITH HOST
        fetch(apiHostName+'columns/'+uID, spec)
            .then((response) => {
                return response;
            })
            .then((jsonObject) => {
                setColumns(columns.filter(el => el.id !== uID));
                message.success('Column has been successfully deleted.');
            })
            .catch((error) => {
                message.error(error);
            });

    };

    const cloneColumn = (passedList, relatedTasks) => {

        var newColumn = {name: passedList.name+'_copy', boardId : board.id};

        const columnSpec = {
            method: 'POST',
            body: JSON.stringify(newColumn),
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        };
        fetch(apiHostName+'columns', columnSpec)
            .then((response) => {
                return response.json();
            })
            .then((jsonObject) => {
                newColumn.id = jsonObject.id;

                var passedTaskList = JSON.parse(relatedTasks);

                passedTaskList.forEach(function (item) {
                    item.id = null;
                    item.asigneeId = item.asignee.id;
                    item.ownerId = item.owner.id;
                    item.listId = newColumn.id;
                    const taskToInsert = {
                        method: 'POST',
                        body: JSON.stringify(item),
                        headers: {
                            'Accept' : 'application/json',
                            'Content-Type' : 'application/json'
                        }
                    };
                    fetch(apiHostName+'tasks', taskToInsert)
                        .then((response) => {
                            return response;
                        })
                        .then((jsonObject) => {
                            item.id = jsonObject.id
                        })
                        .catch((error) => {
                            message.error(error);
                        });

                });

                newColumn.tasksList = passedTaskList;



            })
            .catch((error) => {
                console.log('Error occured on column creation: '+error);
            });

        setColumns([...columns, newColumn]);
        return true;
    };

    const showLists = () =>{
        return (
            columns.map(function (item, index) {
                return <SingleList item={item} key={JSON.stringify(item)} removeList={removeColumn} clone={cloneColumn} index={index} user={loggedUser} board={board}/>
            })
        );
    };


    return (
            <MDBContainer className="deck">
                <MDBRow>


                    <div className={classNames({'hide' : loggedUser.id === undefined || board.id === undefined})}>
                        {showLists()}
                        <AddAnotherList addList={addNewColumn} list={columns}/>
                    </div>

                </MDBRow>
            </MDBContainer>
    );
}

export default Board;