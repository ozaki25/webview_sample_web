import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import ImageDataConverter from '../utils/ImageDataConverter';

import Form from './Form';
import ButtonGroup from './ButtonGroup';
import Preview from './Preview';

// スマホ実機で動かす場合はネットワークのIPを設定する
let apiUrl = 'http://localhost:8080';

const post = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const option = { method: 'post', body: formData };

  try {
    return await fetch(apiUrl, option);
  } catch (e) {
    // androidシミュレータ用
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
    this.onFileChangeFromApp();
  }

  // アプリからのアップロードされたファイルを処理する
  onFileChangeFromApp = () => {
    document.body.addEventListener('uploaded', (e) => {
      const { src } = e.detail;
      const file = new ImageDataConverter(src).dataURItoBlob();
      this.setState({ file, src, imageId: null });
    });
  };

  // ブラウザからアップロードされたファイルを処理する
  onFileChange = (e) => {
    const file = e.target.files.item(0);
    const src = window.URL.createObjectURL(file);
    this.setState({ file, src, imageId: null });
  };

  onSubmit = async () => {
    const response = await post(this.state.file);
    if (response.ok) {
      const body = await response.json();
      const imageId = body.id;
      this.setState({
        imageId,
        file: null,
        src: null,
      });
      alert('Upload Success!');
    }
  };

  render() {
    return (
      <Grid>
        <Form onFileChange={this.onFileChange} />
        <ButtonGroup
          onSubmit={this.onSubmit}
          canUpload={!!this.state.file}
          imageId={this.state.imageId}
          apiUrl={apiUrl}
        />
        {this.state.src ? <Preview src={this.state.src} /> : null}
      </Grid>
    );
  }
}

export default Main;
