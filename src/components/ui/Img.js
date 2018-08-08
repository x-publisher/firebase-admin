import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 140px;
  height: 140px;
`;

export default ({ src, ...rest }) => (
  <Img src={src} alt="table-img" {...rest} />
);
