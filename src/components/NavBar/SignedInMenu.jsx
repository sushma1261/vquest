import React from 'react';
import {Dropdown, Menu, Image} from 'semantic-ui-react';
import Link from 'react-router-dom/Link';

const SignedInMenu = ({signOut, username, picUrl}) => {
    return (
        <Menu.Item position = "right">
            <Image avatar spaced = "right" src = {picUrl}  />
            <Dropdown pointing = "top left" text = {username} style = {{color: 'white'}}>
                <Dropdown.Menu>
                    <Dropdown.Item as = {Link} to = "/myQuestions" text = "My Questions" icon = "question circle" />
                    <Dropdown.Item as = {Link} to = "/notifications" text = "Notifications" icon = "bell" />
                    <Dropdown.Item as = {Link} text = "My Profile" to = 
                    {
                        {
                            pathname: "/myProfile/"+localStorage.getItem("regd"),
                            props: {
                                user: localStorage.getItem("regd")
                            }
                        }
                    } 
                    
                    icon = "user" />
                    {localStorage.getItem("role") === "admin" &&
                        <Dropdown.Item as={Link} to="/suggestedTags" text="Suggested Tags" icon = "settings" />
                    }
                    <Dropdown.Item as = {Link} text = "About Us" to = "/info" icon = "info circle" />
                    <Dropdown.Item text = "Sign Out" onClick = {signOut} icon = "power" />
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
        );
}

export default SignedInMenu;