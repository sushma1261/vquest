import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import QuestionList from '../components/Question/QuestionList.component';
import TagsDashboard from '../components/TagsDashboard/TagsDashboard';
import { Link } from 'react-router-dom';

class QuestionPage extends React.Component {
    
    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column width={16}>
                        <h1>Questions</h1>
                        <Button as = {Link} to = "/newQuestion">Add a Question</Button>
                            <QuestionList />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default QuestionPage;
