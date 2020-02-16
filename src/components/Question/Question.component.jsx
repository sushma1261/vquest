import React from 'react';
import { Segment, Grid, Image, Button } from 'semantic-ui-react';
import './Question.component.scss';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase/firebase';
class Question extends React.Component {
    state = {
        url: "",
    }
    componentDidMount() {
        this.getUserImage()
        if (localStorage.getItem("role") === "admin") {
            this.setState({ admin: true });
        }
    }

    getUserImage = async () => {
        var username = this.props.username
        var picUrl = "";
        await firebase.database().ref("users").orderByChild("regd").equalTo(username).once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (c) {
                    picUrl = c.val().picURL;
                    console.log(username, picUrl);
                })
            })
        this.setState({ url: picUrl })
    }

    state = {
        username: this.props.username,
        admin: false
    }

    render() {
        return (
            <Segment.Group style={{ backgroundColor: "black" }} >
                <Segment padded style={{ backgroundColor: "#b5e6e1" }}>
                    <Grid>
                        <Grid.Column width={2}>
                            <img src={this.state.url} width="60" height="60" style={{ borderRadius: "50%" }} />
                            <span><Link to={"/myProfile/" + this.props.username}>{this.props.username}</Link></span>
                        </Grid.Column>
                        <Grid.Column width={12} style={{ color: "black" }}>
                            <Link to={
                                {
                                    pathname: '/a/' + this.props.id,
                                    props: {
                                        username: this.props.username,
                                        question: this.props.question,
                                        tags: this.props.tags,
                                        noOfAns: this.props.answers
                                    }
                                }
                            }
                                className="questionText">
                                {this.props.question}
                            </Link>

                        </Grid.Column>
                        {this.state.admin &&
                            <Grid.Column width={2}>
                                <Button negative circular icon="trash" onClick={this.props.fun1}></Button>
                            </Grid.Column>
                        }
                    </Grid>
                </Segment>
                <Segment style={{ backgroundColor: "#b5e6e1" }}>
                    <Grid>
                        <Grid.Column width={5} floated="left">

                            Tag: {this.props.tags.map((a, idx) => (
                                <span key={idx}>
                                    <Link to={
                                        {
                                            pathname: '/tags/' + a,
                                            props: {
                                                tag: a
                                            }
                                        }
                                    }>{a} </Link>
                                </span>
                            ))}
                        </Grid.Column>
                        <Grid.Column width={5} floated="right">
                            {this.props.answers} answers
                            </Grid.Column>
                    </Grid>

                </Segment>
            </Segment.Group>
        )
    }
}

export default Question;
