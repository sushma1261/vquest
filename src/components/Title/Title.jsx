import React from 'react';
import { Header } from 'semantic-ui-react';
import './Title.css';
// import '../../assests/Logo.png';
class Title extends React.Component {
    render() {
        return (
            <div style = {{backgroundColor: "#52b1cc", paddingTop: "20px", paddingBottom: "20px"}}>
                <Header as = "h1" className = 'title' style = {{fontFamily: "Georgia", fontSize: "60px"}}>VQuest</Header>
                {/* <img src = {require("../../assests/Logo (1).png")} width = "80%" height = "200px" /> */}
            </div>
        );
    }
}

export default Title;