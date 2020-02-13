import React from 'react';
import { Button, Form, Grid, Header, Message, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase/firebase';
import DropdownComponent from '../DropdownComponent';


  const role = [
    { label: "faculty", value: 1 },
    { label: "student", value: 2 },
  ]
  

class SignUp extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password1: '',
            password2: '',
            username: '',
            role: 'select role',
            selectedOption: []
            // style: {color: "red"}
        };
    }

    componentDidMount() {
        this.getTagsFormDB()
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state);
    }

    handleChange2 = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      };
      handleChange3 = (role) => {
        this.setState({ role });
        console.log(`Role: `, role);
      };
    signup(e) {
        if (this.state.password1 === this.state.password2) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password1).then((u) => {
                // console.log(this.props.history);
                this.props.history.push("/");

            }).catch((error) => {
                // console.log(error.message);
                alert(error.message);
            })
        }
        else
            alert("Passwords do not match");
    };

    getTagsFormDB = async() => {
        var tagsFromDB = []
        var ref = firebase.database().ref("tags").orderByChild("name");
        await ref.once("value")
        .then(function(snapshot){
            var c = 0;
            snapshot.forEach(function(child){
                tagsFromDB.push({"label":child.val().name, "value": c})
                c = c + 1
            })
            
        })
        // console.log(tagsFromDB)
        this.setState({tagsFromDB});
    }

    dataBase = async () => {
        console.log(this.state)
        this.signup(this);
        // //console.log("Hello");
        // var query1 = firebase.database().ref("users");
        // query1.push({ username: this.state.username,
        //      email: this.state.email, 
        //      password: this.state.password1,
        //       role: this.state.role,
        //       score: 500
        //     });

    }

    fun(e) {
       
        this.setState({role: e.target.name});
        //console.log(e.target.name)
    }

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450, backgroundColor: "white" }} >
                    <Header as='h2' color='teal' textAlign='center'>
                        Create new account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>

                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'
                                value={this.state.username} onChange={this.handleChange}
                                type="name" name="username" className="form-control" id="InputUsername" />


                            <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail'
                                value={this.state.email} onChange={this.handleChange}
                                type="email" name="email" className="form-control" id="InputEmail" />

                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={this.state.password1}
                                onChange={this.handleChange}
                                name="password1"
                                className="form-control"
                                id="InputPassword1"
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Confirm Password'
                                type='password'
                                value={this.state.password2}
                                onChange={this.handleChange}
                                name="password2"
                                className="form-control"
                                id="InputPassword2"
                            />
                            
                            <DropdownComponent options = {this.state.tagsFromDB} handleChange = {this.handleChange2.bind(this)} placeholder = "Select expertise tags" isMulti = {true}/><br />
                            <DropdownComponent options = {role} handleChange = {this.handleChange3.bind(this)} placeholder = "Select Role" isMulti = {false}/><br />
                            
                            <Button color='teal' fluid size='large'
                                onClick={this.dataBase.bind(this)}
                                className="btn btn-primary">
                                Sign Up
                        </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account ?  <Link to="/">Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default SignUp;
