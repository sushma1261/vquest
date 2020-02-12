import React from 'react';
import Select from 'react-select';

class  DropdownComponent extends React.Component {

  componentDidMount() {
    console.log(this.props)
  }
  state = {selectedOption : []}

  render() {
    return (
      <div className="app">
    {/* <div className="container"> */}
      <Select options={this.props.options} isMulti = {this.props.isMulti} onChange = {this.props.handleChange} placeholder = {this.props.placeholder}/>
      
    {/* </div> */}
  </div>
    )
  }
}
  

export default DropdownComponent;