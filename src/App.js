import { useRef, useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    color : ${({ theme: { color } }) => color};
    background-color : ${({ theme: { backgroundColor } }) => backgroundColor};
    padding: 1rem;
    font-size: 1.375rem;
    text-align: center;
  }
`;

const ModifiableShape = styled.div.attrs(({ $borderRadius }) => ({
  style: {
    borderRadius: $borderRadius + "%",
  },
}))`
  background-color: green;
  text-align: center;
  width: 300px;
  line-height: 300px;
  margin: 1rem;
  overflow: hidden;
`;
ModifiableShape.defaultProps = {
  $borderRadius: 0,
};

const Button = styled.button`
  cursor: pointer;
`;

const theme = {
  dark: {
    backgroundColor: "black",
    color: "white",
  },
  light: {
    backgroundColor: "white",
    color: "black",
  },
};

function App() {
  const [changeTheme, setChangeTheme] = useState(false);
  const [BRvalue, setBRvalue] = useState(0);
  let intervalRef = useRef(null);
  return (
    <ThemeProvider theme={theme[changeTheme ? "light" : "dark"]}>
      <GlobalStyles />
      <label>
        Change Theme
        <input
          type="checkbox"
          onChange={(e) => setChangeTheme((val) => !val)}
        />
      </label>
      <ModifiableShape $borderRadius={BRvalue}>
        Border Radius: {BRvalue}%
      </ModifiableShape>
      <Button
        onMouseDownCapture={(e) => {
          console.log(e);
          if (e.button !== 0) return;
          if (intervalRef.current != null) clearInterval(intervalRef.current);
          intervalRef.current = setInterval(() => {
            setBRvalue((val) =>
              val === 50 ? val : parseFloat((val + 0.1).toFixed(2))
            );
          });
        }}
        onMouseUpCapture={(e) => {
          clearInterval(intervalRef.current);
        }}
        onMouseOutCapture={(e) => {
          clearInterval(intervalRef.current);
        }}
      >
        Increase
      </Button>
      <Button
        onMouseDownCapture={(e) => {
          console.log(e);
          if (e.button !== 0) return;
          if (intervalRef.current != null) clearInterval(intervalRef.current);
          intervalRef.current = setInterval(() => {
            setBRvalue((val) =>
              val === 0 ? val : parseFloat((val - 0.1).toFixed(2))
            );
          });
        }}
        onMouseUpCapture={(e) => {
          clearInterval(intervalRef.current);
        }}
        onMouseOutCapture={(e) => {
          clearInterval(intervalRef.current);
        }}
      >
        Decrease
      </Button>
    </ThemeProvider>
  );
}

export default App;
