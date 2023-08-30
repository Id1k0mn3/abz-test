import { createGlobalStyle } from "styled-components"

export const globalStyles = createGlobalStyle`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    
    --ui-base-white: #FFF;
    --ui-base-black: #000;

    --ui-var-black-87: rgba(0, 0, 0, 0.87);

    --ui-var-blue: #00BDD3;

    --ui-var-yellow: #F4E041;
    --ui-var-lightyellow: #FFE302;

    --ui-var-lightgrey: #F8F8F8;
    --ui-var-darkgrey: #B4B4B4;
  }

  * {
    box-sizing: border-box;
  }


  body {
    min-height: 100vh;
    margin: 0;
    font-weight: 400;
    font-size: 16px;
    line-height: calc(26 / 16);
  }
`