import React, {Component} from 'react';
import MyQuestionList from '../components/Question/MyQuestionList.component';

class MyQuestionsPage extends Component {
    render() {
        return (
            <div>
                <h1>My Questions</h1>
                <MyQuestionList />
            </div>
        );
    }

}

export default MyQuestionsPage;