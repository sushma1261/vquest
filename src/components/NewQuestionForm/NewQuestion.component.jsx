import React from 'react';
import { Header, Form, Button } from 'semantic-ui-react';
import firebase from '../../Firebase/firebase';
import { withRouter } from 'react-router-dom';
import DropdownComponent from '../DropdownComponent';

const tags = [
    { label: "C", value: 1 },
    { label: "C++", value: 2 },
    { label: "DS", value: 3 },
    { label: "Java", value: 4 },
    { label: "Python", value: 5 },
    { label: "React", value: 6 },
    { label: "Web", value: 7 }
  ];
  

class NewQuestion extends React.Component {
    constructor(props) {
        super(props);
        //this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          question: '',
          tags: '',
          k: "",
          username: localStorage.getItem("username"),
          selectedOption: []
        };
      }

      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
      }

      handleChange2 = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        // console.log(selectedOption[0])
      };
      addToFB = async() => {
          console.log("Clicked", this.state.selectedOption)
          const {selectedOption} = this.state;
        //   console.log(this.state.selectedOption)
        var x = []
        selectedOption.forEach(e => {
            // this.addQuestionToTags();
            x.push(e["label"]);
        });
        //   console.log(x);
        if(this.state.question !== "") {
            var data = {question: this.state.question, tags: x, noOfAns: 0, id: "", user: this.state.username};
            var q = firebase.database().ref("questions");
            var k = q.push(data).key;
            await q.child(k).update({"id": k, "postedOn": firebase.database.ServerValue.TIMESTAMP});
            this.setState({
                question: '',
                tags: '',
                k : k
            });
            console.log(k)
            x.forEach(async function (tag) {
                console.log("k,ele",k,tag)
                var key = ""
                var qry = firebase.database().ref("tags").orderByChild("name").equalTo(tag);
                await qry.once("value")
                .then(function(s) {
                    s.forEach(function(c){
                        key = c.key
                    })
                })
                var questions = [k]
                var qry = firebase.database().ref("tags").child(key).child("questions");
                await qry.once("value")
                .then(function (snapshot) {
                    console.log("Question", (snapshot.val()));
                    snapshot.forEach(function(c){
                        questions.push(c.val())
                    });
                });
                console.log(questions);
                await firebase.database().ref("tags").child(key).update({questions}); 
                // this.setState({questions});
                })
            this.props.history.push("/q");
        }
        else {
            alert("Incomplete data");
        }
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
                <DropdownComponent options = {tags} handleChange = {this.handleChange2.bind(this)}/>
                <Button onClick = {this.addToFB.bind(this)} primary>Submit</Button>
                </Form>
            </div>
        );
    }
}
export default withRouter(NewQuestion);