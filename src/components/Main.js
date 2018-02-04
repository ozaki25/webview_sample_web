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
    return await fetch(url, option);
  } catch (e) {
    // android用
    return fetch('http://10.0.2.2:8080', option);
  }
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null, src: null, mode: '' };
  }

  componentWillMount() {
    this.onCaptureFromApp();
  }

  onCaptureFromApp = () => {
    document.body.addEventListener('uploaded', (e) => {
      const { src } = e.detail;
      if (src) {
        const file = new ImageDataConverter(src).dataURItoBlob();
        this.setState({ file, src, mode: 'preview' });
      } else {
        alert('error');
      }
    });
  };

  onClickFileSelect = () => this.input.click();

  onChange = (e) => {
    const file = e.target.files.item(0);
    const src = window.URL.createObjectURL(file);
    this.setState({ file, src, mode: 'preview' });
  };

  onSubmit = async () => {
    this.setState({ src: null, mode: 'loading...' });
    const response = await post(this.state.file);
    if (response.ok) {
      const blob = await response.blob();
      const src = window.URL.createObjectURL(blob);
      this.setState({ src, mode: 'download' });
    } else {
      alert('response error');
    }
  };

  renderImage() {
    const { mode } = this.state;
    return (
      <div>
        <h3>{mode}</h3>
        {this.state.src ? <Image src={this.state.src} responsive /> : null}
      </div>
    );
  }

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
        {this.renderImage()}
      </Grid>
    );
  }
}

export default Main;
