import React from 'react';
import SuggestedTags from '../components/SuggestedTags/SuggestedTags.component';
import { Header, Form, Button } from 'semantic-ui-react';
import firebase from '../Firebase/firebase';
class SuggestedTagsPage extends React.Component {

    componentDidMount() {
        //this.getSuggestedTagsData()
    }

    state = {
        x: [],
        flag: false
    }
    
    getSuggestedTagsData = async() => {
        var x = []
        var qry = firebase.database().ref("suggestedTags");
        await qry.once("value")
            .then(function (snapshot) {
                console.log(snapshot.val())
                snapshot.forEach(function(child){
                    //console.log(child.key)
                    x.push({"tag":child.val().name, "key": child.key, "question": child.val().question })
                })
            })
            this.setState({x})
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state);
      }

    handleCorrect = async(idx) => {
        console.log("Tick", idx);
        var arr = this.state.x;
        
        var name = this.state.x[idx].tag;
        var question = this.state.x[idx].question;
        var key = this.state.x[idx].key;
        arr.splice(idx,1);
        this.setState({x: arr});
        //var question = this.state.x[idx].key;
        console.log(name, question);
        await firebase.database().ref("tags").push(
            {
                "name": name,
                "questions": {0: question}
            }
            );
        await firebase.database().ref("suggestedTags").child(key).remove();
    }

    handleDelete = async(idx) => {
        var arr = this.state.x;
        var key = this.state.x[idx].key;
        arr.splice(idx,1);
        this.setState({x: arr});
        console.log("Wrong", idx);
        await firebase.database().ref("suggestedTags").child(key).remove();
        
    }

    addCustomTag = async() => {
        await firebase.database().ref("tags").push(
            {
                "name": this.state.tag,
            }
            );
        console.log(this.state.tag);
        this.setState({flag: false, tag: ""})
    }

    render() {
        return (
            <div>
                <Header as = "h2">Suggested Tags</Header>
                {this.state.x.map(({tag}, idx) => 
                    <SuggestedTags tag = {tag} key = {idx} accept = {() => {
                        this.handleCorrect(idx);
                        }
                    }
                    delete = {() => {
                        this.handleDelete(idx);

                    }}
                    />
                )}
                {!this.state.flag && <Button onClick = {() => {
                        this.setState({flag: true})
                    }}>
                    Add Custom Tag
                </Button>}
                {
                this.state.flag && 
                <Form><br />
                    <Form.Input fluid placeholder='Add Tag'
                        value={this.state.tag} onChange={this.handleChange.bind(this)}
                        type="text" name="tag" id="tag"
                        />
                        <span><Button onClick = {this.addCustomTag}>Submit</Button></span>
                </Form>
                }
            </div>
        )
    }
}

export default SuggestedTagsPage;