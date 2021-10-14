import { createTheme } from "@material-ui/core/styles"

const blue = "#003c54"
const lightBlue = "#6d8f9d"
const royalBlue = "#0055FF"
const originalRoyalBlue = "#0603af"
const grey = "#747474"
const darkGrey = "#919191"

const theme = createTheme({
  palette: {
    primary: {
      main: blue,
    },
    secondary: {
      main: originalRoyalBlue,
    },
    common: {
      grey,
      darkGrey,
      lightBlue,
      royalBlue,
    },
  },
  typography: {
    h1: {
      fontSize: "4.5rem",
      fontFamily: "Philosopher",
      fontStyle: "italic",
      fontWeight: 700,
      color: blue,
    },
    h2: {
      fontFamily: "Montserrat",
      fontSize: "3rem",
      fontWeight: 500,
      color: "#fff",
    },
    h3: {
      fontFamily: "Montserrat",
      fontSize: "2rem",
      fontWeight: 300,
      color: lightBlue,
    },
    h4: {
      fontFamily: "Philosopher",
      fontStyle: "italic",
      fontWeight: 700,
      fontSize: "3rem",
      color: "#fff",
    },
    h5: {
      fontFamily: "Philosopher",
      fontSize: "2rem",
      fontWeight: 700,
      fontStyle: "italic",
      color: "#fff",
    },
    body1: {
      fontFamily: "Montserrat",
      fontSize: "1.5rem",
      color: grey,
    },
    body2: {
      fontFamily: "Montserrat",
      fontSize: "1.5rem",
      color: "#fff",
    },
  },
  overrides: {
    MuiChip: {
      root: {
        backgroundColor: grey,
      },
      label: {
        fontFamily: "Montserrat",
        fontSize: "1.5rem",
        color: "#fff",
        fontWeight: 400,
      },
    },
  },
})

export default theme
