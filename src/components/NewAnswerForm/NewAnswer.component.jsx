import React from 'react';
import { Header, Form, Button } from 'semantic-ui-react';
import firebase from '../../Firebase/firebase';

class NewAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          answer: '',
          username: localStorage.getItem("username")
        };

      }
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.answer);
      }

      
    render() {
        return (
            <div>
                <Header>Add a new answer</Header>
                <Form>
                <Form.TextArea fluid placeholder='Write Your Answer Here........'
                        value={this.state.answer} onChange={this.handleChange}
                        type="text" name="answer" className="form-control" id="InputAnswer"
                        style={{ minHeight: 250, fontSize: 18 }}
                        />
                <Button primary>Submit</Button>
                </Form>
            </div>
        );
    }
}
export default NewAnswer;