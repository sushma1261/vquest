import React from 'react';
import { Header } from 'semantic-ui-react';
import './Title.css';
// import '../../assests/Logo.png';
class Title extends React.Component {
    render() {
        return (
            <div style = {{backgroundColor: "#52b1cc", paddingTop: "10px", paddingBottom:"20px"}}>
                <Header as = "h1" className = 'title' style = {{fontFamily: "Georgia", fontSize: "60px"}}>VQuest</Header>
                {/* <img src = {require("../../assests/Logo (1).png")} width = "30%" height = "100px" /> */}
            </div>
        );
    }
}

export default Title;