import React from 'react';
import firebase from '../Firebase/firebase';
import Question from '../components/Question/Question.component';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Notifications, {notify} from 'react-notify-toast';
const myColor = { background: '#0E1717', text: "#FFFFFF" };
class SearchPage extends React.Component {

    state = {
        searchQuery: this.props.match.params.id, 
        questions: []
    }

    submit = (idx, user, question) => {
        console.log("submit");
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure you want to delete this question?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.removeQuestion(idx, user, question)
            },
            {
              label: 'No',
              onClick: () => console.log("No clicked")
            }
          ]
        });
      };
      removeQuestion = (idx, user, question) => {
        console.log("clicked");
        var arr = this.state.questions;
        var id = arr[idx].id;
        arr.splice(idx,1);
        this.setState({x: arr});     
        console.log("qid",id)
         this.removeFromDb(id, user, question);
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
  
      removeFromDb = async(id, user, question) => {
        console.log(id, user, question);
        var message = "Your Question " + question + " has been deleted by " + localStorage.getItem("username") + " due to irrelevant content"
        await firebase.database().ref("notifications").child(user).push({"message": message})
        await firebase.database().ref("questions").child(id).remove();
        await firebase.database().ref("answers").child(id).remove();
        this.removeQuestionFromTagList(id)
        notify.show("Deleted Question", "custom", 5000, myColor);
  
      }

    componentDidMount() {
        this.fetchSearchQuery()
    }


    fetchSearchQuery = async() => {
            console.log(this.state.searchQuery);
            var list = []
            var str = this.state.searchQuery.toLowerCase().split(" ");
            await firebase.database().ref("questions").orderByChild("noOfAns").once("value")
            .then(function(snapshot){
                snapshot.forEach(function(child){
                    var q = child.val().question.toLowerCase().split(" ")
                    if(str.some(item => q.includes(item))) {
                        list.push(child.val())
                    }
                })
            })
        this.setState({questions: list})
    }

    render() {
        return(
            <div>
                <Notifications/>
                {
                    this.state.questions.reverse().map(({question, user, tags, noOfAns, id}, idx) => (
                        <Question question = {question} username = {user} tags = {tags} answers = {noOfAns} key = {id} id = {id} fun1 = {() => {
                            console.log("Clicked");
                            console.log(idx);
                            this.submit(idx,user,question);
                          }
                        } />
                    ))
                }
            </div>
        )
    }
}
export default SearchPage