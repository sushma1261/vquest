import React from 'react';
import { Header } from 'semantic-ui-react';
import './Title.css';
class Title extends React.Component {
    render() {
        return (
            <div style = {{backgroundColor: "#52b1cc", paddingTop: "20px", paddingBottom: "20px"}}>
                <Header as = "h1" className = 'title' style = {{fontFamily: "Georgia", fontSize: "60px"}}>VQuest</Header>
            </div>
        );
    }
}

export default Title;