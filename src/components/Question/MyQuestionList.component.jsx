import React from 'react';
import Question from './Question.component';
import firebase from '../../Firebase/firebase';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Notifications, {notify} from 'react-notify-toast';

const myColor = { background: '#0E1717', text: "#FFFFFF" };
class MyQuestionList extends React.Component {
    state = {
        username: localStorage.getItem("username"),
        questions : []
    }

    submit = (idx) => {
        console.log("submit");
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure you want to delete this question?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.removeQuestion(idx)
    
            },
            {
              label: 'No',
              onClick: () => console.log("No clicked")
            }
          ]
        });
      };

      removeQuestion = (idx) => {
        console.log("clicked");
        var arr = this.state.questions;
        var id = arr[idx].id;
        arr.splice(idx,1);
        this.setState({questions: arr});     
        console.log("qid",id)
        //this.removeQuestionFromTagList(id);
         this.removeFromDb(id);
      }
  
      removeQuestionFromTagList = async(id) => {
        var questions =[]
        var qry = firebase.database().ref("tags").orderByChild("questions")
        await qry.once("value")
          .then(function(snapshot) {
            //console.log(snapshot.key)
            snapshot.forEach(function(child) {
              var k = child.key
              console.log(k)
              if(child.val().questions) {
                questions = child.val().questions.filter(function (el) {
                  return (el !== null && el !== id);
                });
                console.log(questions)
                firebase.database().ref("tags").child(k).update({questions});
              }
            })
          })
          
      }
  
      removeFromDb = async(id) => {
        console.log(id);
        await firebase.database().ref("questions").child(id).remove();
        await firebase.database().ref("answers").child(id).remove();
        this.removeQuestionFromTagList(id)
        notify.show("Deleted Question", "custom", 5000, myColor);
  
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
                <Notifications />
                {this.state.questions.map( ({question, user, tags, noOfAns, id}, idx) => 
                    <Question question = {question} username = {user} tags = {tags} answers = {noOfAns} key = {id} id = {id} 
                    fun1 = {() => {
                        console.log("Clicked");
                        console.log(idx);
                        this.submit(idx);
                      }
                    }
                    />
                )}
            </div>

        );
    
    }
}

export default MyQuestionList;

// {question: "What is an Array?", user: localStorage.getItem("username"), tags: "C,C++,Java", id: "234"},
//             {question: "What is an Array1?", user: localStorage.getItem("username"), tags: "C,Java", id: "2343"},
//             {question: "What is an Array2?", user: localStorage.getItem("username"), tags: "C,C++,Java", id: "2344"},
        