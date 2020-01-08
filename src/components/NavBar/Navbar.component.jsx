import React from 'react';
import { Menu } from 'semantic-ui-react';
import SearchBar from '../SearchBar/SearchBar';
import "./Navbar.scss";
import { Link, withRouter, NavLink } from 'react-router-dom';
import firebase from '../../Firebase/firebase';
import SignedInMenu from './SignedInMenu';
import HomePage from '../../pages/HomePage';
class Navbar extends React.Component {
    state = {
        username: localStorage.getItem("username"),
        authenticated: false
    }
    handleSignOut = async() => {
        console.log("Sign out clicked");
        await firebase.auth().signOut().then(function() {
            //this.setState({authenticated : false});
            console.log("signout");
            localStorage.setItem("username", "");
        }).catch(function(error) {
            alert(error);
        });
        this.props.history.push('/'); 
    }

    componentDidMount() {
        if(this.state.username !== "") {
            this.setState({authenticated: true});
        }
    }

    render() {
        // console.log(localStorage.getItem("username"));
        if(this.state.username !== "") {
            //this.setState({authenticated: true});
            const style = { color: "white" };
        return (
            <Menu style={{ background: "#993366", height: "45px" }}>
                {/* <Container> */}
                    <Menu.Item />
                    <Menu.Item as={NavLink} to="/q" className="topic" name="Home" style={style} />
                    <Menu.Item as={SearchBar} />
                    <Menu.Menu position = "right">
                        <Menu.Item >
                            {this.state.authenticated &&
                            <SignedInMenu signOut = {this.handleSignOut} username = {this.state.username}/>
                            }
                        </Menu.Item>
                    </Menu.Menu>
                {/* </Container> */}
            </Menu>
        )
        }
        else {
            return(
                <HomePage />
            );
        }
    }
}


export default withRouter(Navbar);

// D73A49 5900b3