import React from 'react';
import {  Icon, Table } from 'semantic-ui-react';
// import image from '../assests/download.png';

class Dummy extends React.Component {
    render() {
        return (
            <div className = "App" style = {{position: "absolute", paddingTop: "8%", paddingLeft: "20%"}}>
            <div style={{ width: "300px", float: "left", height: "300px"}}>
                <img src = "https://firebasestorage.googleapis.com/v0/b/vquest-it12b.appspot.com/o/16B01A1261?alt=media&token=0f57071b-89fd-4c87-9326-45986dc59345" style={{ height: "300px" }} />
            </div>
            <div style={{ width: "450px", float: "left", backgroundColor: "#52b1cc", height: "300px", textAlign: "center", paddingTop: "50px", paddingLeft: "-20px" }}>
                {/* <Header as="h1" style = {{fontFamily: "Pacifico", fontSize: "50px"}} color="pink">VQuest</Header> */}
                <Table basic='very'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell textAlign='right' >      
                      <h3><Icon disabled name='users' size ="large"/>
                            Username:</h3>
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign='left'><h3>Sushma</h3></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell textAlign='right'>
                      <h3><Icon disabled name='mail' size ="large"/>
                            Email:</h3>
                            
                      
                      </Table.Cell>
          <Table.Cell textAlign='left'><h3>varma.sushma1998@gmail.com</h3></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell textAlign='right'>
                      <h3><Icon disabled name='registered outline' size ="large"/>
                      Regd. No.:</h3>   
                      </Table.Cell>
          <Table.Cell textAlign='left'><h3>16B01A1261</h3></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell textAlign='right'>
                      <h3><Icon disabled name='star' size ="large"/>
                          Score:</h3>
                      </Table.Cell>
          <Table.Cell textAlign='left'><h3>2000</h3></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>               

            </div>
        </div>
        );
    }
   
}

export default Dummy;

// state = {
//     showModal: false,
//     options: [
//        {"label": "Inappropriate Question", "value": 0},
//        {"label": "Question Already Exists", "value": 1},
//     ]
// }

// toggleModal() {
//     console.log(this.state.showModal)
//     this.setState({showModal : !this.state.showModal})
// }

// handleChange2 = (selectedOption) => {
//     this.setState({ selectedOption });
//     console.log(`Option selected:`, selectedOption);
//     // console.log(selectedOption[0])
//   };

//   deleteFromDB = () =>{
//     this.setState({showModal : !this.state.showModal})
//       console.log("Deleted")
//   }

// render() {
//     return(
//         <div>
//             <Button onClick = {this.toggleModal.bind(this)}>Show Modal</Button>
//             <Modal open = {this.state.showModal} closeIcon onClose={() => {this.setState({showModal : !this.state.showModal})}}>
//                 <Modal.Content image>
//                 <Modal.Description>
//                     <Header>Select why you want to delete the question?</Header><br />
//                     <DropdownComponent options = {this.state.options} handleChange = {this.handleChange2.bind(this)} isMulti={false} placeholder = "Select option"/><br />
//                     <div style = {{position: "absolute", right:"10px"}}><Button negative onClick = {this.deleteFromDB.bind(this)} style = {{textAlign: "right"}}>Delete</Button></div>
//                     <br /><br />
//                 </Modal.Description>
//                 </Modal.Content>
//             </Modal>
//         </div>
//     );
// }