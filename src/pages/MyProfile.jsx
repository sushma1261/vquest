import React from 'react'
import { Image, Table, Grid, Segment ,Icon} from 'semantic-ui-react'
import firebase from '../Firebase/firebase';
class MyProfile extends React.Component {

  state = {
    regd: this.props.match.params.id,
    data : {
      email: "",
      score: 0,
      regd: this.props.match.params.id,
      username: ""
    }
  }
  
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.getData();
  }

  getData = async() => {
    var data = {};
    var ref = firebase.database().ref("users");
    await ref.orderByChild("regd").equalTo(this.state.regd).once("value")
    .then(function(snapshot) {
      // console.log()
      snapshot.forEach(function(child){
        data = child.val()
      })
      
    })
    console.log(data)
    this.setState({data})
  }

  render() {
    return(
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
    );
  }
}

export default MyProfile