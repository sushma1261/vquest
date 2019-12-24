import React from 'react';
import { Segment, Grid, Image, Button, Icon, Label } from 'semantic-ui-react';

class Answer extends React.Component {
    render() {
        return (
            <div>
                <Segment.Group style={{backgroundColor: "black"}} >
                    <Segment padded style={{backgroundColor: "#b5e6e1"}}>
                        <Grid>
                            {this.props.number}
                            <Grid.Column width = {2}>
                            <Image size = "mini"  circular src = {this.props.imageurl}/>
        <span>{this.props.username}</span>
                            </Grid.Column>
                            <Grid.Column width = {13} className = "questionText">
                                <p style = {{fontFamily : "Gregoria", textAlign : "justify", fontSize : "20px"}} >{this.props.answer}</p>
                            </Grid.Column>
                            
                           
                        </Grid>
                        <br />
                        <div style = {{position : "absolute",right: "10px"}}>
                        <Button as='div' labelPosition='right' >
                                <Button color='red'>
                                    <Icon name='heart' />
                                </Button>
                                <Label as='a' basic color='red' pointing='left'>
                                    {this.props.likes}
                                </Label>
                            </Button>
                        </div>
                        
                        <span style = {{position : "absolute",left : "10px"}}>
                            <Button primary>Add a comment</Button>
                        </span>
                            <br />
                            <br />
                    </Segment>
                </Segment.Group>
                <br />

            </div>
        )
    }
}

export default Answer;
