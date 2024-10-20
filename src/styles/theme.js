import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#90caf9' }, // Blue color
        secondary: { main: '#FFB52E' },
        background: { default: '#121212', paper: '#1e1e1e' },
        text: { primary: '#FFB52E', secondary: '#b0b0b0' },
    },
    typography: {
        fontFamily: '"Delius", sans-serif', // Example font family
    },
});
