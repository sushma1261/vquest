import React from 'react';
import { Header, Form, Button } from 'semantic-ui-react';
import firebase from '../../Firebase/firebase';

class NewQuestion extends React.Component {
    constructor(props) {
        super(props);
        //this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          question: '',
          tags: ''
        };
      }
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state);
      }

      addToFB = async() => {
        console.log("Push Data");
        console.log(this.state.question);
        var data = {question: this.state.question, tags: this.state.tags, noOfAns: 0, id: ""};
        var q = firebase.database().ref("questions");
        var k = q.push(data).key;
        var s = q.child(k).update({"id": k});
        console.log("key", k);
        this.setState({
            question: '',
            tags: ''
        });
    }

    render() {
        return (
            <div>
                <Header>Add Question form</Header>
                <Form>
                <Form.TextArea fluid placeholder='Write Your Question Here........'
                        value={this.state.question} onChange={this.handleChange}
                        type="text" name="question" className="form-control" id="InputEmail"
                        />
                <Form.Input fluid placeholder='Tags with comma separated'
                        value={this.state.tags} onChange={this.handleChange}
                        type="text" name="tags" className="form-control" id="InputEmail"
                        />
                <Button onClick = {this.addToFB.bind(this)} primary>Submit</Button>
                </Form>
            </div>
        );
    }
}
export default NewQuestion;