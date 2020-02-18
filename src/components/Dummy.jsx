import React from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';
import DropdownComponent from './DropdownComponent';

class Dummy extends React.Component {
    state = {
        showModal: false,
        options: [
           {"label": "Inappropriate Question", "value": 0},
           {"label": "Question Already Exists", "value": 1},
        ]
    }

    toggleModal() {
        console.log(this.state.showModal)
        this.setState({showModal : !this.state.showModal})
    }

    handleChange2 = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        // console.log(selectedOption[0])
      };

      deleteFromDB = () =>{
        this.setState({showModal : !this.state.showModal})
          console.log("Deleted")
      }

    render() {
        return(
            <div>
                <Button onClick = {this.toggleModal.bind(this)}>Show Modal</Button>
                <Modal open = {this.state.showModal} closeIcon onClose={() => {this.setState({showModal : !this.state.showModal})}}>
                    <Modal.Content image>
                    <Modal.Description>
                        <Header>Select why you want to delete the question?</Header><br />
                        <DropdownComponent options = {this.state.options} handleChange = {this.handleChange2.bind(this)} isMulti={false} placeholder = "Select option"/><br />
                        <div style = {{position: "absolute", right:"10px"}}><Button negative onClick = {this.deleteFromDB.bind(this)} style = {{textAlign: "right"}}>Delete</Button></div>
                        <br /><br />
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default Dummy;