import React from 'react';
import { Image } from 'react-bootstrap';

const Preview = ({ src }) => (
  <div>
    <h3>プレビュー</h3>
    <Image src={src} responsive />
  </div>
);

export default Preview;
