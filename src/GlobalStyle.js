// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600&display=swap');

  body {
    margin: 0;
    font-family: 'Titillium Web', sans-serif;
    background-color: #171717;
    color: #FFFFFF;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
