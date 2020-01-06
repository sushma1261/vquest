import React from 'react';
import './App.css';
import Navbar from './components/NavBar/Navbar.component';
import Title from './components/Title/Title';
import QuestionPage from './pages/QuestionPage';
import AnswerPage from './pages/AnswerPage';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import NewQuestionPage from './pages/NewQuestionPage';
import LoginPage from './pages/LoginPage';
import SignUp from './components/Login/SignUp.component';
import Login1 from './components/Login/Login1';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Title />
        <Navbar /><br />
        <br />
        <br />

        {/* <QuestionPage />  */}
        <Switch>
          <Route exact path = '/'  component={QuestionPage}/>
          {/* <Route path = '/a'  component={AnswerPage}/> */}
          <Route path = '/newQuestion' component = {NewQuestionPage}/>
          <Route path = '/login' component = {LoginPage} />
          <Route path = "/signup" component = {SignUp} />
          <Route path = "/a/:id" component = {AnswerPage} />
          <Route path = "/dummy" component = {Login1} />
        </Switch>
        {/* <Route exact path = '/'  component={Title}/> */}
        {/* <AnswerPage /> */}

      </div>
    </BrowserRouter>
  );
}

export default App;
