import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import QuestionList from '../components/Question/QuestionList.component';
import { Link } from 'react-router-dom';

class QuestionPage extends React.Component {
    
    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column width={16}>
                        <Grid>
                            <Grid.Column width = {12}>
                                <h1>Questions</h1>
                            </Grid.Column>
                            <Grid.Column width = {4}>
                                <Button as = {Link} to = "/newQuestion">Add a new question</Button>
                            </Grid.Column>
                        </Grid>
                            <QuestionList />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default QuestionPage;
