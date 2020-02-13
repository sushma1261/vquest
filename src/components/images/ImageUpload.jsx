import React, {Component} from 'react';
import firebase from '../../Firebase/firebase';
import { Input, Button } from 'semantic-ui-react';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
    }
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      console.log(e.target.files[0])
      console.log(e.target.files[0].name)
      this.setState(() => ({image}));
    }
  }
  handleUpload = async() => {
    var storageRef = firebase.storage().ref();
    var file = this.state.image;
    console.log(file.name)
    var imgRef = storageRef.child("regd");
    await imgRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!', snapshot);
    });
    firebase.storage().ref('regd').getDownloadURL().then(url => {
              console.log(url);
          })
    
  }


  render() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div style={style}>
        <img width = "100" height = "100" src = {this.state.image}/> 
      <br/>
        <Input type="file" onChange={this.handleChange} />
        <Button onClick={this.handleUpload}
          content="Choose File"
          labelPosition="left"
          icon="file"
        />
        <br/>
      </div>
    )
  }
}

export default ImageUpload;


//   const {image} = this.state;
    //   const uploadTask = storage.ref(`images/${image.name}`).put(image);
    //   uploadTask.on('state_changed', 
    //   (snapshot) => {
    //     // progrss function ....
    //     const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //     this.setState({progress});
    //   }, 
    //   (error) => {
    //        // error function ....
    //     console.log(error);
    //   }, 
    // () => {
    //     // complete function ....
    //     storage.ref('images').child(image.name).getDownloadURL().then(url => {
    //         console.log(url);
    //         this.setState({url});
    //     })
    // });"https://firebasestorage.googleapis.com/v0/b/vquest-it12b.appspot.com/o/regd?alt=media&token=5553ae8d-9d22-4d06-be39-357ba26b8bf7"