import React from 'react';
import './App.css';
import Navbar from './components/NavBar/Navbar.component';
import Title from './components/Title/Title';
import QuestionPage from './pages/QuestionPage';
import AnswerPage from './pages/AnswerPage';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import NewQuestionPage from './pages/NewQuestionPage';
import SignUp from './components/Login/SignUp.component';
import Login1 from './components/Login/Login1';
import HomePage from './pages/HomePage';
import { Container } from 'semantic-ui-react';
import NewAnswerPage from './pages/NewAnswerPage';
import MyQuestionsPage from './pages/MyQuestionsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LikedAnswersPage from './pages/LikedAnswersPage';
import AdminPage from './pages/AdminPage';
import ImageUpload from './components/images/ImageUpload';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path = "/" component = {HomePage} />
          <Route exact path = "/signup" component = {SignUp} />
          <Route path = "/adminLogin" component = {AdminPage} />
          <Route path = "/(.+)" render = {() => (
            <div className = "App">
              <Title />
              <Navbar />
              <Container className = "main">
                <Switch>
                  <Route path = '/q' component={QuestionPage}/>
                  <Route path = '/newQuestion' component = {NewQuestionPage} />
                  <Route path = "/a/:id" component = {AnswerPage} />
                  <Route path = "/dummy" component = {Login1} />
                  <Route path = "/newAnswer/:id" component = {NewAnswerPage} />
                  <Route path = "/myQuestions" component = {MyQuestionsPage} />
                  <Route path = "/leaderboard" component = {LeaderboardPage} />
                  <Route path = "/likedAnswers" component = {LikedAnswersPage} />
                  <Route path = "/img" component = {ImageUpload} />
                  
                </Switch>
              </Container>
              
            </div>
          )}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;