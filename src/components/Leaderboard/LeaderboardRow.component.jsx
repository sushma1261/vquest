import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

const style = {fontSize: "20px", width: "800px", padding: "25px", borderBottom: "1px solid black"}

const LeaderBoardRow = ({rank, regd, username, score}) => {
    if(rank === "#1") {
        return (
            <div style = {style} >
            <Grid>
                
                <Grid.Column width = {4}>
                    {rank}
                </Grid.Column>
                <Grid.Column width = {4}>
                    {regd}
                </Grid.Column>
                <Grid.Column width = {4}>
                    {username}
                </Grid.Column>
                <Grid.Column width = {4}>
                    <Icon name = "certificate" color = "yellow"/>{score}
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
                    {regd}
                </Grid.Column>
                <Grid.Column width = {4}>
                    {username}
                </Grid.Column>
                <Grid.Column width = {4}>
                    <Icon name = "certificate" color = "brown"/>{score}
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
                        {regd}
                    </Grid.Column>
                    <Grid.Column width = {4}>
                        {username}
                    </Grid.Column>
                    <Grid.Column width = {4}>
                        <Icon name = "certificate" color = "grey"/>{score}
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
                    {regd}
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