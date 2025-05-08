import { createTheme } from '@mui/material/styles';

// Define a custom theme for a healthcare project
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // A calming blue for trust and professionalism
        },
        secondary: {
            main: '#4caf50', // A green for health and vitality
        },
        error: {
            main: '#d32f2f', // A red for errors and alerts
        },
        warning: {
            main: '#ffa000', // A yellow for warnings
        },
        info: {
            main: '#0288d1', // A lighter blue for informational messages
        },
        success: {
            main: '#388e3c', // A darker green for success messages
        },
        background: {
            default: '#f5f5f5', // A light gray for a clean and neutral background
            paper: '#ffffff', // White for cards and surfaces
        },
        text: {
            primary: '#212121', // Dark gray for primary text
            secondary: '#757575', // Medium gray for secondary text
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Clean and professional font
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
        },
        button: {
            textTransform: 'none', // Avoid uppercase for buttons
        },
    },
});

export default theme;