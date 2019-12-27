import React from 'react';
import './App.css';
import Navbar from './components/NavBar/Navbar.component';
import Title from './components/Title/Title';
import QuestionPage from './pages/QuestionPage';
import AnswerPage from './pages/AnswerPage';
import {Route, Switch} from 'react-router-dom';
import NewQuestionPage from './pages/NewQuestionPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Title />
      <Navbar /><br />
      <br />
      <br />

      {/* <QuestionPage />  */}
      <Switch>
        <Route exact path = '/'  component={QuestionPage}/>
        <Route path = '/a'  component={AnswerPage}/>
        <Route path = '/newQuestion' component = {NewQuestionPage}/>
        <Route path = '/login' component = {LoginPage} />
            </Switch>
      {/* <Route exact path = '/'  component={Title}/> */}
      {/* <AnswerPage /> */}

    </div>
  );
}

export default App;
