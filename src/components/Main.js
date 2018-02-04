import React, { Component } from 'react';
import { Button, FormControl, FormGroup, Grid, Image } from 'react-bootstrap';
import ImageDataConverter from '../utils/ImageDataConverter';

const styles = {
  inputFile: {
    display: 'none',
  },
};

const post = async (file) => {
  const url = 'http://localhost:8080';
  const formData = new FormData();
  formData.append('file', file);
  const option = { method: 'post', body: formData };

  try {
    const response = await fetch(url, option);
    alert(response.status);
  } catch (e) {
    // android用
    const response = await fetch('http://10.0.2.2:8080', option);
    alert(response.status);
  }
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null, src: null };
  }

  componentWillMount() {
    this.onCaptureFromApp();
  }

  onCaptureFromApp = () => {
    document.body.addEventListener('uploaded', (e) => {
      const { src } = e.detail;
      if (src) {
        const file = new ImageDataConverter(src).dataURItoBlob();
        this.setState({ file, src });
      } else {
        alert('error');
      }
    });
  };

  onClickFileSelect = () => this.input.click();

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
            <FormControl
              id="input-file"
              style={styles.inputFile}
              type="file"
              name="image"
              onChange={this.onChange}
              inputRef={(ref) => {
                this.input = ref;
              }}
            />
            <Button id="file-select" onClick={this.onClickFileSelect}>
              ファイル選択
            </Button>
          </FormGroup>
          <Button onClick={this.onSubmit}>Submit</Button>
        </form>
        {this.state.src ? <Image src={this.state.src} responsive /> : null}
      </Grid>
    );
  }
}

export default Main;
