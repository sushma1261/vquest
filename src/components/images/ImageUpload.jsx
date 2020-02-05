import React, {Component} from 'react';
import firebase from '../../Firebase/firebase';

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
      this.setState(() => ({image}));
    }
  }
  handleUpload = () => {
    var storageRef = firebase.storage().ref();
    
    var file = this.state.image;
    var imgRef = storageRef.child(file.name);
    imgRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!', snapshot);
    });
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
      <progress value={this.state.progress} max="100"/>
      <br/>
        <input type="file" onChange={this.handleChange}/>
        <button onClick={this.handleUpload}>Upload</button>
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
    // });