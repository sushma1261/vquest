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
        answers: []
    }


    getAnswers = async () => {
        var ans = [];
        var ref = firebase.database().ref("answers");
        var query = ref.orderByChild("qid").equalTo(this.state.qid)
        await query.once("value")
            .then(function (snapshot) {
                console.log("snap::", snapshot.val());
                snapshot.forEach(function (childSnapshot) {
                    childSnapshot.forEach(function (answer) {
                        if (answer.val().id) {
                            console.log(ans);
                            ans.push(answer.val())
                        }
                    });
                });
            });
        this.setState({ answers: ans });
        console.log("state" + this.state.answers);
    }

    render() {
        //console.log("props"+JSON.stringify(this.props.answers));
        return (
            <div>
                {this.state.answers.map((a) => (
                    <Answer key = {a.id} username = {a.user} answer = {a.answer} likes = {a.noOfLikes} />
                ))}   
            </div>
        );
    }
}

export default AnswerList;