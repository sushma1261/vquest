import React from 'react';
import Answer from './Answer.component';
import firebase from '../../Firebase/firebase';


// const ans = [
//     {
//         number : "1",
//         username: "Sushma" ,
//         answer: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus" ,
//         imageurl: "https://randomuser.me/api/portraits/women/24.jpg",
//         likes: "4"
//     },
//     {
//         number : "2",
//         username: "Preethi" ,
//         answer: "jhsdjfhii ihisf ie fyewg bfuewgf hjwerb fuwheurf bhgrfuywe uwegf f uge fubeuhfewgugeuyfgu efg uhegfduh f" ,
//         imageurl: "https://randomuser.me/api/portraits/women/29.jpg",
//         likes: "3"
//     }
// ]
class AnswerList extends React.Component {


    componentDidMount() {
        this.getAnswers();
        // console.log("DB");
    }
    state = {
        qid : this.props.qid,

        answers: [], 
        flag: false,
        answerKey: ""
    }

    getAnswers = async () => {
        var ans = [];
        var flag = false;
        var answerKey = "";
        var ref = firebase.database().ref("answers");
        var query = ref.orderByChild("qid").equalTo(this.state.qid)
        await query.once("value")
            .then(function (snapshot) {
                //console.log("snap::", snapshot.key);
                //ans.push(snapshot.val())
                snapshot.forEach(function (childSnapshot) {
                    answerKey = childSnapshot.key
                    childSnapshot.forEach(function (answer) {
                        if (answer.val().id) {
                            // console.log("Key")
                            // console.log(answer.key);
                            if(answer.val().likedBy) {
                                //console.log(answer.val().likedBy);
                                var x = answer.val().likedBy;
                                for (var key in x) {
                                    if (x.hasOwnProperty(key)) {           
                                        //console.log(key, x[key]["user"]);
                                        if(x[key]["user"] === localStorage.getItem("username")) {
                                            flag = true;
                                        }
                                    }
                                }
                                //console.log(x);
                            }
                            //var data = {"flag": flag};
                            var data = answer.val();
                            data.flag = flag;
                            //console.log("Data");
                            //console.log(data);
                            //console.log(answer.val());
                            ans.push(data);
                            //ans.push({flag: flag})
                        }
                        flag = false;
                    });
                });
            });

        this.setState({ answers: ans, answerKey: answerKey});
        console.log("State::");
        console.log(this.state);
    }

    render() {
        //console.log("props"+JSON.stringify(this.props.answers));
        return (
            <div>
                {/* <Answer id = "q12" username = "Sushma" answer = "wjehsadihawiewnuwg igw egeuyf ufg qg\n ergfyerf eiuyrf \n iuh wiu" likes = {5} flag = {false} answerKey = "oshfdo"/> */}
                {this.state.answers.map((a) => (
                    <Answer key = {a.id} id = {a.id} username = {a.user} answer = {a.answer} likes = {a.noOfLikes} flag = {a.flag} answerKey = {this.state.answerKey}/>
                ))}   
            </div>
        );
    }
}

export default AnswerList;