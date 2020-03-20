import React from 'react';
import Login from '../components/Login/Login.component';
import firebase from '../Firebase/firebase'
import { Redirect } from 'react-router-dom';
class LoginPage extends React.Component {
    state = {
        authenticated: false
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((authenticated) => {
            authenticated
              ? this.setState(() => ({
                  authenticated: true,
                }), console.log(this.state))
              : this.setState(() => ({
                  authenticated: false,
                }));
          });
    }
    render() {
        return(
            <div>
                {
                    this.state.authenticated && <Redirect to = "/q" />
                }
                <Login />
            </div>
        )
    }
    
}
export default LoginPage;