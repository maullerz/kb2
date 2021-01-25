import { createMuiTheme } from '@material-ui/core/styles'

// TODO: Second "light" theme
// https://material-ui.com/customization/theming/
// https://material-ui.com/styles/advanced/#accessing-the-theme-in-a-component

export const getMuiTheme = (theme) => {
  const isDark = theme === 'dark'

  return createMuiTheme({
    dark: isDark,
    light: !isDark,
    palette: {
      type: theme, // 'dark' / 'light'
      primary: {
        main: '#96CEF6',
        contrastText: '#142426',
      },
      secondary: {
        main: '#73778C',
        contrastText: 'rgba(255, 255, 255, 0.87);',
      },
      error: {
        main: '#FA928D',
        contrastText: '#FFF',
      },
      background: isDark ? {
        paper: '#343640',
        default: '#343640',
      } : {
        paper: '#F4F5FA',
        default: '#F4F5FA',
      },
    },
    typography: {
      fontFamily: 'Graphik LC',
      h1: {
        fontFamily: 'Avenir',
      },
      h2: {
        fontFamily: 'Avenir',
      },
      h3: {
        fontFamily: 'Avenir',
      },
      h4: {
        fontFamily: 'Avenir',
      },
      h5: {
        fontFamily: 'Avenir',
      },
      h6: {
        fontFamily: 'Avenir',
      },
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
  })
}
