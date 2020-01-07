import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import SearchBar from '../SearchBar/SearchBar';
import "./Navbar.scss";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class Navbar extends React.Component {

    state = { authenticated: false };



    render() {
        const style = { color: "white" };
        return (
            <Menu style={{ background: "#993366", height: "45px" }}>
                <Container>
                    <Menu.Item as={Link} to="/" className="topic" name="Home" style={style} />
                    <Menu.Item as={Link} to="/a" className="topic" name="Answer" style={style} />
                    <Menu.Item as={SearchBar} />
                    {this.state.authenticated && <Menu.Item as={Link} to="/login" className="topic" name="Login" style={style} />}
                    {localStorage.getItem("email")}
                </Container>
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