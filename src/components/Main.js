import React, { Component } from 'react';
import { Button, FormControl, FormGroup, Grid, Image } from 'react-bootstrap';
import ImageDataConverter from '../utils/ImageDataConverter';

let apiUrl = 'http://localhost:8080';

const styles = {
  inputFile: {
    display: 'none',
  },
};

const post = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const option = { method: 'post', body: formData };

  try {
    return await fetch(apiUrl, option);
  } catch (e) {
    // android用
    apiUrl = 'http://10.0.2.2:8080';
    return fetch(apiUrl, option);
  }
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null, src: null, imageId: null };
  }

  componentWillMount() {
    this.onCaptureFromApp();
  }

  onCaptureFromApp = () => {
    document.body.addEventListener('uploaded', (e) => {
      const { src } = e.detail;
      const file = new ImageDataConverter(src).dataURItoBlob();
      this.setState({ file, src });
    });
  };

  onClickFileSelect = () => this.input.click();

  onFileChange = (e) => {
    const file = e.target.files.item(0);
    const src = window.URL.createObjectURL(file);
    this.setState({ file, src });
  };

  onSubmit = async () => {
    const response = await post(this.state.file);
    if (response.ok) {
      const body = await response.json();
      const imageId = body.id;
      this.setState({ imageId, file: null, src: null });
    } else {
      console.error(response);
    }
  };

  renderPreview() {
    return (
      <div>
        <h3>プレビュー</h3>
        <Image src={this.state.src} responsive />
      </div>
    );
  }

  render() {
    return (
      <Grid>
        <FormGroup>
          <FormControl
            id="input-file"
            style={styles.inputFile}
            type="file"
            name="image"
            onChange={this.onFileChange}
            inputRef={(ref) => {
              this.input = ref;
            }}
          />
          <Button id="file-select" onClick={this.onClickFileSelect}>
            ファイル選択
          </Button>
        </FormGroup>

        <Button onClick={this.onSubmit} disabled={!this.state.file}>
          Upload
        </Button>
        <Button href={`${apiUrl}/${this.state.imageId}.jpg`} disabled={!this.state.imageId}>
          Download
        </Button>

        {this.state.src ? this.renderPreview() : null}
      </Grid>
    );
  }
}

export default Main;
