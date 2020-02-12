import React from 'react';
import LikedAnswer from './LikedAnswer.component';
import { Header } from 'semantic-ui-react';
class LikedAnswersList extends React.Component {
    render() {
        return(
            <div>
                <Header as = "h1">Liked Answers:</Header>

                <LikedAnswer answerBy = "Sushma" answer = "This is space for an answer1 that u liked" question = "Here goes your question1????" questionBy = "Naveena" />
                <LikedAnswer answerBy = "Naveena" answer = "This is space for an answer2 that u liked" question = "Here goes your question2????"questionBy = "Sushma" />
            </div>
        );
    }
}

export default LikedAnswersList;