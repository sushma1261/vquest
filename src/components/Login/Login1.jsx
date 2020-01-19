import React from 'react';
import { Button, Image, Grid, Form, Segment, Message, Table, Header, Label } from 'semantic-ui-react';
import image from '../../assests/questions.jpg';
import './Login.scss';
import { Link } from 'react-router-dom';
class Login1 extends React.Component {
    
    render() {
        console.log("Props");
        console.log(this.props.location.props);
        return (
            <div style = {{position: "absolute", paddingTop: "8%", paddingLeft: "20%"}}>
                <div style={{ width: "450px", float: "left", height: "500px"}}>
                    <Image src={image} style={{ height: "500px" }} />
                </div>
                <div style={{ width: "450px", float: "left", backgroundColor: "white", height: "500px", textAlign: "center", paddingTop: "30px" }}>
                    <Header as="h1" style = {{fontFamily: "Pacifico", fontSize: "50px"}} color="pink">VQuest</Header>
                    <Header as="h3" color="violet">Welcome to VQuest</Header>
                    <br />
                    <Form size='large' style = {{paddingLeft: "10%", paddingRight: "10%"}}>
                        <Form.Input icon='user' iconPosition='left' placeholder='E-mail'
                            type="email" name="email" class="form-control" id="InputEmail"
                            // width={10}
                        />

                        <Form.Input
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            class="form-control"
                            id="InputPassword"
                        />
                        <Button
                         color='teal' fluid size='huge'
                         >
                            Login
                        </Button>

                    </Form>
                    <br />
                    New VQuester?<Link to="/signup">Register here</Link>

                </div>
            </div>
        );
    }
}


export default Login1;

