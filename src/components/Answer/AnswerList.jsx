import React from 'react';
import Answer from './Answer.component';
import firebase from '../../Firebase/firebase';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Notifications, {notify} from 'react-notify-toast';


const myColor = { background: '#0E1717', text: "#FFFFFF" };

class AnswerList extends React.Component {


    componentDidMount() {
        this.getAnswers();
        console.log("Comments::::");
        console.log(this.props.qid);
    }

    state = {
        qid : this.props.qid,
        //comments: comments,
        answers: [],
        flag: false,
        answerKey: "",
        
    }

    submit = (idx) => {
        console.log("submit"+idx);
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure you want to delete this question?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.removeAnswer(idx)
    
            },
            {
              label: 'No',
              onClick: () => console.log("No clicked")
            }
          ]
        });
      };

    getAnswers = async() => {
        var ans = [];
        var flag = false;
        var answerKey = "";
        var d1 = {}
        var query1 = firebase.database().ref("answers").child(this.state.qid).orderByChild("postedOn").limitToLast(1)
        await query1.once("value")
            .then(function (snapshot) {
                console.log(snapshot.val())
                snapshot.forEach(function (childSnapshot) {
                    answerKey = childSnapshot.key
                    if(childSnapshot.val().likedBy) {
                                var x = childSnapshot.val().likedBy;
                                for (var key in x) {
                                    if (x.hasOwnProperty(key)) {           
                                        if(x[key]["user"] === localStorage.getItem("regd")) {
                                            flag = true;
                                        }
                                    }
                                }
                            }
                    d1 = childSnapshot.val();
                    d1.flag = flag;
                    flag = false;
                });
            });
        
        var query = firebase.database().ref("answers").child(this.state.qid).orderByChild("noOfLikes").limitToLast(3)
        await query.once("value")
            .then(function (snapshot) {
                console.log("Child Snap::::")
                snapshot.forEach(function (childSnapshot) {
                    if(childSnapshot.val().id !== d1.id) {
                        answerKey = childSnapshot.key
                        console.log(childSnapshot.val().noOfLikes);
                        if(childSnapshot.val().likedBy) {
                                    var x = childSnapshot.val().likedBy;
                                    for (var key in x) {
                                        if (x.hasOwnProperty(key)) {           
                                            if(x[key]["user"] === localStorage.getItem("regd")) {
                                                flag = true;
                                            }
                                        }
                                    }
                                }
                        var data = childSnapshot.val();
                        data.flag = flag;
                        ans.push(data);
                        flag = false;
                            }
                });
            });
            ans.push(d1);
        this.setState({ answers: ans, answerKey: answerKey}, () => {
            this.reverseArray();
        });
    }

    reverseArray() {
        // console.log(typeof(this.state.answers))
        if(this.state.answers !== []) {
            var r = this.state.answers.reverse()
            console.log(r)
        }
    }

    removeAnswer = (id) => {
        var arr = this.state.answers;
        var aid = arr[id].id;
        arr.splice(id,1);
        this.setState({answers: arr});      
        this.removeFromDB(this.state.qid,aid);
    }


    removeFromDB = async(qid, id) => {
      console.log(qid,id)
      await firebase.database().ref("answers").child(qid).child(id).remove();
      await firebase.database().ref("comments").child(id).remove();
      var ref = firebase.database().ref("questions").child(qid);
        var noOfAns = 0;
        await ref.once("value")
        .then(function (snapshot) {
            console.log(snapshot.val());
            noOfAns = snapshot.val().noOfAns
        });
        console.log(noOfAns);
        await ref.update({noOfAns: noOfAns-1});
        notify.show("Deleted Answer", "custom", 5000, myColor);
    }



    render() {
       // console.log("props"+JSON.stringify(this.state.answers));
        return (
            <div>
                <Notifications />
                {/* <Answer key = "1" id = "q12" username = "Sushma" answer = "wjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiu" likes = {5} flag = {false} answerKey = "oshfdo" removeAnswer = {this.removeAnswer}/>
                <Answer key = "2" id = "q12" username = "Sushma" answer = "wjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiu" likes = {5} flag = {false} answerKey = "oshfdo" comments = {comments1}/>
                <Answer key = "3" id = "q12" username = "Sushma" answer = "wjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiu" likes = {5} flag = {false} answerKey = "oshfdo" comments = {comments2}/>
                <Answer key = "4" id = "q12" username = "Sushma" answer = "wjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiu" likes = {5} flag = {false} answerKey = "oshfdo" comments = {comments2}/> */}
                {this.state.answers.reverse().map((a,idx) => (
                    <Answer key = {a.id} id = {this.state.qid} username = {a.user} answer = {a.answer} likes = {a.noOfLikes} flag = {a.flag} answerKey = {a.id}
                        fun1 = {() => {
                            //console.log(a.id)
                            console.log("Clicked");
                            console.log(idx);
                            this.submit(idx);
                        }
                    }
                    />
                ))}   
            </div>
        );
    }
}


export default AnswerList;





// childSnapshot.forEach(function (answer) {
                    //     console.log("Answers::*********");
                    //     console.log(answer.val());
                        // if (answer.val().id) {
                        //     if(answer.val().likedBy) {
                        //         //console.log(answer.val().likedBy);
                        //         var x = answer.val().likedBy;
                        //         for (var key in x) {
                        //             if (x.hasOwnProperty(key)) {           
                        //                 //console.log(key, x[key]["user"]);
                        //                 if(x[key]["user"] === localStorage.getItem("username")) {
                        //                     flag = true;
                        //                 }
                        //             }
                        //         }
                        //     }
                        //     var data = answer.val();
                        //     data.flag = flag;
                        //     ans.push(data);
                        // }
                        // flag = false;
                    // });