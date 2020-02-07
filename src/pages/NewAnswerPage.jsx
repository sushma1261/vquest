import React from 'react';
import NewAnswer from '../components/NewAnswerForm/NewAnswer.component';

class NewAnswerPage extends React.Component {
    componentDidMount() {
        //console.log(this.props);
      }
    render() {
        return(
            <div>
                <h1>
                    <NewAnswer qid = {this.props.match.params.id}/>
                </h1>
            </div>
        )
    }
}

export default NewAnswerPage;