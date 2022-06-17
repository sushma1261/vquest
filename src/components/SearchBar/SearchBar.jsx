import React from 'react';
import { Input, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class SearchBar extends React.Component {

    state = {
        searchQuery: ""
    }

    handleOnChange(e) {
        this.setState({searchQuery: e.target.value});
    }

    findCommonElements(arr1, arr2) { 
        return arr1.some(item => arr2.includes(item)) 
    } 

   

    render() {
        return (
            <Form>
                <span style = {{paddingRight: "10px"}}><Input icon = "search" size = "large" style={{width: "500px"}}
                 onChange = {this.handleOnChange.bind(this)}
                 value={this.state.searchQuery}
                 name = "searchQuery"
                 /></span>
                <span><Button as = {Link} to = {"/search/"+this.state.searchQuery} primary>Search</Button></span>
            </Form>
        );
    }
}

export default SearchBar;