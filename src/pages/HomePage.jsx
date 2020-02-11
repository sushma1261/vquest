import React from 'react';
import '../App.css';
import Title from '../components/Title/Title';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import Login1 from '../components/Login/Login1';

class HomePage extends React.Component {

    componentDidMount() {
        localStorage.setItem("username", "");
        localStorage.setItem("role", "");
    }

    render() {
        return (
            
                <div className = "App" >
                    <Title />
                    <LoginPage />
                    {/* <Login1 /> */}
                </div>
                 
        )
    }
}

export default HomePage;
