import React from 'react';
import '../App.css';
import Title from '../components/Title/Title';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';

class HomePage extends React.Component {
    render() {
        return (
            <div className = "App">
                <Title />
                <LoginPage />
            </div>
        )
    }
}

export default HomePage;
