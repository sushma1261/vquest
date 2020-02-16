import React, { Component } from 'react';
import { Grid, Image, Header, Button } from 'semantic-ui-react';
import AnswerList from '../components/Answer/AnswerList';
import TagsDashboard from '../components/TagsDashboard/TagsDashboard';
import firebase from '../Firebase/firebase';
import { Link } from 'react-router-dom';

class AnswerPage extends Component {
    state = {
        qid: this.props.match.params.id,
        questionDetails:{
            user: "",
            noOfAns: 0,
            tags: "",
            question: "",
            qid: this.props.match.params.id
        }
        

    }
    componentDidMount() {
        this.getQuestion();
        //this.getAnswers();
        console.log(this.state.qid);
    }

   

    getQuestion = async () => {
        var ref = firebase.database().ref("questions");
        var q = {};
        var query = ref.orderByChild("id").equalTo(this.state.qid);
        await query.once("value")
            .then(function (snapshot) {
                console.log("Question", snapshot.val());
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    q = childSnapshot.val();
                });
            });
        this.setState({ questionDetails: q });
        this.getUserImage()
        //console.log("q", this.state.questionDetails);
    }

    getUserImage = async() => {
        var username = this.props.username
        var picUrl = "";
        await firebase.database().ref("users").orderByChild("regd").equalTo(this.state.questionDetails.user).once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(c){
                picUrl = c.val().picURL;
                console.log(username, picUrl);
            })
        })
        this.setState({url: picUrl})
    }


    render() {
        console.log("Answer Page props");
        console.log(this.props);
        // console.log(this.state
        // console.log(this.props.match.params.id);
        // console.log(this.props.location.props);
        return (
            <div>
                <Grid>
                    <Grid.Column>
                        <Grid>
                            <Grid.Column width={1}>
                            <img src = {this.state.url} width = "70" height = "70" style ={{borderRadius: "50%"}}/>
                                <span>{this.state.questionDetails.user}</span>
                            </Grid.Column>
                            <Grid.Column width={11} style={{ fontSize: "25px" }}>
                                {this.state.questionDetails.question}
                            </Grid.Column>
                            <Grid.Column width={4}>
                                Tags: {this.state.tags}<br />
                                {this.state.questionDetails.noOfAns} answers
                                <Button color = "violet"> 
                        <Link to = {
                                    {
                                        pathname: '/newAnswer/' + this.state.qid,
                                    }
                                }
                        style = {{ color: "white" }}>
                            Add a new answer
                        </Link>
                    </Button>
                            </Grid.Column>
                            
                            <Header as="h1" style={{ fontSize: "35px", paddingBottom: "20px" }}>Answers</Header>
                        </Grid>
                        
                        <AnswerList question = {this.state.questionDetails.question} qid = {this.state.questionDetails.qid}/>
                    </Grid.Column>
                    
                </Grid>
            </div>
        );
    }
}

export default AnswerPage;