import { createTheme, adaptV4Theme } from '@mui/material/styles'

// TODO: Second "light" theme
// https://material-ui.com/customization/theming/
// https://material-ui.com/styles/advanced/#accessing-the-theme-in-a-component

export const getMuiTheme = theme => {
  const isDark = theme === 'dark'

  return createTheme(adaptV4Theme({
    dark: isDark,
    light: !isDark,
    palette: {
      // mode: theme, // 'dark' / 'light'
      type: 'dark',

      // primary: {
      //   main: '#96CEF6',
      //   contrastText: '#142426',
      // },
      // secondary: {
      //   main: '#73778C',
      //   contrastText: 'rgba(255, 255, 255, 0.87);',
      // },
      // error: {
      //   main: '#FA928D',
      //   contrastText: '#FFF',
      // },
      // background: isDark ? {
      //   paper: '#343640',
      //   default: '#343640',
      // } : {
      //   paper: '#F4F5FA',
      //   default: '#F4F5FA',
      // },
    },
    typography: {
      fontFamily: [
        'Verdana',
        'Helvetica',
        '-apple-system',
        'BlinkMacSystemFont',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    overrides: {
      MuiList: {
        padding: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
      MuiPaper: {
        rounded: {
          borderRadius: 0,
        },
      },
      MuiListItem: {
        container: {
          minHeight: 40,
        },
      },
      // Way to tune most of our controls at once
      MuiFilledInput: {
        input: {
          padding: '22px 16px 6px',
        },
      },
    },
  }))
}
