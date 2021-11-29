import React, { useState, useEffect } from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import StylesProvider from '@mui/styles/StylesProvider'
// import { MuiPickersUtilsProvider } from '@material-ui/pickers'
// import DateFnsUtils from '@date-io/date-fns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { CssBaseline } from '@mui/material'
import ReactTooltip from 'react-tooltip'

import store from 'store'
import history from 'services/routerHistory'

import * as SettingsSelectors from 'store/reducers/settings.selectors'
import { loadData } from 'utils/SdeData'
import ScrollToTop from 'utils/hooks/ScrollToTop'

import { getMuiTheme } from 'assets/styles/mui/muiTheme'
import 'assets/styles/index.pcss'

import Routes from './routes'

const App = () => {
  const theme = useSelector(SettingsSelectors.globalTheme)
  const [loading, setLoading] = useState(true)
  const [themeSettings, setThemeSettings] = useState(getMuiTheme(theme))

  async function prepare() {
    setLoading(true)
    await loadData()
    setLoading(false)
  }

  useEffect(() => {
    prepare()
  }, [])

  useEffect(() => {
    setThemeSettings(getMuiTheme(theme))
  }, [theme])

  if (loading || !themeSettings) return null

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themeSettings}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />

          <Switch>
            {/* <Route path="/submit-fee-proposal" component={SubmitFeeProposalPage} /> */}
            {/* <Route path="/account/*" component={AccountRoutes} /> */}
            <Route path='/' component={Routes} />
          </Switch>

          <ReactTooltip
            // effect='solid'
            backgroundColor='#000f'
            border
            borderColor='#555'
            multiline
            // delayHide={500}
            // delayShow={500}
          />
          {/* <ToastContainer /> */}
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop />
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </ConnectedRouter>
  </Provider>
)

// export default hot(Root);
export default Root
