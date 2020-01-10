import React from 'react';
import { Segment, Grid, Image, Button, Icon, Label } from 'semantic-ui-react';
import firebase from '../../Firebase/firebase';
class Answer extends React.Component {

    state = {
        likes : this.props.likes,
        flag : this.props.flag,
        username: localStorage.getItem("username")
    }

    handleLikes = async() => {
        //console.log(this.state.likes);
        var qry = firebase.database().ref("answers/"+this.props.answerKey+"/"+this.props.id);
        qry.child("likedBy").push({"user": this.state.username});
        var l = this.state.likes + 1
        this.setState({
            likes: l,
            flag: true
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

    componentDidMount() {
        console.log("Answer id");
        console.log(this.props.id);
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
                            <Grid.Column width = {13} className = "questionText">
                                <p style = {{fontFamily : "Gregoria", textAlign : "justify", fontSize : "20px", whiteSpace: "pre-line"}}  >{this.props.answer}</p>
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
