import React from 'react';
import {Menu, Container} from 'semantic-ui-react';
import SearchBar from '../SearchBar/SearchBar';
import "./Navbar.scss";

class Navbar extends React.Component {
    
    render() {
        const style = {color : "white"};
        return (
            <Menu style = {{background : "#D73A49", height: "45px"}}>
                <Container>
                    <Menu.Item className = "topic" name = "Home" style = {style}/>
                    <Menu.Item className = "topic" name = "Categories" style = {style} />
                    <Menu.Item as = {SearchBar}/>
                    <Menu.Item className = "topic" name = "Login" style = {style} />
                </Container>
            </Menu>
        )
    }
}

export default Navbar;
