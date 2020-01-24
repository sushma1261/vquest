import React from 'react';
import { Segment, Grid, Image, Button, Icon, Label, Form, TextArea } from 'semantic-ui-react';
import firebase from '../../Firebase/firebase';
import CommentList from '../Comment/CommentList';
import { Link } from 'react-router-dom';

class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes : this.props.likes,
            flag : this.props.flag,
            username: localStorage.getItem("username"),
            comment: "", 
            comments: [],
            showComment: false
        }
    }

    handleLikes = async() => {
        //console.log(this.state.likes);
        var qry = firebase.database().ref("answers/"+this.props.answerKey+"/"+this.props.id);
        qry.child("likedBy").push({"user": this.state.username});
        var l = this.state.likes + 1
        this.setState({
            likes: l,
            flag: true,
            
        })
        qry.update({"noOfLikes": l});
        // console.log("Answer Key",this.props.answerKey);
        // await qry.once("value")
        //     .then(function (snapshot) {
        //         console.log("snap::")
        //         console.log(snapshot.val());
        //         //ans.push(snapshot.val())
        //     });

    }

    addComment = () => {
        console.log(this.state.comments);
        var c = this.state.comments;
        
        if (this.state.comment !== "") {
            c.unshift({username: this.state.username, comment: this.state.comment});
            this.setState({comments: c, comment: "", showComment : true}, () => {
                console.log("pkojqwiosa");
                console.log(this.state.comments);
            });
        }
    }

    getComments = async () => {
        var commentsList = [];
        var ref = firebase.database().ref("comments");
        var query = ref.orderByChild("aid").equalTo("-Ly3ngF57XVhPrGx0B-4");
        await query.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    // console.log(childSnapshot.val());
                    //console.log(childSnapshot.val().username)
                    childSnapshot.forEach(function(c) {
                        console.log(c.val());
                        if(c.val().id) {
                            //console.log(c.val().username);
                            commentsList.push(c.val());
                            // console.log(commentsList);
                        }
                    });
                });
            });
            this.setState({comments: commentsList}, () => {
                // console.log("pkojqwiosa");
                this.forceUpdate();
            });
            // this.forceUpdate();
            console.log("Comments are:");
            console.log(this.state.comments);
    }

    toggleShowComment() {
        // console.log(this.state.comments);
        console.log(this.state.showComment);
        this.setState({showComment : !this.state.showComment});
        console.log(this.state.showComment);
        if(this.state.showComment === false && this.state.comments.length === 0) {
            this.setState({showComment: true}, () => {
                this.getComments();
                console.log("get comments true");
                // console.log(this.state.showComment);

            });
            console.log("Fetch from DB");
            //this.getComments();
        }
        else {
            console.log("Show Normal data");
            // console.log(this.state.comments);
        }
        console.log("Show Status");
        console.log(this.state.showComment);

    }


    render() {
        return (
            <div>
                <Segment.Group style={{backgroundColor: "black"}} >
                    <Segment padded style={{backgroundColor: "#b5e6e1"}}>
                        <Grid>
                            {/* {this.props.number} */}
                            <Grid.Column width = {2}>
                            <Image size = "mini"  circular src = {this.props.imageurl}/>
        <span>{this.props.username}</span>
                            </Grid.Column>
                            <Grid.Column width = {13}>
                                <p style = {{fontFamily : "Gregoria", textAlign : "justify", fontSize : "20px"}}>{this.props.answer}</p>
                            </Grid.Column>
                            

                        </Grid>
                        <br />
                        <div style = {{position : "absolute",right: "10px"}}>
                        <Button as='div' labelPosition='right' onClick = {this.handleLikes.bind(this)} disabled = {this.state.flag}>
                                <Button color='red'>
                                    <Icon name='heart' />
                                </Button>
                                <Label as='a' basic color='red' pointing='left'>
                                    {this.state.likes}
                                </Label>
                            </Button>
                        </div>
                        
                        {/* <span style = {{position : "absolute",left : "10px"}}>
                            <Button primary onClick = {(e) => this.setState({toggle: !this.state.toggle})}>Add a comment</Button>
                        </span>
                        {this.state.toggle && 
                            <div>
                                Sushma
                            </div>
                        } */}
                        {
                            !this.state.showComment && 
                            <Button primary onClick = {this.toggleShowComment.bind(this)} style ={{ position: "absolute", left:"10px"}}>Show Comments</Button>
                        }
                        {
                            this.state.showComment && 
                            <Button onClick = {this.toggleShowComment.bind(this)} style ={{ position: "absolute", left:"10px"}}>Hide Comments</Button>
                        }  
                            <br />
                            <br />
                    </Segment>
                    <Segment padded style={{backgroundColor: "#b5e6e1", paddingBottom: "20px"}}>
                        <Form size = "large">
                            <Form.Field>
                            <input placeholder='Add a comment' style ={{ position: "absolute", left:"10px", width: "500px"}} onChange = {(e) => {this.setState({comment: e.target.value})}} value = {this.state.comment}/>
                            <span style = {{position : "absolute", top: "2.5px", right: "-10px"}}>
                                <Button primary onClick = {this.addComment.bind(this)}>Add a comment</Button>
                            </span>
                            </Form.Field>
                        </Form>
                        <br />
                        <br />
                        <br />
                        {
                            this.state.showComment && 
                            <div>
                                hii
                                <CommentList comments = {this.state.comments}/>
                            </div>
                            
                        }
                        
                    </Segment>
                    
                </Segment.Group>
                <br />

            </div>
        )
    }
}

export default Answer;
