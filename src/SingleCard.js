import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';



class SingleCard extends Component{
    render(){
        return(
        <Card>
            <Card.Header>{this.props.title}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {this.props.description}
                </Card.Text>
            </Card.Body>
        </Card>
        );
    }
}

export default SingleCard;