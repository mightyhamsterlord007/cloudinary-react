import React, { Component } from 'react';
import axios from 'axios';
import { cloudName, unsignedKey } from './api_key/cloud-key';

import './App.css';

class App extends Component {

  state = {
    pictures: []
  }


  componentDidMount() {

    axios.get(`http://res.cloudinary.com/${cloudName}/image/list/hamster.json`)
      .then( result => {
        this.setState({
          pictures: result.data.resources
        });
      })
      .catch( err => {
        console.log(err);
      })

  }

  uploadWidget = () => {
    
    window.cloudinary.openUploadWidget({ 
                                        cloud_name: cloudName, 
                                        upload_preset: unsignedKey, 
                                        tags:['hamster']}, (error, result) => {

                                          if (error) {
                                            console.log(error);
                                          } else {
                                            console.log(result);
                                          }

                                        });

  }

  render() {
    return (
      <div className="App">
        <button onClick={this.uploadWidget}>Add Image</button>  

        {
          this.state.pictures.map(data => {
            return (
              <div key={data.public_id}>
                <img alt="" src={`http://res.cloudinary.com/${cloudName}/image/upload/${data.public_id}.jpg`} />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;

