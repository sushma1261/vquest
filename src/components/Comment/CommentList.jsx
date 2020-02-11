import React from 'react';
import Comment from './Comment.component';

class CommentList extends React.Component {

    state = {
        comments: this.props.comments
    }

    render() {
        return(
            <div>
                {this.state.comments.map(({username, comment, id}) => (
                    <Comment key = {id} username = {username} comment = {comment} />
                ))}
            </div>
        )
    }
}
export default CommentList;