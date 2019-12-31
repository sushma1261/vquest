import React from 'react';
import {Menu, Container} from 'semantic-ui-react';
import SearchBar from '../SearchBar/SearchBar';
import "./Navbar.scss";
import firebase from '../../Firebase/firebase';

import { Link, withRouter } from 'react-router-dom';
import Login1 from '../Login/Login1';

class Navbar extends React.Component {
    
    state = {authenticated: false};

    componentWillMount() {
        localStorage.setItem("email", "");
    }

    render() {
        const style = {color : "white"};
        //console.log("username" + localStorage.getItem("username"));
        return (
            <Menu style = {{background : "#D73A49", height: "45px"}}>
                <Container>
                    <Menu.Item as = {Link} to = "/" className = "topic" name = "Home" style = {style}/>
                    <Menu.Item as = {Link} to = "/a" className = "topic" name = "Answer" style = {style} />
                    <Menu.Item as = {SearchBar}/>
                    <Menu.Item as = {Link} to = "/login" className = "topic" name = "Login" style = {style}/>
                    {/* <Login /> */}
                    {/* <Login1 signIn = {this.handleSignIn} name = "sushma"/> */}
                    {localStorage.getItem("email")}
                </Container>
            </Menu>
        )
    }
}

export default withRouter(Navbar);
