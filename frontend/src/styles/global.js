import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Muli:400,700&display=swap');

  * {
    box-sizing: border-box;
    font-family: 'Muli', sans-serif;
    margin: 0;
    outline: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
