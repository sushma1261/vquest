import React from 'react'
import { Image, Table, Grid, Segment, Icon, Input, Button } from 'semantic-ui-react'
import firebase from '../Firebase/firebase';
import Title from '../components/Title/Title';
import Navbar from '../components/NavBar/Navbar.component';
import './MyProfile.css'
import { Link } from 'react-router-dom';
class MyProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      userKey: "",
      regd: this.props.match.params.id,
      data: {
        email: "",
        score: 0,
        regd: this.props.match.params.id,
        username: ""
      }

    }
  }

  componentDidMount() {
    console.log(this.props);
    this.getData();
  }

  getData = async () => {
    var data = {};
    var ref = firebase.database().ref("users");
    var userKey = ""
    await ref.orderByChild("regd").equalTo(this.state.regd).once("value")
      .then(function (snapshot) {
        // console.log()
        snapshot.forEach(function (child) {
          data = child.val()
          userKey = child.key
        })
      })
    console.log(data)
    this.setState({ data, userKey });
  }

  render() {
    return (
      <div className="App">
        <Title />
        <Navbar />
        <div style={{ position: "absolute", paddingTop: "8%", paddingLeft: "28%" }}>
          <div style={{ width: "260px", float: "left", height: "310px", backgroundColor: "#b5e6e1" }}>
            <img src={this.state.data.picURL} style={{ height: "250px", width: "250px", paddingTop: "10px" }} />
            {/* {this.state.regd == localStorage.getItem("regd") && 
              <div>Choose profile picture:
                <Input type="file" onChange={this.handleImageChange} />
              </div>
            } */}
          </div>
          <div style={{ width: "450px", float: "left", backgroundColor: "#b5e6e1", height: "310px", textAlign: "center", paddingTop: "50px", paddingLeft: "-20px" }}>
            <Table basic='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign='center' >
                    <h3><Icon disabled name='users' size="large" />
                      Username: </h3>
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign='left'><h3>{this.state.data.username} </h3></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell textAlign='center'>
                    <h3><Icon disabled name='mail' size="large" />
                      Email: </h3>


                  </Table.Cell>
                  <Table.Cell textAlign='left'><h3>{this.state.data.email}</h3></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign='center'>
                    <h3><Icon disabled name='registered outline' size="large" />
                      Regd.No: </h3>


                  </Table.Cell>
                  <Table.Cell textAlign='left'><h3>{this.state.data.regd}</h3></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell textAlign='center'>
                    <h3><Icon disabled name='star' size="large" />
                      Score: </h3>
                  </Table.Cell>
                  <Table.Cell textAlign='left'><h3>{this.state.data.score}</h3></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            {/* {
              this.state.regd == localStorage.getItem("regd") && 
              <Button as = {Link} to = {{
                pathname: "/editProfile/"+this.state.regd,
                props: {
                    email: this.state.data.email,
                    regd: this.state.data.regd,
                    email: this.state.data.email,

                }
              }}>Edit profile</Button>
            } */}
          </div>
          
        </div>
        
      </div>
    );
  }
}

export default MyProfile;