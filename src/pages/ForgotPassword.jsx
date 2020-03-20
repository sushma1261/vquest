import React from 'react';
import '../App.css';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import firebase from '../Firebase/firebase';
import { Link } from 'react-router-dom';
class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: ""
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state);
    }

    forgotPassword = async() => {
        var auth = firebase.auth();
        var emailAddress = this.state.email;
        auth.sendPasswordResetEmail(emailAddress).then(function() {
            alert("Email Sent");
          }).catch(function(error) {
              alert(error.message);
            console.log("Error",error.message);
          });
    }

    render() {
        return (
            <div className = "App">
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450, backgroundColor: "white" }} >
                    <Header as='h2' color='teal' textAlign='center'>
                        Forgot Password?
                    </Header>
                    Please enter your email address below to reset your password.
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail'
                                value={this.state.email} onChange={this.handleChange}
                                type="email" name="email" class="form-control" id="InputEmail"
                            />
                            <Button color='teal' fluid size='large' onClick={this.forgotPassword}>
                                Send Email for further steps
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to="/signup"> Sign Up</Link><br />
                        Already have an account ?  <Link to="/">Login</Link>
                    </Message>
                </Grid.Column>
                
            </Grid>
            </div>
        )
    }
}

export default ForgotPassword;