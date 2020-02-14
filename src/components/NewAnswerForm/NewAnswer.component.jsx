import React from 'react';
import { Header, Form, Button } from 'semantic-ui-react';
import firebase from '../../Firebase/firebase';
import { withRouter } from 'react-router-dom';

class NewAnswer extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          answer: '',
          qid: this.props.qid,
          username: localStorage.getItem("regd"),
          question: '',
        };

      }
      handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
      }

      componentDidMount() {
        this.getQuestion();    
      }

      addAnswerToDB = async() => {
        if(this.state.answer !== "") {
            var qid = this.state.qid;
            var data = {
                    answer: this.state.answer,
                    user: this.state.username,
                    noOfLikes: 0,
            }
            var ref = firebase.database().ref("answers")
            var k = ref.child(qid).push(data).key;
            await ref.child(qid).child(k).update({"id": k, "postedOn": firebase.database.ServerValue.TIMESTAMP});
            console.log(k);
            this.setState({
                answer: ''
            });
            this.updateNoOfAnswers(); 
            if(localStorage.getItem("role") !== "admin") { 
              this.updateScore();     
            }
        }
   }

   updateScore = async() => {
    var key = "", score = 0;
    var ref2 = firebase.database().ref("users")
    await ref2.orderByChild("regd").equalTo(this.state.username).once("value")
    .then(function (snapshot) {
        snapshot.forEach(function(f){
            key = f.key;
             score = f.val().score;
        })
    })
    console.log(key, score)
    await ref2.child(key).update({score: score+100});
    console.log("Done")
   }

   updateNoOfAnswers = async() => {
        var ref = firebase.database().ref("questions").child(this.state.qid);
        var noOfAns = 0;
        await ref.once("value")
        .then(function (snapshot) {
            noOfAns = snapshot.val().noOfAns
        });
        console.log(noOfAns);
        await ref.update({noOfAns: noOfAns+1});
        this.props.history.push("/a/"+this.state.qid);
   }
   
      getQuestion = async() => {
        var ref = firebase.database().ref("questions");
        var q = {};
        var query = ref.orderByChild("id").equalTo(this.state.qid);
        await query.once("value")
            .then(function (snapshot) {
                console.log("Question", snapshot.val());
                snapshot.forEach(function (childSnapshot) {
                    console.log(childSnapshot.val());
                    q = childSnapshot.val().question;
                });
            });
        this.setState({ question: q });
        console.log("q", q);
      }

      
      
    render() {
        return (
            <div>
                <Header>{this.state.question}</Header>
                <Form>
                <Form.TextArea fluid placeholder='Write Your Answer Here........'
                        value={this.state.answer} onChange={this.handleChange}
                        type="text" name="answer" className="form-control" id="InputAnswer"
                        style={{ minHeight: 250, fontSize: 18 }}
                        />
                
                <Button primary onClick = {this.addAnswerToDB.bind(this)}>Submit</Button>
                </Form>
            </div>
        );
    }
}
export default withRouter(NewAnswer);



// addAnswerToDB = async() => {
//     console.log(this.state.answer);
//     var ref = firebase.database().ref("answers");
//     var answerKey = "";
//     var query = ref.orderByChild("qid").equalTo(this.state.qid);
//     await query.once("value")
//         .then(function (snapshot) {
//             console.log("Snap::::", snapshot.val());
//             snapshot.forEach(function (childSnapshot) {
//                 answerKey = childSnapshot.key;
//                 console.log("Answer key", answerKey);
//             }); 
//         });
//         var k = "";
//     console.log("after snap", answerKey);
//     if(answerKey === "") {
//         console.log("if", answerKey);
//         var qry = firebase.database().ref("answers");
//         var x = {qid: this.state.qid};
//         k = qry.push(x).key;
//         qry = firebase.database().ref("answers/"+k);
//         var data = {
//             answer: this.state.answer,
//             user: this.state.username,
//             noOfLikes: 0,
//         }
//         k = qry.push(data).key;
//         qry.child(k).update({"id": k});
//         this.setState({
//             answer: ''
//         });
//         //console.log("No answers yet");
//     }
//     else {
//         console.log("else", answerKey);
//         var q = firebase.database().ref("answers/"+answerKey);
//         var data = {
//             answer: this.state.answer,
//             user: this.state.username,
//             noOfLikes: 0,
//         }
//         k = q.push(data).key;
//         q.child(k).update({"id": k});
//         this.setState({
//             answer: ''
//         });
//     }
//     // change no of  answers in questions data
//     var noOfAns = 0;
//     query = firebase.database().ref("questions").orderByChild("id").equalTo(this.state.qid);
//     await query.once("value")
//         .then(function (snapshot) {
//             //console.log("Snap::::", snapshot);
//             snapshot.forEach(function (childSnapshot) {
//                 //console.log(childSnapshot.val().noOfAns);
//                 noOfAns = childSnapshot.val().noOfAns;
//             }); 
//         });


//     q = firebase.database().ref("questions/");
//     q.child(this.state.qid).update({noOfAns: noOfAns+1});
//     console.log("props");
//     this.props.history.push("/a/"+this.state.qid);
// }
