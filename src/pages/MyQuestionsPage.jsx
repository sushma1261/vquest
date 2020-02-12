import React, {Component} from 'react';
import MyQuestionList from '../components/Question/MyQuestionList.component';
import { Grid } from 'semantic-ui-react';
import TagsDashboard from '../components/TagsDashboard/TagsDashboard';

class MyQuestionsPage extends Component {
    render() {
        return (
            <div>
                 <Grid>
                    <Grid.Column>
                        <h1>My Questions</h1>
                            <MyQuestionList />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

}

export default MyQuestionsPage;