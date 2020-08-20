import React, { useRef, useState } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import {FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import getExif from 'exif-js'
import "./UploadImage.css";

export default function UploadImage() {
    const file = useRef(null);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  /*
  function validateTags() {
      return true;
  }
  */

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;
      //scrub metadata here to avoid sending img file to REST and THEN to S3.
      //Doing it here allows us to just send the metadata as is
      const metadataFile = getExif(file.current);
      const comments = [];
      const metadata = {
          size: metadataFile.EXIFwrapped.size,
          type: metadataFile.EXIFwrapped.type
    };


      await createNote({ title, attachment, metadata, tags, comments });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createNote(note) {
    console.log(note);

    return API.post("notes", "/images", {
      body: note
    });
  }

  return (
    <div className="UploadImage">
      <form onSubmit={handleSubmit}>

        <FormGroup controlId="content">
            <ControlLabel>Title</ControlLabel>
            <FormControl
                value={title}
                type='text'
                placeholder="Image Title"
                onChange={e => setTitle(e.target.value)}
                required
            />
        </FormGroup>

        <FormGroup>
            <ControlLabel>Tags</ControlLabel>
            <FormControl
                value={tags}
                type='text'
                placeholder='Tag 1, Tag 2, Tag 3'
                onChange={e => setTags(e.target.value)}
            />
        </FormGroup>

        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" required/>
        </FormGroup>

        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
        >
          Create
        </LoaderButton>

      </form>
    </div>
  );
}