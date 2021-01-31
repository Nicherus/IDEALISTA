import { createGlobalStyle } from 'styled-components';
import reset from './reset';
import common from './common';
import rootCustomProps from './root-custom-props';
import normalize from './normalize';

export default createGlobalStyle`
  ${reset}
  ${common}
  ${rootCustomProps}
  ${normalize}

  body {
    background-image: url('/img/background.jpg');
    background-size: cover;

    overflow: hidden;
  }
`;
