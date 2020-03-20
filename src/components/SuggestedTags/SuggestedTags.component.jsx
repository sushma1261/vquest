import React from 'react'
import { Segment, Grid, Button } from 'semantic-ui-react'

class SuggestedTags extends React.Component {
    render() {
        return(
            <div>
                <Grid >
                    <Grid.Column width = {5}>
                    </Grid.Column>
                    <Grid.Column width = {6}>
                        <Segment.Group horizontal>
        <Segment>{this.props.tag}</Segment>
                            <Segment>
                                <Button positive circular icon = "check" onClick = {this.props.accept}></Button>
                            </Segment>
                            <Segment>
                                <Button negative circular icon = "trash" onClick = {this.props.delete}></Button>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                    <Grid.Column width = {4}>
                    </Grid.Column>
                    
                </Grid>


                
                
            </div>
        );
    }
}

export default SuggestedTags;