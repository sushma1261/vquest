import React from 'react';
import {Dropdown, Menu, Image} from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
const SignedInMenu = ({signOut, username}) => {
    return (
        <Menu.Item position = "right">
            <Image avatar spaced = "right" />
            <Dropdown pointing = "top left" text = {username} style = {{color: 'white'}}>
                <Dropdown.Menu>
                    <Dropdown.Item text = "My Questions" icon = "question circle" />
                    <Dropdown.Item text = "Liked Answers" icon = "like" />
                    <Dropdown.Item as = {Link} text = "My Profile" to = "/myprofile" icon = "user" />
                    <Dropdown.Item as = {Link} to = '/settings' text = "Settings" icon = "settings" />
                    <Dropdown.Item text = "Sign Out" onClick = {signOut} icon = "power" />
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
        );
}

export default SignedInMenu;