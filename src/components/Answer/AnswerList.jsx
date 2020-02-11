import React from 'react';
import Answer from './Answer.component';
import firebase from '../../Firebase/firebase';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



// const ans = [
//     {
//         number : "1",
//         username: "Sushma" ,
//         answer: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus" ,
//         imageurl: "https://randomuser.me/api/portraits/women/24.jpg",
//         likes: "4",
//     },
//     {
//         number : "2",
//         username: "Preethi" ,
//         answer: "jhsdjfhii ihisf ie fyewg bfuewgf hjwerb fuwheurf bhgrfuywe uwegf f uge fubeuhfewgugeuyfgu efg uhegfduh f" ,
//         imageurl: "https://randomuser.me/api/portraits/women/29.jpg",
//         likes: "3"
//     }
// ]

// const comments1 = [
//     { username: "Sushma",  comment: "Nice Answer!!!!"},
//     { username: "Naveena", comment: "Nice Answer!!!"},
//     { username: "Ramya", comment: "Nice Answer!"},
//     { username: "Sushma", comment: "Nice Answer!!" },
//     { username: "Naveena", comment: "Nice Answer!!!!!!"}
// ];

// const comments2 = [
//     { username: "Sushma",  comment: "Nice Answer!!!!"},
//     { username: "Naveena", comment: "Nice Answer!!!"},
//     { username: "Preethi", comment: "Can you explain more elaborativelywjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiuwjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiuwjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiuwjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiuwjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiuwjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiuwjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiuwjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiu"},
//     { username: "Ramya", comment: "Nice Answer!"},
// ]

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
        //console.log("qid::**::"+this.state.qid)
        var ans = [];
        var flag = false;
        var answerKey = "";
        var ref = firebase.database().ref("answers");
        var query = ref.child(this.state.qid)
        await query.once("value")
            .then(function (snapshot) {
                // console.log("Child Snap::::")
                // console.log(snapshot.val())
                snapshot.forEach(function (childSnapshot) {
                    answerKey = childSnapshot.key
                    // console.log("Child Snap::::")
                    // console.log(childSnapshot.val());
                    if(childSnapshot.val().likedBy) {
                                var x = childSnapshot.val().likedBy;
                                for (var key in x) {
                                    if (x.hasOwnProperty(key)) {           
                                        if(x[key]["user"] === localStorage.getItem("username")) {
                                            flag = true;
                                        }
                                    }
                                }
                            }
                    var data = childSnapshot.val();
                    data.flag = flag;
                    ans.push(data);
                    flag = false;
                });
            });
        this.setState({ answers: ans, answerKey: answerKey}, () => {
            // console.log("State::");
            // console.log(this.state.answers);
        });
        
    }

    removeAnswer = (id) => {
        // console.log("Delete clicked");
        // console.log(this.state.answers);
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
      
    }

    render() {
       // console.log("props"+JSON.stringify(this.state.answers));
        return (
            <div>
                {/* <Answer key = "1" id = "q12" username = "Sushma" answer = "wjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiu" likes = {5} flag = {false} answerKey = "oshfdo" removeAnswer = {this.removeAnswer}/>
                <Answer key = "2" id = "q12" username = "Sushma" answer = "wjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiu" likes = {5} flag = {false} answerKey = "oshfdo" comments = {comments1}/>
                <Answer key = "3" id = "q12" username = "Sushma" answer = "wjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiu" likes = {5} flag = {false} answerKey = "oshfdo" comments = {comments2}/>
                <Answer key = "4" id = "q12" username = "Sushma" answer = "wjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiu" likes = {5} flag = {false} answerKey = "oshfdo" comments = {comments2}/> */}
                {this.state.answers.map((a,idx) => (
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
                {/* {
                    ans.map((a, idx) => (
                        <Answer key = {a.number} id = {a.number} username = {a.username} answer = {a.answer} likes = {a.likes} flag = {false} fun1 = {() => {
                            console.log("Clicked");
                            console.log(idx);
                            this.submit(idx);
                          }
                        } />
                    ))
                } */}
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