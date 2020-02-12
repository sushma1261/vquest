import React from 'react'
import { Icon, Segment, Grid, Button } from 'semantic-ui-react'

class SuggestedTags2 extends React.Component {
    render() {
        return(
            <div>
                <Grid >
                    <Grid.Column width = {5}>
                    </Grid.Column>
                    <Grid.Column width = {6}>
                        <Segment.Group horizontal>
                            <Segment>C++</Segment>
                            <Segment>
                                <Button positive circular icon = "check"></Button>
                            </Segment>
                            <Segment>
                                <Button negative circular icon = "trash"></Button>
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

export default SuggestedTags2;