import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import './LeaderboardRow.scss';
import { Link } from 'react-router-dom';

const style = {fontSize: "20px", width: "800px", padding: "25px", borderBottom: "1px solid black"}

const LeaderBoardRow = ({rank, regd, username, score}) => {
    if(rank === "#1") {
        return (
            <div style = {style} className = "first" >
            <Grid>       
                <Grid.Column width = {4}>
                    {rank}
                </Grid.Column>
                <Grid.Column width = {4}>
                <Link to = {"/myProfile/"+regd}><div style = {{color: "white"}}>{regd}</div></Link>
                </Grid.Column>
                <Grid.Column width = {4}>
                    {username}
                </Grid.Column>
                <Grid.Column width = {4}>
                    <Icon name = "chess queen" color = "yellow"/>{score}
                </Grid.Column>
            </Grid>
        </div>
    )
    }
    else if(rank === "#2") {
        return (
            <div style = {style}>
            <Grid>
                <Grid.Column width = {4}>
                    {rank}
                </Grid.Column>
                <Grid.Column width = {4}>
                    <Link to = {"/myProfile/"+regd}><div style = {{color: "black"}}>{regd}</div></Link>
                </Grid.Column>
                <Grid.Column width = {4}>
                    {username}
                </Grid.Column>
                <Grid.Column width = {4}>
                    <Icon name = "chess queen" color = "grey"/>{score}
                </Grid.Column>
            </Grid>
        </div>
    )
    }
    else if(rank === "#3") {
            return (
                <div style = {style}>
                <Grid>
                    <Grid.Column width = {4}>
                        {rank}
                    </Grid.Column>
                    <Grid.Column width = {4}>
                        <Link to = {"/myProfile/"+regd}><div style = {{color: "black"}}>{regd}</div></Link>
                    </Grid.Column>
                    <Grid.Column width = {4}>
                        {username}
                    </Grid.Column>
                    <Grid.Column width = {4}>
                        <Icon name = "chess queen" color = "brown"/>{score}
                    </Grid.Column>
                </Grid>
            </div>
        )
        }
    return (
        <div style = {style}>
            <Grid>
                <Grid.Column width = {4}>
                    {rank}
                </Grid.Column>
                <Grid.Column width = {4}>
                    <Link to = {"/myProfile/"+regd}><div style = {{color: "black"}}>{regd}</div></Link>
                </Grid.Column>
                <Grid.Column width = {4}>
                    {username}
                </Grid.Column>
                <Grid.Column width = {4}>
                    <Icon name = "star"/>{score}
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default LeaderBoardRow;