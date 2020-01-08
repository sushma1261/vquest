import React from 'react';
import Question from './Question.component';

class MyQuestionList extends React.Component {
    state = {
        questions : [
            {question: "What is an Array?", user: localStorage.getItem("username"), tags: "C,C++,Java", id: "234"},
            {question: "What is an Array1?", user: localStorage.getItem("username"), tags: "C,Java", id: "2343"},
            {question: "What is an Array2?", user: localStorage.getItem("username"), tags: "C,C++,Java", id: "2344"},
        ]
    }

    render() {
        
        return (
            <div>
                {this.state.questions.map( ({question, user, tags, noOfAns, id}) => 
                    <Question question = {question} username = {user} tags = {tags} answers = {noOfAns} key = {id} id = {id} />
                )}
            </div>

        );
    
    }
}

export default MyQuestionList;