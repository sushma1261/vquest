import React from 'react';
import { Grid, Header, Form, Segment, Button, Message } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../Firebase/firebase.js';
class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    login(e) {
        e.preventDefault();
        // console.log("hi");
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            this.validateUserAsAdmin();
            
        }).catch((error) => {
            // console.log(error);
            alert(error.message);
        });
    }

    validateUserAsAdmin = async() => {
        var email = this.state.email;
        var f = false;
        console.log("Check if admin");
        var ref = firebase.database().ref("admins");
        await ref.orderByChild("email").equalTo(email).once("value")
            .then(function (snapshot) {
                // console.log("snap::");
                snapshot.forEach(function (childSnapshot) {
                    if(childSnapshot.val()) {
                        var uname = childSnapshot.val().username;
                        localStorage.setItem("username", uname);
                        localStorage.setItem("role", "admin");
                        f = true;
                    }
                });
            });
            if(f) {
                this.props.history.push('/q');
            }
            else {
                alert("You are not an admin");
            }
            
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
                        <Link to="/">Login as user</Link>
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

export default withRouter(AdminLogin);