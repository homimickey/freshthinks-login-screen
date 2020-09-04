import React from "react";
import Login from "./Login";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";



const themeObject = {
    palette: {
        primary: {
            main: "#7cc03c",
            contrastText: "#fff",
        },
        type: "light",
    },
};
const theme = createMuiTheme(themeObject);


function App() {
    
    return (
        <ThemeProvider theme={theme}>
            <Login  />
        </ThemeProvider>
    );
}

export default App;

