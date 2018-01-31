import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup, Grid, Image } from 'react-bootstrap';

const post = async (file) => {
  const url = 'http://localhost:8080';
  const formData = new FormData();
  formData.append('file', file);
  const option = { method: 'post', body: formData };

  const response = await fetch(url, option);
  alert(response.status);
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null, src: null };
  }

  onChange = (e) => {
    const file = e.target.files.item(0);
    const src = window.URL.createObjectURL(file);
    this.setState({ file, src });
  };

  onSubmit = () => post(this.state.file);

  render() {
    return (
      <Grid>
        <form>
          <FormGroup>
            <ControlLabel>Image</ControlLabel>
            <FormControl type="file" name="image" onChange={this.onChange} />
          </FormGroup>
          <Button onClick={this.onSubmit}>Submit</Button>
        </form>
        {this.state.src ? <Image src={this.state.src} responsive /> : null}
      </Grid>
    );
  }
}

export default Main;
