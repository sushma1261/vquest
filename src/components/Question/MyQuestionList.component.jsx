import React from 'react';
import Question from './Question.component';
import firebase from '../../Firebase/firebase';

class MyQuestionList extends React.Component {
    state = {
        username: localStorage.getItem("username"),
        questions : []
    }

    getQuestions = async() => {
        var x = [];
        var  query = firebase.database().ref("questions").orderByChild("user").equalTo(this.state.username);
        await query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            //   console.log("Questions list")
            //   console.log(childSnapshot.val());
            x.push(childSnapshot.val());
          });
        });
       this.setState({questions: x});
    }

    componentDidMount() {
        this.getQuestions();
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

// {question: "What is an Array?", user: localStorage.getItem("username"), tags: "C,C++,Java", id: "234"},
//             {question: "What is an Array1?", user: localStorage.getItem("username"), tags: "C,Java", id: "2343"},
//             {question: "What is an Array2?", user: localStorage.getItem("username"), tags: "C,C++,Java", id: "2344"},
        