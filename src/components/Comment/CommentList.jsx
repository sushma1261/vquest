import React from 'react';
import Comment from './Comment.component';
import firebase from '../../Firebase/firebase';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Notifications, {notify} from 'react-notify-toast';

const myColor = { background: '#0E1717', text: "#FFFFFF" };
class CommentList extends React.Component {

  componentDidMount() {
    console.log("Comment list******************************")
  }
    state = {
        comments: this.props.comments
    }

    submit = (idx) => {
        console.log("submit");
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure you want to delete this question?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.removeComment(idx)
    
            },
            {
              label: 'No',
              onClick: () => console.log("No clicked")
            }
          ]
        });
      };

      removeComment = async(idx) => {
            console.log(idx)
            var arr = this.state.comments
            var id = arr[idx].id
            // console.log(id, this.props.answerId)
            await firebase.database().ref("comments").child(this.props.answerId).child(id).remove()
            arr.splice(idx,1)
            this.setState({comments: arr})
      }

    render() {
        return(
            <div>
                <Notifications />
                {this.state.comments.map(({username, comment, id}, idx) => (
                    <Comment key = {id} username = {username} comment = {comment}
                    fun1 = {() => {
                        console.log("Clicked");
                        console.log(idx);
                        this.submit(idx);
                      }
                    }
                    />
                ))}
            </div>
        )
    }
}
export default CommentList;