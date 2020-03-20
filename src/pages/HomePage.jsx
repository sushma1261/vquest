import React from 'react';
import '../App.css';
import Title from '../components/Title/Title';
import LoginPage from './LoginPage';

class HomePage extends React.Component {

    // componentDidMount() {
    //     localStorage.setItem("username", "");
    //     localStorage.setItem("role", "");
    // }

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
