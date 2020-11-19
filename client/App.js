import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { hot } from "react-hot-loader";
import theme from "./theme";
import MainRouter from "./MainRouter";

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={ theme }>
                <MainRouter />
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default hot(module)(App);