import React from 'react';
import { Menu } from 'semantic-ui-react';
import SearchBar from '../SearchBar/SearchBar';
import "./Navbar.scss";
import { withRouter, NavLink, Link } from 'react-router-dom';
import firebase from '../../Firebase/firebase';
import SignedInMenu from './SignedInMenu';
import HomePage from '../../pages/HomePage';
import Title from '../Title/Title';
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
        console.log("Navbar")
        this.getUserDetails()
        console.log(localStorage.getItem("username"))
        if(this.state.username !== "") {
            this.setState({authenticated: true});
        }
    }

    render() {
        // console.log(localStorage.getItem("username"));
       
            //this.setState({authenticated: true});
            const style = { color: "white", fontSize: "20px", textAlign: "center"  };
        return (
            <div className = "main">
            <div className = "header" style={{ background: "#52b1cc", height: "45px" }}>
                {/* <Container> */}
                <Link className='logo-container' to='/q'>
                    <div className = "logo">VQuest</div>
                </Link>
                    <Menu.Item />
                    <div className="options">
                    <div className = "option"><Menu.Item className = "item" as={NavLink} to="/leaderboard" name="Leaderboard" style = {style}  />
                    </div>
                    <div className = "option"><Menu.Item className = "item" as={NavLink} to="/newQuestion" name="Add Question" style = {style} />
                    </div>
                    </div>
                    <div className = "options">
                    <div className = "option"> <Menu.Item as={SearchBar} /></div>
                    {/* <div className = "option"><Menu.Item className = "item" as={NavLink} to="/newQuestion" name="Add" style = {style} />
                    </div> */}
                    {this.state.authenticated &&
                    <div className = "option" style = {{paddingRight: "50px"}}><SignedInMenu signOut = {this.handleSignOut} username = {this.state.username} picUrl = {this.state.picUrl}/></div>
                    }
                        
                    
                    </div>
                {/* </Container> */}
               
            </div>
             {/* <hr color = "#888888" style = {{height: "0.5px"}} /> */}
             </div>
        )
        
        
    }
}


export default withRouter(Navbar);

// D73A49 5900b3 993366
//  <Menu style={{ background: "#52b1cc", height: "45px" }}>
//                 // {/* <Container> */}
//                     <Menu.Item />
//                     <Menu.Item as={NavLink} to="/q" className="topic" name="Home" style={style} />
//                     <Menu.Item as={NavLink} to="/leaderboard" className="topic" name="Leaderboard" style={style} />
                    
//                     <Menu.Menu position = "right">
//                     <Menu.Item as={SearchBar} />
//                         <Menu.Item >
//                             {this.state.authenticated &&
//                             <SignedInMenu signOut = {this.handleSignOut} username = {this.state.username} picUrl = {this.state.picUrl}/>
//                             }
//                         </Menu.Item>
//                     </Menu.Menu>
//                 // {/* </Container> */}
//             // </Menu> 