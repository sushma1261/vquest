import React from 'react';
import { Input, Form } from 'semantic-ui-react';

class SearchBar extends React.Component {
    render() {
        return (
            <Form>
                <Input icon = "search" size = "large" style={{width: "700px"}}/>
            </Form>
        );
    }
}

export default SearchBar;