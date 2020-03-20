import React from 'react';
import '../App.css';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import firebase from '../Firebase/firebase';
import { Link, withRouter } from 'react-router-dom';
import Title from '../components/Title/Title';
import NavbarComponent from '../components/NavBar/Navbar.component';
class ChangePasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.cancel = this.cancel.bind(this);
        this.state = {
            email: "",
            
        }
    }

    cancel = () => {
        this.props.history.push('/q');
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state);
    }

    async componentDidMount() {
        console.log(localStorage.getItem("email"));
        this.setState({email: localStorage.getItem("email")});
    }

    forgotPassword = async() => {
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(this.state.email).then(function() {
            alert('Email Sent!! Check your email for further steps');
        }).catch(function(error) {
            console.log("Error",error.message)
        });
    }

    render() {
        return (
        
            <div className = "App">
                <Title />
                <NavbarComponent />
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450, backgroundColor: "white" }} >
                    <Header as='h2' color='teal' textAlign='center'>
                        Change Password?
                    </Header>
                    Verify Your Email Id
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Email'
                                value={this.state.email}
                                type="email" name="email" className="form-control" id="email"
                            />
                            <span><Button color='teal' positive size='small' onClick={this.forgotPassword}>
                               Send Email
                            </Button></span>
                            <Button color='teal' negative  size='small' as = "Link" onClick={this.cancel}>
                               Cancel
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
                
            </Grid>
            </div>
        )
    }
}

export default withRouter(ChangePasswordPage);