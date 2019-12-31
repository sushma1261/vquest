import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';



class Login1 extends React.Component {
    
    render() {
        return (
        <div>
    <Button onClick = {this.props.signIn}>Login</Button>
    {console.log(this.props.name)};
        </div>
        );
    }
}
export default Login1;