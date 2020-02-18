import React from 'react';
import { Menu } from 'semantic-ui-react';
import SearchBar from '../SearchBar/SearchBar';
import "./Navbar.scss";
import { withRouter, NavLink } from 'react-router-dom';
import firebase from '../../Firebase/firebase';
import SignedInMenu from './SignedInMenu';
import HomePage from '../../pages/HomePage';
class Navbar extends React.Component {
    state = {
        username: localStorage.getItem("username"),
        authenticated: false,
        picUrl: "",
    }
    handleSignOut = async() => {
        var f = false;
        console.log("Sign out clicked");
        await firebase.auth().signOut().then(function() {
            //this.setState({authenticated : false});
            console.log("signout");
            localStorage.setItem("username", "");
            f = true;
        }).catch(function(error) {
            alert(error);
        });
        if(f) {
            this.props.history.push('/');
        }   
    }

    getUserDetails = async() => {
        var picUrl = ""
        await firebase.database().ref("users").orderByChild("regd").equalTo(localStorage.getItem("regd")).once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(c){
                picUrl = c.val().picURL;
                console.log("url", picUrl);
            })
        })
        this.setState({picUrl});
    }

    componentDidMount() {
        // this.getUserDetails()
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
                    <Menu.Item as={NavLink} to="/leaderboard" className="topic" name="Leaderboard" style={style} />
                    
                    <Menu.Menu position = "right">
                    <Menu.Item as={SearchBar} />
                        <Menu.Item >
                            {this.state.authenticated &&
                            <SignedInMenu signOut = {this.handleSignOut} username = {this.state.username} picUrl = {this.state.picUrl}/>
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