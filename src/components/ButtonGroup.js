import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';

const ButtonGroup = ({
  onSubmit, canUpload, imageId, apiUrl,
}) => (
  <Fragment>
    <Button onClick={onSubmit} disabled={!canUpload}>
      Upload
    </Button>
    <Button href={`${apiUrl}/${imageId}.jpg`} disabled={!imageId}>
      Download
    </Button>
  </Fragment>
);

export default ButtonGroup;
