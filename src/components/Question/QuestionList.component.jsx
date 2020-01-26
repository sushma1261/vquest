import React from 'react';
import Question from './Question.component';
import firebase from '../../Firebase/firebase';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Notifications, {notify} from 'react-notify-toast';

const myColor = { background: '#0E1717', text: "#FFFFFF" };
class QuestionList extends React.Component {
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
 
  
    state = {x : [], ques: [{question: "What is an array1"}, {question: "What is an array2"}, {question: "What is an array3"}]};

    

    componentDidMount() {
        
        this.dataBase();
        // console.log("DB");
      }
    
        dataBase = async() => {
            var x = [];
            var  query = firebase.database().ref("questions").limitToFirst(10);
            await query.once("value")
              .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  x.push(childSnapshot.val());
              });
            });
            this.setState({x: x});
            // console.log("state question "+this.state.x)
          }
    
    removeQuestion = (idx) => {
      console.log("clicked");
      var arr = this.state.x;
      var id = arr[idx].id;
      arr.splice(idx,1);
      // this.setState({ques: arr});
      this.setState({x: arr});
      // console.log(arr);
      
      this.removeFromDb(id);
    }

    removeFromDb = async(id) => {
      console.log(id);
      await firebase.database().ref("questions").child(id).remove();
      notify.show("Deleted Question", "custom", 5000, myColor);
    }

    render() {
        return (

            <div>
              <Notifications />
                {/* {this.state.ques.map( ({question}, idx) => 
                    <Question question = {question} fun1 = {() => {
                     // console.log("Clicked");
                      // console.log(idx);
                      this.submit(idx);
                      //this.removeQuestion(idx)
                    }
                    }
                   />
                )};
                 */}
                {this.state.x.map(({question, user, tags, noOfAns, id}, idx) => 
                    <Question question = {question} username = {user} tags = {tags} answers = {noOfAns} key = {id} id = {id} fun1 = {() => {
                      console.log("Clicked");
                      console.log(idx);
                      this.submit(idx);
                    }
                  } />
                )}
                
            </div>

        );
    
    }
}

export default QuestionList;


// addData = async() => {
    //     // console.log("Push Data");
    //     var x = {username: "Sushma", question: "New Question", id: 0}
    //     var q = firebase.database().ref("questions");
    //     var k = q.push(x).key;
    //     q.child(k).update({"id": k});
    //     // console.log("key", k);
    //     // var qq = q.push(x.set(key, q.key);
    //     // var t = q.key;
    //     // console.log(t);
    // }