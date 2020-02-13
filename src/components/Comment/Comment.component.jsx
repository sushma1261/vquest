import React from 'react';
import { Grid, Image, Button, Segment } from 'semantic-ui-react';
import download from '../../assests/download.png';
class Comment extends React.Component {
    render() {
        return(
            <div style = {{textAlign: "justify"}}>
                <Grid>
                            {/* {this.props.number} */}
                            <Grid.Column width = {2}>
                            <Image size = "mini"  circular src = {download}/>
        <span>{this.props.username}</span>
                            </Grid.Column>
                            <Grid.Column width = {12}>
        <p style = {{fontFamily : "Gregoria", textAlign : "justify", fontSize : "16px"}}>{this.props.comment}</p>
                            </Grid.Column>
                            {
                                localStorage.getItem("role") === "admin" &&
                                <Grid.Column width = {2}>
                                <Button negative circular icon = "trash" size = "mini"
                                onClick = {this.props.fun1}
                                ></Button>
                                </Grid.Column>
                            }
                        </Grid>    
            </div>
        )
    }
}
export default Comment;