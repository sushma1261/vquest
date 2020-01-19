import React from 'react';
import { Segment, Grid, Image, Button, Icon, Label } from 'semantic-ui-react';
class LikedAnswer extends React.Component {
    render() {
        return(
            <div>
                <div>
                <Segment.Group style={{backgroundColor: "black"}} >
                    <Segment style={{backgroundColor: "#b5e6e1"}}>
                        <Grid>
                            <Grid.Column width = {2}>
                            <Image size = "mini"  circular src = {this.props.imageurl}/>
                                <span>{this.props.questionBy}</span>
                            
                            </Grid.Column>
                            <Grid.Column width = {13}>
                            <p style = {{fontFamily : "Gregoria", textAlign : "center", fontSize : "20px"}}>
                                {this.props.question}
                            </p>
                    
                            </Grid.Column>
                        </Grid>
                        </Segment>
                    <Segment padded style={{backgroundColor: "#b5e6e1"}}>
                        
                        <Grid>
                            <Grid.Column width = {2}>
                                <Image size = "mini"  circular src = {this.props.imageurl}/>
                                <span>{this.props.answerBy}</span>
                            </Grid.Column>
                            <Grid.Column width = {13} className = "questionText">
                                <p style = {{fontFamily : "Gregoria", textAlign : "justify", fontSize : "20px", whiteSpace: "pre-line"}}  >{this.props.answer}</p>
                            </Grid.Column>
                        </Grid>
                        <br />
                        <span style = {{position : "absolute",left : "10px"}}>
                            <Button primary>Add a comment</Button>
                        </span>
                            <br />
                            <br />
                    </Segment>
                </Segment.Group>
                <br />

            </div>
            </div>
        );
    }
}

export default LikedAnswer;