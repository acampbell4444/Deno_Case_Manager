import { createTheme, ThemeOptions } from '@mui/material/styles';

// Define the theme object type
const theme: ThemeOptions = {
  // palette: {
  //   mode: 'dark', // Dark theme overall
  //   primary: {
  //     main: '#34D399', // Green color similar to the one in the image
  //   },
  //   background: {
  //     default: '#111111', // Dark background
  //     paper: '#1A1A1A', // Slightly lighter background for cards and paper components
  //   },
  //   text: {
  //     primary: '#ffffff', // White text
  //     secondary: '#B0B0B0', // Lighter secondary text
  //   },
  //   action: {
  //     hover: '#2F4F4F', // Hover effect color for buttons or links
  //   },
  // },
  // typography: {
  //   fontFamily: 'Roboto, Arial, sans-serif', // A clean, modern font
  //   h4: {
  //     fontWeight: 600,
  //     color: '#34D399', // Green color for headings
  //   },
  //   body1: {
  //     color: '#ffffff', // Body text in white
  //   },
  // },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: '#34D399', // Green button
  //         color: '#ffffff',
  //         '&:hover': {
  //           backgroundColor: '#2C9E77', // Darker green for hover
  //         },
  //       },
  //     },
  //   },
  // },
};

// Export the theme function
export const getTheme = () => createTheme(theme);
