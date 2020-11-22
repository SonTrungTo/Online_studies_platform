import { createMuiTheme } from "@material-ui/core/styles";
import { pink, red, yellow } from "@material-ui/core/colors";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    palette: {
        primary: {
            main: red['900'],
            light: red['100'],
            dark: red['900'],
            contrastText: '#fff'
        },
        secondary: {
            light: yellow['100'],
            main: yellow['500'],
            dark: yellow['900'],
            contrastText: '#000'
        },
        openTitle: '#3f4771',
        protectedTitle: pink['400'],
        type: 'light'
    }
});

export default theme;