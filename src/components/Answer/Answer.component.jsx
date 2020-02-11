import React from 'react';
import { Segment, Grid, Image, Button, Icon, Label, Form, TextArea } from 'semantic-ui-react';
import firebase from '../../Firebase/firebase';
import CommentList from '../Comment/CommentList';
class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes : this.props.likes,
            flag : this.props.flag,
            answerKey: this.props.answerKey,
            username: localStorage.getItem("username"),
            comment: "", 
            comments: [],
            showComment: false
        }
    }

    handleLikes = async() => {
        var qry = firebase.database().ref("answers/"+this.props.id+"/"+this.props.answerKey);
        await qry.child("likedBy").push({"user": this.state.username});
        var l = this.state.likes + 1
        this.setState({
            likes: l,
            flag: true,
            
        })
        await qry.update({"noOfLikes": l});
        console.log("clicked");
        console.log(this.state.username);
        var key = "", score = 0;
        var ref2 = firebase.database().ref("users")
        await ref2.orderByChild("username").equalTo(this.props.username).once("value")
        .then(function (snapshot) {
            snapshot.forEach(function(f){
                key = f.key;
                 score = f.val().score;
            })
        })
        console.log(key, score)
        if(localStorage.getItem("role") === "admin") {
            await ref2.child(key).update({score: score+50});
        }
        else {
            await ref2.child(key).update({score: score+10});
        }

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
            this.addCommentToDB()
        }
        // this.addCommentToDB()
    }

    addCommentToDB = async() => {
        var ansKey = this.props.answerKey;
        //console.log(ansKey);
        var data = {
            username: this.state.username,
            comment: this.state.comment
        }
        var ref = firebase.database().ref("comments")
            var k = ref.child(ansKey).push(data).key;
            await ref.child(ansKey).child(k).update({"id": k, "postedOn": firebase.database.ServerValue.TIMESTAMP});
            this.setState({
                answer: ''
            });
    }

    getComments = async () => {
        var ansKey = this.props.answerKey;
        var commentsList = [];
        var ref = firebase.database().ref("comments");
        var query = ref.child(ansKey);
        await query.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (c) {
                    //childSnapshot.forEach(function(c) {
                        console.log(c.val());
                        if(c.val()) {
                            commentsList.push(c.val());
                        }
                });
            });
            this.setState({comments: commentsList}, () => {
                this.forceUpdate();
            });
            console.log("Comments are:");
            console.log(this.state.comments);
    }

    toggleShowComment() {
        console.log(this.state.showComment);
        this.setState({showComment : !this.state.showComment});
        console.log(this.state.showComment);
        if(this.state.showComment === false && this.state.comments.length === 0) {
            this.setState({showComment: true}, () => {
                this.getComments();
                console.log("get comments true");
            });
            console.log("Fetch from DB");
        }
        else {
            console.log("Show Normal data");
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
                            <Grid.Column width = {12}>
                                <p style = {{fontFamily : "Gregoria", textAlign : "justify", fontSize : "20px"}}>{this.props.answer}</p>
                            </Grid.Column>
                            <Grid.Column width = {2}>
                            <Button negative circular icon = "trash" onClick = {this.props.fun1}></Button>
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
