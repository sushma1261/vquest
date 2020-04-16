import React from 'react';
import { Message } from 'semantic-ui-react';

const NoDataFound = ({message, content}) => {
    return (
        <div style = {{fontSize: "25px", paddingTop: "6.25rem"}}>
            <Message size='big' header = {message} content = {content} floated color = "teal"></Message>
        </div>
    );
};

export default NoDataFound; 