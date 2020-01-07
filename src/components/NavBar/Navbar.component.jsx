import React from 'react';
import { Menu } from 'semantic-ui-react';
import SearchBar from '../SearchBar/SearchBar';
import "./Navbar.scss";
import { Link, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedInMenu from './SignedInMenu';
class Navbar extends React.Component {
    state = {
        username: localStorage.getItem("username")
    }
    handleSignOut = () => {
        this.setState({authenticated : false});
        this.props.history.push('/')
    }

    render() {
        console.log(localStorage.getItem("username"));
        const style = { color: "white" };
        return (
            <Menu style={{ background: "#993366", height: "45px" }}>
                {/* <Container> */}
                    <Menu.Item />
                    <Menu.Item as={NavLink} to="/q" className="topic" name="Home" style={style} />
                    <Menu.Item as={SearchBar} />
                    <Menu.Menu position = "right">
                        <Menu.Item >
                            <SignedInMenu signOut = {this.handleSignOut} username = {this.state.username}/>
                        </Menu.Item>
                    </Menu.Menu>
                {/* </Container> */}
            </Menu>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {

    }
}

export default connect(mapStateToProps)(withRouter(Navbar));

// D73A49 5900b3