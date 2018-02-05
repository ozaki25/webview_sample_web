import React from 'react';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

const Form = ({ onFileChange }) => (
  <FormGroup>
    <FormControl
      id="input-file"
      style={{ display: 'none' }}
      type="file"
      name="image"
      onChange={onFileChange}
      inputRef={ref => (this.input = ref)}
    />
    <Button id="file-select" onClick={() => this.input.click()}>
      ファイル選択
    </Button>
  </FormGroup>
);

export default Form;
