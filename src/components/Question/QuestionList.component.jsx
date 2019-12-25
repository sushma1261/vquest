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

    addData = async() => {
        console.log("Push Data");
        var x = {username: "Sushma", question: "New Question", id: 0}
        var q = firebase.database().ref("questions");
        var k = q.push(x).key;
        var s = q.child(k).update({"id": k});
        console.log("key", k);
        // var qq = q.push(x.set(key, q.key);
        // var t = q.key;
        // console.log(t);
    }

    componentDidMount() {
        
       // this.dataBase();
        //this.addData();
        console.log("DB");
        // console.log(this.state.x);
      }
    
        dataBase = async() => {
          console.log("aaaa");
            console.log("Hello");
            // var y = this.state.x;
            var x = [];
            
            var  query = firebase.database().ref("questions");
            await query.once("value")
              .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  console.log(childSnapshot.val().id);
                  x.push(childSnapshot.val());
              });
              
            });
            this.setState({x: x});
            console.log(this.state.x)

          }

    render() {
        return (

            <div>
                {/* {this.state.ques.map( ({question, username, tag, answers, imageurl}) => 
                    <Question question = {question} username = {username} tag = {tag} answers = {answers} imageurl = {imageurl}  />
                )};
                 */}
                {this.state.x.map( ({question, user, tag, noOfAns}) => 
                    <Question question = {question} username = {user} tag = {tag} answers = {noOfAns}  />
                )}
            </div>

        );
    
    }
}

export default QuestionList;