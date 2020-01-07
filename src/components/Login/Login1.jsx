import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Login1 extends React.Component {
    
    render() {
        console.log(this.props.users);
        return (
        <div>
    <Button onClick = {this.props.signIn}>Login</Button>
    {/* {console.log(this.props.name)} */}
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.project.users
    }
}

export default connect(mapStateToProps)(Login1);

