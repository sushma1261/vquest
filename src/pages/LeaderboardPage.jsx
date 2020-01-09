import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import LeaderBoardRow from '../components/Leaderboard/LeaderboardRow.component';

const leaderboard = [
    {rank: "#1", username: "Sushma", score: "12000000", regd: "16B01A1261"},
    {rank: "#2", username: "Naveena", score: "11900000", regd: "16B01A12A2"},
    {rank: "#3", username: "Preethi", score: "11800000", regd: "16B01A1272"},
    {rank: "#4", username: "Ramya", score: "11700000", regd: "16B01A1290"},
];
class LeaderboardPage extends React.Component {

    

    render() {
        return (
            <div>
                <Header as = "h1" style = {{fontSize: "3.875rem", paddingTop: "20px"}} >
                    Leaderboard
                </Header>
                <br />
                <br />
                <div style = {{color: "black", position: "absolute", backgroundColor: "white" }}>
                    <div style = {{color: "white", backgroundColor: "grey"}}>
                        <LeaderBoardRow rank = "Rank" username = "Username" score = "Score" regd = "Regd" />
                    </div>
                    
                    {leaderboard.map(({rank, username, score, regd}) => ( 
                        <LeaderBoardRow rank = {rank} username = {username} score = {score} regd = {regd}/>
                    ))}
                
                </div>
                
            </div>
        );
    }
}
export default LeaderboardPage;