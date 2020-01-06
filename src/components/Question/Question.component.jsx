import React from 'react';
import {Segment, Grid, Image} from 'semantic-ui-react';
import './Question.component.scss';
import { Link } from 'react-router-dom';
class Question extends React.Component {
    render() {
        return (
                <Segment.Group style={{backgroundColor: "black"}} >
                    <Segment padded style={{backgroundColor: "#b5e6e1"}}>
                        <Grid>
                            <Grid.Column width = {2}>
                            <Image size = "mini"  circular src = {this.props.imageurl}/>
        <span>{this.props.username}</span>
                            </Grid.Column>
                            <Grid.Column>
                                <Link to = {
                                {
                                    pathname: '/a/' + this.props.id,
                                }
                            }
                            width = {10} className = "questionText">
                                {this.props.question}
                                </Link> 
                            </Grid.Column>
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
