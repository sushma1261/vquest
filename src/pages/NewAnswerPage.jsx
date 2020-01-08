import React from 'react';
import NewAnswer from '../components/NewAnswerForm/NewAnswer.component';

class NewAnswerPage extends React.Component {
    render() {
        return(
            <div>
                <h1>
                    <NewAnswer />
                </h1>
            </div>
        )
    }
}

export default NewAnswerPage;