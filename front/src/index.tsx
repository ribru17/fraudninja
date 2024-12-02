import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Extend the Theme type to include tertiary color
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#b8946d',
      light: '#eac5a3',
      dark: '#86663f',
    },
    secondary: {
      main: '#c02808',
      light: '#ff5a35',
      dark: '#870000',
    },
    tertiary: {
      main: '#9e570c',
      light: '#d48539',
      dark: '#6b2c00',
    },
    background: {
      default: '#f7f3ef',
      paper: '#f7f3ef',
    },
    text: {
      primary: '#241403',
      secondary: '#5b4f42',
    },
  },
  typography: {
    fontFamily: 'Quicksand, Arial, sans-serif',
    h1: {
      fontFamily: 'Kalam, cursive',
    },
    h2: {
      fontFamily: 'Kalam, cursive',
    },
    h3: {
      fontFamily: 'Kalam, cursive',
    },
    h4: {
      fontFamily: 'Kalam, cursive',
    },
    h5: {
      fontFamily: 'Kalam, cursive',
    },
    h6: {
      fontFamily: 'Kalam, cursive',
    },
    subtitle1: {
      color: '#5b4f42',
    },
    subtitle2: {
      color: '#5b4f42',
    },
    body1: {
      fontFamily: 'Quicksand, bold',
    },
    body2: {
      fontFamily: 'Quicksand, bold',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Quicksand, bold',
          borderRadius: 8,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f7f3ef',
          color: '#241403',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

reportWebVitals();
