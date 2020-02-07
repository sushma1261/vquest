import React from 'react';
import {Segment, Grid, Image, Button, Icon} from 'semantic-ui-react';
import './Question.component.scss';
import { Link } from 'react-router-dom';
class Question extends React.Component {

    componentDidMount() {
        
        if(localStorage.getItem("role") === "admin") {
            this.setState({admin: true});
        }
        

    }

    state = {
        username : this.props.username,
        admin : false
    }
    render() {
        return (
                <Segment.Group style={{backgroundColor: "black"}} >
                    <Segment padded style={{backgroundColor: "#b5e6e1"}}>
                        <Grid>
                            <Grid.Column width = {2}>
                            <Image size = "mini"  circular src = {this.props.imageurl}/>
        <span><Link to = {"/profileDetails/"+this.props.username}>{this.props.username}</Link></span>
                            </Grid.Column>
                            <Grid.Column width = {12} style = {{color: "black"}}>
                                <Link to = {
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
                            className = "questionText">
                                {this.props.question}
                                </Link> 
                                 
                            </Grid.Column>
                            {this.state.admin &&
                                <Grid.Column width= {2}>
                                    <Button negative circular icon = "trash" onClick = {this.props.fun1}></Button>
                                </Grid.Column>
                            }
                        </Grid>
                    </Segment>
                    <Segment style={{backgroundColor: "#b5e6e1"}}>
                        <Grid>
                            <Grid.Column width = {5} floated = "left">
                                Tag: {this.props.tags}
                            </Grid.Column>
                            <Grid.Column width = {5} floated = "right">
                                {this.props.answers} answers
                            </Grid.Column>
                        </Grid>
                        
                    </Segment>
                </Segment.Group>
        )
    }
}

export default Question;
