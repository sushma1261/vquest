import React, {Component} from 'react';
import { SegmentGroup, Segment, Grid, Image, Header } from 'semantic-ui-react';
import AnswerList from '../components/Answer/AnswerList';
import TagsDashboard from '../components/TagsDashboard/TagsDashboard';

class AnswerPage extends Component {
    render() {
        return(
            <div>
                <Grid>
                    <Grid.Column width = {1}>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        
                        <Grid>
                            <Grid.Column width = {1}>
                                <Image size = "mini"  circular src = "https://randomuser.me/api/portraits/women/24.jpg"/>
                                <span>Sushma</span>
                            </Grid.Column>
                            <Grid.Column width = {12} style = {{fontSize: "25px"}}>
                                Question goes here?????
                            </Grid.Column>
                            <Grid.Column width = {3}>
                                Tags: C++, C, Data structures<br />
                                2 answers
                            </Grid.Column>
                            <Header as = "h1" style = {{fontSize: "35px", paddingBottom: "20px"}}>Answers</Header>
                        </Grid>
                            <AnswerList />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <TagsDashboard />
                    </Grid.Column>
                    <Grid.Column width = {1}>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default AnswerPage;