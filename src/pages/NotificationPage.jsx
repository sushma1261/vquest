import React from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import firebase from '../Firebase/firebase'

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
        messages2 : [],
        user: localStorage.getItem("regd"),
        flag: false
    }

    componentDidMount() {
        this.getNotificationsFromFB()
    }

    deleteAll = async() => {
        this.setState({messages2: []})
        this.setState({flag: false})
        await firebase.database().ref("notifications").child(this.state.user).remove()
        
    }

    deleteMessage = async(idx, key) => {
        var m = this.state.messages2;
        // console.log(m[idx])
        m.splice(idx,1);
        // console.log("m:", m)
        this.setState({messages2: m})
        if(m.length === 0) {
            this.setState({flag: false})
        }
        await firebase.database().ref("notifications").child(this.state.user).child(key).remove()
        
        
    }

    getNotificationForRank = async() => {
        var f = false
        var user = this.state.user
        console.log("User" + user)
        await firebase.database().ref("users").orderByChild("score").limitToLast(3).once("value")
        .then(function(snap){
            console.log(snap.val())
            snap.forEach(function(child){
                if(child.val().regd === user) {
                    f = true
                    console.log("f = true");
                    console.log("You are in top 3 ranks!!")
                }
            })
        })
        var m = this.state.messages2
        
        if(f) {
            m.push({"message": "You are in top 3 ranks!!", "key": "noKey"})
            this.setState({messages2: m})
        }
        console.log(this.state.messages2)
    }

    getNotificationsFromFB = async() => {
        this.getNotificationForRank()
        var messages2 = this.state.messages2
        await firebase.database().ref("notifications").child(this.state.user).once("value")
        .then(function(snap) {
            snap.forEach(function(child) {
                var data = {"message": child.val().message, "key": child.key}
                messages2.push(data)
                // console.log(child.key)
            })
        })
        if(messages2 !== []) {
            this.setState({flag: true})
        }
        this.setState({messages2})
    }

    
    render() {
        return (
            <div>
                <Header as = "h2">Notifications
                {
                    this.state.flag  && 
                <span>
                    <Button style = {{right: "20px", position : "absolute"}} negative onClick = {this.deleteAll}>Clear All</Button>
                    
                </span>
                }
                </Header>
                
                {this.state.messages2.map((m, idx) => (
                    <Component message = {m.message} key = {idx} deleteMessage = {() => {
                        this.deleteMessage(idx, m.key);
                }
                }/>
                )
                )}
            </div>
        );
    }
}

export default NotificationsPage;