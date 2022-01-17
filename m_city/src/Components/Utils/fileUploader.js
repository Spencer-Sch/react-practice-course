import React, { Component } from 'react';
import { firebase, FBstorage } from '../../firebase';
import { getStorage, ref } from 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import { CircularProgress } from '@material-ui/core';
import { getSelectionRange } from '@testing-library/user-event/dist/utils';

class Fileuploader extends Component {
  state = {
    name: '',
    isUploading: false,
    fileURL: '',
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
    });
  };

  handleUploadError = (e) => {
    console.log(e);
    this.setState({
      isUploading: false,
    });
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false,
    });
  };

  render() {
    console.log('rendering...');
    console.log(this.state);
    return (
      <div>
        <div>
          <FileUploader
            accept="image/*"
            name="image"
            randomizeFilename
            storageRef={ref(FBstorage, this.props.dir)}
            // storageRef={ref(getStorage(firebase), this.props.dir)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
          />
        </div>
      </div>
    );
  }
}

export default Fileuploader;
