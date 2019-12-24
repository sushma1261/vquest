import React from 'react';
import Question from './Question.component';
import firebase from '../../Firebase/firebase';
const ques = [
    {
        question: "What is a pointer?",
        username:"Sushma",
        tag: "data-structures, c++",
        answers: "0",
        imageurl: "https://randomuser.me/api/portraits/women/24.jpg"

    },
    {
        question: "What is an array?",
        username: "Preethi", 
        tag: "data-structures",
        answers:  "5", 
        imageurl: "https://randomuser.me/api/portraits/women/28.jpg" 

    },
    {
        question: "What is a String?",
        username: "Naveena", 
        tag: "data-structures, C",
        answers:  "1", 
        imageurl: "https://randomuser.me/api/portraits/women/30.jpg"
    },
    {
        question: "What is a String?",
        username: "Naveena", 
        tag: "data-structures, C",
        answers:  "1", 
        imageurl: "https://randomuser.me/api/portraits/women/30.jpg"
    }
];



class QuestionList extends React.Component {
    state = {ques: ques, x : []};

    componentDidMount() {
        this.state.x.push({s:"Sushma"});
        this.state.x.push({s:"abcd"});
        this.dataBase();
        console.log("DB");
        // console.log(this.state.x);
      }
    
        dataBase = async() => {
          console.log("aaaa");
            console.log("Hello");
            var  query = firebase.database().ref("questions").orderByKey().equalTo("q2");
            await query.once("value")
              .then(function(snapshot) {
                  console.log(snapshot.val());
                snapshot.forEach(function(childSnapshot) {
                  console.log(childSnapshot.val());
                  console.log(snapshot.numChildren());
              });
            });
        //     this.state.x.push({s:"Sushma"});
        // this.state.x.push({s:"abcd"});
          }

    render() {
        return (

            <div>
                {
                console.log(this.state.x)
                }
                {this.state.ques.map( ({question, username, tag, answers, imageurl}) => 
                    <Question question = {question} username = {username} tag = {tag} answers = {answers} imageurl = {imageurl}  />
                )};
                <Question question = "How r u??" />
            </div>

        );
    
    }
}

export default QuestionList;