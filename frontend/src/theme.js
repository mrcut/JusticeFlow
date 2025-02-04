import { green, grey, red, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Roboto, Arial",
    h1: {
      fontSize: "4rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "3.5rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "2rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: "#002147", // Dark blue
    },
    secondary: {
      main: "#FFDF00", // Yellow
    },
    error: {
      main: red[700], // Red
    },
    warning: {
      main: yellow[700], // Yellow
    },
    info: {
      main: "#0071c5", // Blue
    },
    success: {
      main: green[700], // Green
    },
    background: {
      default: "#f9f9f9", // Light grey background
      paper: "#FFFFFF", // White background for paper components
    },
    grey: {
      main: grey[900], // Dark grey for text
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          backgroundColor: "#004d7a", // Dark blue background
          color: "#FFFFFF", // White text
          "&:hover": {
            backgroundColor: "#FFDF00", // Yellow on hover
            color: "#002147", // Dark blue text on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#004d7a", // Dark blue AppBar background
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#004d7a", // Same dark blue background as AppBar
          color: "#FFFFFF", // White text in the drawer
        },
      },
    },
  },
});

export default theme;
