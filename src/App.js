import React from 'react';
import './App.css';
import Navbar from './components/NavBar/Navbar.component';
import Title from './components/Title/Title';
import QuestionPage from './pages/QuestionPage';
import AnswerPage from './pages/AnswerPage';
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Title />
      <Navbar /><br />
      <br />
      <br />
      <QuestionPage /> 
      <Switch>
        <Route path = '/a'  component={AnswerPage}/>
      </Switch>
      {/* <Route exact path = '/'  component={Title}/> */}
      {/* <AnswerPage /> */}

    </div>
  );
}

export default App;
