import React from 'react';
import { Header, Grid, Segment, Button } from 'semantic-ui-react';

const messages = [
    {message: "Your Question 'What is an array?' was deleted by sushma1261 because of irrelavant content"},
    {message: "Your Answer for question 'What is an array?' was liked by sushma1261 "},
    {message: "You are in top 3 ranks on 12/02/2020"},
]

const Component = ({message, deleteMessage}) => {
    return (
        <div>
            {/* <Segment padded> */}
            <Grid padded style = {{background: "white", fontSize: "16px", textAlign: "left", maxHeight: "20"}}>
                <Grid.Column width = {15}>
                    {message}
                </Grid.Column>
                <Grid.Column>
                    <Button size = "mini" icon = "close" negative onClick = {deleteMessage}></Button>
                </Grid.Column>
            </Grid>
            {/* </Segment> */}
            <br />
            
        </div>
    )
}



class NotificationsPage extends React.Component {

    state = {
        messages : messages
    }

    deleteAll = async() => {
        this.setState({messages: []})
    }

    deleteMessage = async(idx) => {
        
        var m = this.state.messages;
        console.log(m[idx])
        m.splice(idx,1);
        this.setState({messages: m})
    }
    
    render() {
        return (
            <div>
                <Header as = "h2">Notifications
                <span><Button style = {{right: "20px", position : "absolute"}} negative onClick = {this.deleteAll}>Clear All</Button></span>
                </Header>
                {this.state.messages.map(({message}, idx) => (
                    <Component message = {message} key = {idx} deleteMessage = {() => {
                        this.deleteMessage(idx);
                }
                }/>
                )
                )}
            </div>
        );
    }
}

export default NotificationsPage;