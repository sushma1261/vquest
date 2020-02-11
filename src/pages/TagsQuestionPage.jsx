import React from 'react';
import firebase from '../Firebase/firebase';
import TagsDashboard from '../components/TagsDashboard/TagsDashboard';
import { Grid } from 'semantic-ui-react';
import Question from '../components/Question/Question.component';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Notifications, {notify} from 'react-notify-toast';

const myColor = { background: '#0E1717', text: "#FFFFFF" };

class TagsQuestionPage extends React.Component {

    submit = (idx, dbIdx) => {
        console.log("submit");
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure you want to delete this question?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.removeQuestion(idx, dbIdx)
    
            },
            {
              label: 'No',
              onClick: () => console.log("No clicked")
            }
          ]
        });
      };
      removeQuestion = (idx, dbIdx) => {
        console.log("clicked");
        var arr = this.state.data;
        console.log(arr[idx])
        //var id = arr[idx].idx;
        arr.splice(idx,1);
        this.setState({x: arr});    
        this.removeFromDb(idx, dbIdx);
      }
  
      removeFromDb = async(id, dbIdx) => {
        console.log(id);
        // await firebase.database().ref("questions").child(id).remove();
        // await firebase.database().ref("answers").child(id).remove();
        console.log(id, dbIdx, this.state.key)
        await firebase.database().ref("tags").child(this.state.key).child("questions").child(dbIdx).remove();
        notify.show("Deleted Question", "custom", 5000, myColor);
  
      }    
    componentDidMount() {
         this.getQuestionIds();
        console.log(this.props.match.params.id)
    }

    

    state = {
        questionsId : [],
        data: []
    }

    fetchQuestion = async(qid, idx) => {
        console.log(idx)
        var data = this.state.data;
        var  query = firebase.database().ref("questions/"+qid);
        await query.once("value")
          .then(function(snapshot) {
              var d = {"idx": idx, data: snapshot.val()}
              console.log(d)
                 data.push(d)
          })
        this.setState({data})
          
    }

    getQuestionIds = async() => {
        var x = []
        var key = null
        var  query = firebase.database().ref("tags").orderByChild("name").equalTo(this.props.match.params.id);
        await query.once("value")
          .then(function(snapshot) {
           snapshot.forEach(
            function(childSnapshot) {
                 key = (childSnapshot.key)
                console.log(childSnapshot.val().questions)
                var d = childSnapshot.val().questions
                var filtered = d.filter(function (el) {
                    return el != null;
                  });
                console.log(filtered)
                d.forEach(function(e, idx){
                    console.log(e, idx, key)
                    x.push({"questionId": e, "idx": idx });
                })
            });
          });
          this.setState({"key": key})
        x.map((a) => {
            this.fetchQuestion(a.questionId, a.idx, a.key);
        })
        console.log("state",this.state.data)
        
    }


    render() {
        return (
            <Grid>
                <Notifications />
                    <Grid.Column width = {1}>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        Tags Question
                        {this.state.data.map((a,idx) => 
                            <Question question = {a.data.question} username = {a.data.user} tags = {a.data.tags} answers = {a.data.noOfAns} key = {idx} id = {a.data.id} fun1 = {() => {
                                console.log("Clicked");
                                console.log(idx, a.idx);
                                this.submit(idx, a.idx);
                              }
                            } />
                        )}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <TagsDashboard />
                    </Grid.Column>
                    <Grid.Column width = {1}>
                    </Grid.Column>
                </Grid>
            
        )
    }

}
export default TagsQuestionPage;