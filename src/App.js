import React from 'react';
import './App.css';
import Navbar from './components/NavBar/Navbar.component';
import Title from './components/Title/Title';
import QuestionPage from './pages/QuestionPage';
import AnswerPage from './pages/AnswerPage';
import {Route, Switch, BrowserRouter, withRouter} from 'react-router-dom';
import NewQuestionPage from './pages/NewQuestionPage';
import SignUp from './components/Login/SignUp.component';
import HomePage from './pages/HomePage';
import { Container, Grid } from 'semantic-ui-react';
import NewAnswerPage from './pages/NewAnswerPage';
import MyQuestionsPage from './pages/MyQuestionsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LikedAnswersPage from './pages/LikedAnswersPage';
import AdminPage from './pages/AdminPage';
import ImageUpload from './components/images/ImageUpload';
import DropdownComponent from './components/DropdownComponent';
import TagsQuestionPage from './pages/TagsQuestionPage';
import MyProfile from './pages/MyProfile';
import InfoPage from './pages/InfoPage';
import SuggestedTagsPage from './pages/SuggestedTagsPage';
import Login1 from './components/Login/Login1';
import TagsDashboard from './components/TagsDashboard/TagsDashboard';
import NotificationsPage from './pages/NotificationPage';
import Dummy from './components/Dummy';
import SearchPage from './pages/SearchPage';
import EditProfilePage from './pages/EditProfilePage';
import ForgotPassword from './pages/ForgotPassword';
import ChangePasswordPage from './pages/ChangePasswordPage';
import firebase from './Firebase/firebase';
class App extends React.Component {
  state = {
    authenticated: false
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((authenticated) => {
      authenticated
        ? this.setState(() => ({
            authenticated: true,
          }), console.log(this.state))
        : this.setState(() => ({
            authenticated: false,
          }));
    });
    console.log("Auth"+this.state.authenticated)
  }
  render() {
    return (
      <div>
      <BrowserRouter>
          <Switch>
    {!this.state.authenticated &&
      <Switch>
              <Route exact path = "/signup" component = {SignUp} />
              <Route exact path = "/forgotPassword" component = {ForgotPassword} />
              <Route path = "/" component = {HomePage} /> 
              <Route path = "/adminLogin" component = {AdminPage} />
              <Route path = "/info" component = {InfoPage} />
              <Route path = "/dummy" component = {Dummy} />
      </Switch>
  }
            {
        this.state.authenticated && 
        <Switch>
           <Route exact path = "/changePassword" component = {ChangePasswordPage} />
              <Route path = "/adminLogin" component = {AdminPage} />
              <Route path = "/info" component = {InfoPage} />
              <Route path = "/myProfile/:id" component = {withRouter(MyProfile)} />
        <Route path = "/(.+)" render = {() => (
              <div className = "App">
                {/* <Title /> */}
                <Navbar />
                <Grid>
                  <Grid.Column width = {2}>
                  </Grid.Column>
                <Grid.Column width = {9}>
                <Container className = "main">
                  <Switch>
                    
                    <Route path = '/q' component={QuestionPage}/>
                    <Route path = '/newQuestion' component = {NewQuestionPage} />
                    <Route path = "/a/:id" component = {AnswerPage} />
                    
                    <Route path = "/newAnswer/:id" component = {NewAnswerPage} />
                    <Route path = "/myQuestions" component = {MyQuestionsPage} />
                    <Route path = "/leaderboard" component = {LeaderboardPage} />
                    <Route path = "/likedAnswers" component = {LikedAnswersPage} />
                    <Route path = "/img" component = {ImageUpload} />
                    <Route path = "/tags/:id" component = {withRouter(TagsQuestionPage)} />
                    <Route path = "/suggestedTags" component = {SuggestedTagsPage} />
                    <Route path = "/login1" component = {Login1} />
                    <Route path = "/notifications" component = {NotificationsPage} />
                    <Route path = "/search/:id" component = {withRouter(SearchPage)} />
                    <Route path = "/editProfile/:id" component = {EditProfilePage} />
                  </Switch>
                </Container>
                </Grid.Column>
                <Grid.Column width = {4}>
                    <TagsDashboard />
                </Grid.Column>
                </Grid>
              </div>
            )}/>
            </Switch>}
          </Switch>
      </BrowserRouter>
    </div>
    );
  }
  
}

export default App;