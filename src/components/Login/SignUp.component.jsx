import React from 'react';
import '../../App.css'
import { Button, Form, Grid, Header, Message, Segment, Input, Label } from 'semantic-ui-react';
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
            regd: '',
            role: 'select role',
            selectedOption: []
        };
    }

    componentDidMount() {
        this.getTagsFormDB()
    }

    handleImageChange = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          console.log(e.target.files[0])
          console.log(e.target.files[0].name)
          this.setState(() => ({image}));
        }
      }
      handleUpload = async() => {
        var storageRef = firebase.storage().ref();
        var file = this.state.image;
        console.log(this.state)
        console.log(this.state.regd)
        var imgRef = storageRef.child(this.state.regd);
        await imgRef.put(file).then(function(snapshot) {
            console.log('Uploaded a blob or file!', snapshot);
        });
        var link = ""
        await firebase.storage().ref(this.state.regd).getDownloadURL().then(url => {
                  console.log(url);
                  link = url;
              })
        await firebase.database().ref("users").child(this.state.regd).update({picURL: link})
        
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
                this.props.history.push("/");

            }).catch((error) => {
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
        // console.log(this.state.file);
        if(this.state.file) {
        this.handleUpload();
        }
        this.signup(this);
        
            var regd = this.state.regd.toUpperCase();
            console.log(regd);
            if(this.state.role["label"] === "faculty") {
                regd = this.state.username;
            }
            var data = {"regd": regd, "username": this.state.username, "email": this.state.email, "role": this.state.role["label"], "password": this.state.password1, "score": 500}
            await firebase.database().ref("users").child(this.state.regd).set(data);
    }

    fun(e) {
       
        this.setState({role: e.target.name});
        //console.log(e.target.name)
    }

    render() {
        return (
            <div className = "App">
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450, backgroundColor: "white" }} >
                    <Header as='h2' color='teal' textAlign='center'>
                        Create new account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>

                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'
                                value={this.state.username} onChange={this.handleChange}
                                type="name" name="username" className="form-control" id="InputUsername"
                            />

                            { this.state.role["label"] === "faculty"
                            &&
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Registration Number'
                                value={this.state.regd} onChange={this.handleChange}
                                required
                                disabled = {true}
                                type="name" name="regd" className="form-control" id="regd" />}
                            { this.state.role["label"] !== "faculty"
                            &&
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Registration Number'
                                value={this.state.regd} onChange={this.handleChange}
                                required
                                disabled = {false}
                                type="name" name="regd" className="form-control" id="regd" />}
                            <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail'
                                value={this.state.email} onChange={this.handleChange}
                                required
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
                                required
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
                                required
                            />
                            
                            <DropdownComponent options = {this.state.tagsFromDB} handleChange = {this.handleChange2.bind(this)} placeholder = "Select expertise tags" isMulti = {true}/><br />
                            <DropdownComponent options = {role} handleChange = {this.handleChange3.bind(this)} placeholder = "Select Role" isMulti = {false}/><br />
                            Choose profile picture:<Input type="file" onChange={this.handleImageChange} />
                            <br /><br />
                            <Button type = "submit" color='teal' fluid size='large'
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
            </div>
        );
    }
}

export default SignUp;
