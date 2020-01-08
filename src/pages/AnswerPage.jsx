import React, { Component } from 'react';
import { Grid, Image, Header, Button } from 'semantic-ui-react';
import AnswerList from '../components/Answer/AnswerList';
import TagsDashboard from '../components/TagsDashboard/TagsDashboard';
import firebase from '../Firebase/firebase';
import { Link } from 'react-router-dom';

class AnswerPage extends Component {
    state = {
        qid: this.props.match.params.id,
        answers: [],
        questionDetails: {}
    }
    componentDidMount() {
        this.getQuestion();
        //this.getAnswers();
        console.log("DB");
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
        console.log("q", q);
    }

    

    render() {
        // console.log(this.props);
        // console.log(this.props.match.params.id);
        // console.log(this.props.location.state);
        return (
            <div>
                <Grid>
                    <Grid.Column width={1}>
                    </Grid.Column>
                    <Grid.Column width={10}>

                        <Grid>
                            <Grid.Column width={1}>
                                <Image size="mini" circular src="https://randomuser.me/api/portraits/women/24.jpg" />
                                <span>{this.state.questionDetails.user}</span>
                            </Grid.Column>
                            <Grid.Column width={12} style={{ fontSize: "25px" }}>
                                {this.state.questionDetails.question}
                            </Grid.Column>
                            <Grid.Column width={3}>
                                Tags: {this.state.questionDetails.tags}<br />
                                {this.state.questionDetails.noOfAns} answers
                            </Grid.Column>
                            <Header as="h1" style={{ fontSize: "35px", paddingBottom: "20px" }}>Answers</Header>
                        </Grid>
                        <AnswerList qid = {this.state.qid}/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                    <Button color = "violet" as = {Link} to = "/newAnswer"> Add an answer</Button>
                    <TagsDashboard />
                    </Grid.Column>
                    <Grid.Column width={1}>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default AnswerPage;