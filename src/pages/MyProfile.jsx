import React from 'react'
import { Image, Table, Grid, Segment ,Icon, Input, Button} from 'semantic-ui-react'
import firebase from '../Firebase/firebase';
import Title from '../components/Title/Title';
import Navbar from '../components/NavBar/Navbar.component';
class MyProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      userKey: "",
      regd: this.props.match.params.id,
    data : {
      email: "",
      score: 0,
      regd: this.props.match.params.id,
      username: ""
    }
      
    }
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }
  
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.getData();
  }

  getData = async() => {
    var data = {};
    var ref = firebase.database().ref("users");
    var userKey = "" 
    await ref.orderByChild("regd").equalTo(this.state.regd).once("value")
    .then(function(snapshot) {
      // console.log()
      snapshot.forEach(function(child){
        data = child.val()
        userKey = child.key
      })
      
    })
    console.log(data)
    this.setState({data, userKey})
  }

  handleChange = e => {
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
    console.log(file.name)
    var imgRef = storageRef.child(this.state.regd);
    await imgRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!', snapshot);
    });
    var link = ""
    await firebase.storage().ref(this.state.regd).getDownloadURL().then(url => {
              console.log(url);
              link = url;
          })
    
    await firebase.database().ref("users").child(this.state.userKey).update({picURL: link})
    
  }

  render() {
    return(
      <div className = "App">
        <Title />
        <Navbar />
        <Input type="file" onChange={this.handleChange} />
                <Button onClick={this.handleUpload}
                  content="Upload"
                  labelPosition="left"
                  icon="file"
                />
        <Grid>
      <Grid.Column width = {3}></Grid.Column>
      <Grid.Column width = {10}>
        <Segment style={{backgroundColor: "#b5e6e1"}}>
        <Grid width = {5}>
            <Grid.Row  floated = "left" > 
              
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkDzS2j8tsVVAraS8BbBZnUcLuTZmNr2xOSeXLU43AbjXsZ02q" size='small' circular centered/>
            </Grid.Row>
            <Grid.Row> 
                <Table basic='very'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell textAlign='center' >      
                      <h3><Icon disabled name='users' size ="large"/>
                            Username: </h3>
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign='left'><h3>{this.state.data.username} </h3></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell textAlign='center'>
                      <h3><Icon disabled name='mail' size ="large"/>
                            Email: </h3>
                            
                      
                      </Table.Cell>
          <Table.Cell textAlign='left'><h3>{this.state.data.email}</h3></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell textAlign='center'>
                      <h3><Icon disabled name='registered outline' size ="large"/>
                      Regd.No: </h3>
                            
                      
                      </Table.Cell>
          <Table.Cell textAlign='left'><h3>{this.state.data.regd}</h3></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell textAlign='center'>
                      <h3><Icon disabled name='star' size ="large"/>
                          Score: </h3>
                      </Table.Cell>
          <Table.Cell textAlign='left'><h3>{this.state.data.score}</h3></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
      </Grid.Row>
      </Grid>
      </Segment>
      </Grid.Column>
      </Grid>
</div>
    );
  }
}

export default MyProfile