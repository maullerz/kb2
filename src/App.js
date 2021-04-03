import React, { useState, useEffect } from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { CssBaseline } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import ReactTooltip from 'react-tooltip'

import store from 'store'
import history from 'services/routerHistory'

import * as SettingsSelectors from 'store/reducers/settings.selectors'
import { loadData } from 'utils/SdeUtils'

import { getMuiTheme } from 'assets/styles/mui/muiTheme'
import 'assets/styles/index.pcss'

import Routes from './routes'

const App = () => {
  const theme = useSelector(SettingsSelectors.globalTheme)
  const [loading, setLoading] = useState(true)
  const [themeSettings, setThemeSettings] = useState(getMuiTheme(theme))

  async function prepare() {
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
    <ThemeProvider theme={themeSettings}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />

        <Switch>
          {/* <Route path="/submit-fee-proposal" component={SubmitFeeProposalPage} /> */}
          {/* <Route path="/account/*" component={AccountRoutes} /> */}
          <Route path='/' component={Routes} />
        </Switch>

        <ReactTooltip
          effect='solid'
          backgroundColor='#000f'
          border
          borderColor='#555'
        />
        {/* <ToastContainer /> */}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </ConnectedRouter>
  </Provider>
)

// export default hot(Root);
export default Root
