import React, { useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { CircularProgress, Button } from '@material-ui/core';

import { v4 as uuidv4 } from 'uuid';

const storage = getStorage();

const CustomUploader = (props) => {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState('');
  const [name, setName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    if (file) {
      const randomName = `${uuidv4()}${getImgExtension(file.name)}`;
      // console.log('random name: ', randomName);
      setName(randomName);
    }
  }, [file]);

  function getImgExtension(fileName) {
    return fileName.slice(fileName.indexOf('.'));
  }

  function handleUpload(e) {
    e.preventDefault();
    // const storageRef = ref(storage, `/${props.dir}/${file.name}`);
    // console.log(`/${props.dir}/${uuidv4()}${getImgExtension(file.name)}`);
    // console.log('Name: ', name);
    const storageRef = ref(storage, `/${props.dir}/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      () => {
        if (!isUploading) {
          setIsUploading(true);
        }
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFile(null);
          setURL(url);
          setIsUploading(false);
          props.filename(name);
        });
      }
    );
  }

  return (
    <div>
      {!url ? (
        <>
          <form onSubmit={handleUpload}>
            <input type="file" onChange={handleChange} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!file}
            >
              upload
            </Button>
          </form>
        </>
      ) : null}
      {isUploading ? (
        <div
          className="progress"
          style={{ textAlign: 'center', margin: '30px 0' }}
        >
          <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
        </div>
      ) : null}

      {url ? (
        <div className="image_upload_container">
          <img
            src={url}
            alt={name}
            style={{
              width: '100%',
            }}
          />
          <div className="remove" onClick={() => alert('remove')}>
            Remove
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CustomUploader;
