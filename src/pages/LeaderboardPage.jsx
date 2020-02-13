import React from 'react';
import { Header } from 'semantic-ui-react';
import LeaderBoardRow from '../components/Leaderboard/LeaderboardRow.component';
import firebase from '../Firebase/firebase';
// const leaderboard = [
//     {rank: "#1", username: "Sushma", score: "12000000", regd: "16B01A1261"},
//     {rank: "#2", username: "Naveena", score: "11900000", regd: "16B01A12A2"},
//     {rank: "#3", username: "Preethi", score: "11800000", regd: "16B01A1272"},
//     {rank: "#4", username: "Ramya", score: "11700000", regd: "16B01A1290"},
// ];



class LeaderboardPage extends React.Component {
    state = {
        scores: []
    }

    componentDidMount() {
        this.getScoresFromDB()
    }

    getScoresFromDB = async() => {
        var scores = []
        var qry  = firebase.database().ref("users").orderByChild("score");
        await qry.once("value")
        .then(function (snapshot) {
            console.log("snap::");
            console.log(snapshot.val());
            snapshot.forEach(child => {
                if(child.val().role === "student") {
                    var data = {
                        username: child.val().username,
                        score: child.val().score,
                        regd: child.val().regd
                    }
                    console.log(child.val().score)
                    scores.push(data)
                }
            });
        });
        console.log(scores)
        this.setState({scores})
    }

    render() {
        return (
            <div>
                <Header as = "h1" style = {{fontSize: "3.875rem", paddingTop: "20px"}} >
                    Leaderboard
                </Header>
                <br />
                <br />
                <div style = {{color: "black", position: "absolute", backgroundColor: "white" }}>
                    <div style = {{color: "white", backgroundColor: "black"}}>
                        <LeaderBoardRow rank = "Rank" username = "Username" score = "Score" regd = "Regd" />
                    </div>
                    {this.state.scores.reverse().map(({username, score, regd}, idx) => ( 
                        <LeaderBoardRow key = {idx} rank = {"#"+(idx+1)} username = {username} regd = {regd} score = {score}/>
                    ))}
                
                </div>
                
            </div>
        );
    }
}
export default LeaderboardPage;