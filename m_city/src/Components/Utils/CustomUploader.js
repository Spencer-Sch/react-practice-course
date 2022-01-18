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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (file) {
      const randomName = `${uuidv4()}${getImgExtension(file.name)}`;
      // console.log('random name: ', randomName);
      setName(randomName);
    }
  }, [file]);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

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
        if (!isLoading) {
          setIsLoading(true);
        }
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFile(null);
          setURL(url);
          setIsLoading(false);
        });
      }
    );
  }

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        {/* <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!file}
        >
          upload
        </Button> */}
      </form>
      <img src={url} alt="" />
      {isLoading && <CircularProgress />}
    </div>
  );
};

export default CustomUploader;
