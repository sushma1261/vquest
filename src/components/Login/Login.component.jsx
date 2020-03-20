import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import firebase from '../../Firebase/firebase';
import { withRouter, Redirect } from 'react-router';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
        };
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state);
    }

    login = async (e) => {
         await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            // console.log(this.props.history);
            this.dataBase();
        }).catch((error) => {
            // console.log(error);
            alert(error.message);
        });
    }

    

    dataBase = async () => {
        // console.log("HiiiHello");
        var email = this.state.email;
        // console.log("***&&&***");
        var ref = firebase.database().ref("users");
        await ref.orderByChild("email").equalTo(email).once("value")
            .then(function (snapshot) {
                // console.log("snap::");
                snapshot.forEach(function (childSnapshot) {
                    var uname = childSnapshot.val().username;
                    // console.log(uname);
                    var role = childSnapshot.val().role;
                    // console.log(role);
                    localStorage.setItem("username", uname);
                    localStorage.setItem("role", role);
                    if(childSnapshot.val().regd) {
                        localStorage.setItem("regd", childSnapshot.val().regd);
                    }
                    else {
                        localStorage.setItem("regd", uname);
                    }
                });
            });
        console.log(localStorage.getItem("username"))
        this.props.history.push('/q');
    }

    

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450, backgroundColor: "white" }} >
                    <Header as='h2' color='teal' textAlign='center'>
                        Login to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail'
                                value={this.state.email} onChange={this.handleChange}
                                type="email" name="email" class="form-control" id="InputEmail"
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                name="password"
                                class="form-control"
                                id="InputPassword"
                            />
                            <Button color='teal' fluid size='large' onClick={this.login}>
                                Login
                        </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to="/signup"> Sign Up</Link>
                    </Message>
                </Grid.Column>
                
            </Grid>
            
        );
    }
}

export default withRouter(Login);
