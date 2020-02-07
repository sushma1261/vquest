import React from 'react';
import {Segment, Grid, Image, Icon, Form} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
class MyProfile extends React.Component {
    render() {
        return (
                <Segment style={{backgroundColor: "#b5e6e1"}}>
                    <Grid>
                        <Grid.Row  floated = "center"> 
                            <Image src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" size='small' circular centered/>
                        </Grid.Row>
                        <Grid.Row> 
                            <Grid floated = "center">
                                <Grid.Column width = {13}>
                                    <Icon disabled name='users' size ="large"/>
                                </Grid.Column>
                                <Grid.Column width = {2}>
                                    <h1>Sushma</h1> 
                                </Grid.Column>
                            </Grid>
                        </Grid.Row>
                    </Grid>
                </Segment>
                
        )
    }
}

export default MyProfile;