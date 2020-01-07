import React from 'react';
import Question from './Question.component';
import firebase from '../../Firebase/firebase';

class QuestionList extends React.Component {
  
    state = {x : []};

    addData = async() => {
        // console.log("Push Data");
        var x = {username: "Sushma", question: "New Question", id: 0}
        var q = firebase.database().ref("questions");
        var k = q.push(x).key;
        var s = q.child(k).update({"id": k});
        // console.log("key", k);
        // var qq = q.push(x.set(key, q.key);
        // var t = q.key;
        // console.log(t);
    }

    componentDidMount() {
        
       this.dataBase();
        // console.log("DB");
      }
    
        dataBase = async() => {
          // console.log("aaaa");
          //   console.log("Hello");
            // var y = this.state.x;
            var x = [];
            var  query = firebase.database().ref("questions").limitToFirst(10);
            await query.once("value")
              .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  // console.log(childSnapshot.val().id);
                  x.push(childSnapshot.val());
              });
            });
            this.setState({x: x});
            // console.log("state question "+this.state.x)
          }

    render() {
        return (

            <div>
                {/* {this.state.ques.map( ({question, username, tag, answers, imageurl}) => 
                    <Question question = {question} username = {username} tag = {tag} answers = {answers} imageurl = {imageurl}  />
                )};
                 */}
                {this.state.x.map( ({question, user, tags, noOfAns, id}) => 
                    <Question question = {question} username = {user} tags = {tags} answers = {noOfAns} key = {id} id = {id} />
                )}
            </div>

        );
    
    }
}

export default QuestionList;