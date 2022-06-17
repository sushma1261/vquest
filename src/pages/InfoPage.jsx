import React from 'react'
import { Segment, Grid } from 'semantic-ui-react'
import Title from '../components/Title/Title';
import Navbar from '../components/NavBar/Navbar.component';

const InfoPage = () => (
  <div className = "App">
    <Navbar /><br />
    <Grid>
      <Grid.Column width = {3}></Grid.Column>
        <Grid.Column width = {10} style = {{backgroundColor: "#b5e6e1"}}>
          <h1>About VQuest</h1>
          <h3 style = {{textAlign: 'left'}}> 
            <p>VQuest is about finding answers for your doubts in easiest manner</p>
            <p> You simply post the question and find the most relevant and expertised answers,
            You can choose between many options as well.</p>
            <p>The answers are sorted based on likes, so that the most relevant questions are given the highest priority</p>
            <p> Leaderboard provide the ability to find and appriciate the enthusiastic students and appriciate them.</p>
              <ul>The score for leaderboard follows the approach below :
              <li>If your answer is liked, 1Like = 10 points</li>
              <li>If you answer a question, 1answer = 100 points</li>
            <li>If your answer is liked by admin, 1 like = 50 points</li>
            </ul>
          </h3>
        </Grid.Column>
    </Grid>
  </div>
  )
  export default InfoPage;
