import React from 'react';
import Question from './Question.component';
import firebase from '../../Firebase/firebase';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Notifications, {notify} from 'react-notify-toast';
import { Modal, Header, Button } from 'semantic-ui-react';
import DropdownComponent from '../DropdownComponent';

const myColor = { background: '#0E1717', text: "#FFFFFF" };
class QuestionList extends React.Component {
  submit = (idx, user, question) => {
    this.setState({showModal: true})
    this.setState({selectedIdx: idx,user: user,selectedQuestion: question})
    // console.log("submit");
    // confirmAlert({
    //   title: 'Confirm to submit',
    //   message: 'Are you sure you want to delete this question?',
    //   buttons: [
    //     {
    //       label: 'Yes',
    //       onClick: () => this.removeQuestion(idx, user, question)
    //     },
    //     {
    //       label: 'No',
    //       onClick: () => console.log("No clicked")
    //     }
    //   ]
    // });
  };
 
  
    state = {x : [], 
      ques: [{question: "What is an array1"}, {question: "What is an array2"}, {question: "What is an array3"}],
      showModal: false,
      options: [
        {"label": "Inappropriate Question", "value": 0},
        {"label": "Question Already Exists", "value": 1},
     ],
     selectedIdx: 0,
     user: "",
     selectedQuestion: ""
    };

    

    componentDidMount() {
        this.dataBase();
      }
  
        dataBase = async() => {
            var x = [];
            var  query = firebase.database().ref("questions").orderByChild("postedOn").limitToLast(5);
            await query.once("value")
              .then(function(snapshot) {
                 snapshot.forEach(function(childSnapshot) {
                  x.push(childSnapshot.val());
                  
              });
            });
            console.log(x);
            x.reverse();
            this.setState({x: x});
           // this.getUserImage(x);
            // console.log("Type:: ", typeof(x))
            // console.log("state question "+this.state.x)
          }
    
    removeQuestion = async() => {
      this.setState({showModal: false})
      // console.log("clicked");
      var idx = this.state.selectedIdx
      var user = this.state.user
      var question = this.state.selectedQuestion;
      var arr = this.state.x;
      var id = arr[idx].id;
      var noOfAns = arr[idx].noOfAns;
      console.log(noOfAns);
      var score = 0;
      if(noOfAns === 0) {
        arr.splice(idx,1);
        this.setState({x: arr});
        await firebase.database().ref("users").child(user).once("value")
        .then(function (snapshot) {
          score = snapshot.val().score;
        });
        this.removeFromDb(id, user, question);
      }
      else {
      // console.log(this.state.selectedOption)
      // console.log(id, user, question);
      var message = "Your Question " + question + " has been deleted by " + localStorage.getItem("username") + " because " + this.state.selectedOption.label
      await firebase.database().ref("notifications").child(user).push({"message": message})
      
      await firebase.database().ref("questions").child(id).update({deleted: true});
        //decrease score
      await firebase.database().ref("users").child(user).once("value")
      .then(function (snapshot) {
        score = snapshot.val().score;
      });
      }
      console.log("Score", score);
      await firebase.database().ref("users").child(user).update({score: score - 200});
      notify.show("Deleted Question", "custom", 5000, myColor);
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
              // console.log(questions)
              firebase.database().ref("tags").child(k).update({questions});
            }
          })
        })
        
    }

    removeFromDb = async(id, user, question) => {
      console.log(this.state.selectedOption)
      console.log(id, user, question);
      var message = "Your Question " + question + " has been deleted by " + localStorage.getItem("username") + " because " + this.state.selectedOption.label
      await firebase.database().ref("notifications").child(user).push({"message": message})
      var x = []
      await firebase.database().ref("answers").child(id).once("value")
      .then(function(snapshot){
        snapshot.forEach(function(child){
          x.push(child.key)
        })
      })
      // console.log(x)
      x.forEach(async function(a) {
        await firebase.database().ref("comments").child(a).remove();
      })
      await firebase.database().ref("questions").child(id).remove();
      await firebase.database().ref("answers").child(id).remove();
      this.removeQuestionFromTagList(id)
      notify.show("Deleted Question", "custom", 5000, myColor);

    }

    handleChange2 = (selectedOption) => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    };

    render() {
        return (

            <div>
              <Notifications />
                {this.state.x.map(({question, user, tags, noOfAns, id, deleted}, idx) => 
                    <Question deleted = {deleted} question = {question} username = {user} tags = {tags} answers = {noOfAns} key = {id} id = {id} fun1 = {() => {
                      console.log("Clicked");
                      console.log(question);
                      console.log(deleted)
                      this.submit(idx,user,question);
                    }
                  } />
                )}
                <Modal open = {this.state.showModal} closeIcon onClose={() => {this.setState({showModal : !this.state.showModal})}}>
                    <Modal.Content image>
                    <Modal.Description>
                        <Header>Select why you want to delete the question?</Header><br />
                        <DropdownComponent options = {this.state.options} handleChange = {this.handleChange2.bind(this)} isMulti={false} placeholder = "Select option"/><br />
                        <div style = {{position: "absolute", right:"10px"}}>
                          <Button onClick = {this.removeQuestion} negative style = {{textAlign: "right"}}>Delete</Button></div>
                        <br /><br />
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
                
            </div>

        );
    
    }
}

export default QuestionList;
    