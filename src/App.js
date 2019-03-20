import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import 'normalize.css'
import { Global } from '@emotion/core'

import globalStyles from './globalStyles'

import routes from './routes'

import Layout from './components/layouts/Layout'

import defaultTheme from './utils/defaultTheme'
import { onActiveThemeChange, getActiveTheme } from './utils/db/wrappers/theme'
import { onAppearanceSettingsChange, getAppearanceConfigObj } from './utils/db/wrappers/appearanceSettings'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      theme: defaultTheme
    } 
    getActiveTheme().then(this.setupTheme)
    getAppearanceConfigObj().then(this.setupAppearanceSettings)

    onActiveThemeChange(this.setupTheme)
    onAppearanceSettingsChange(this.setupAppearanceSettings)
  }
  setupTheme = (theme) => {
    if(!theme)
      return
    this.setState({
      theme: {
        ...defaultTheme,
        ...this.state.theme,
        colors: theme.details.colors
      }
    })
  }
  setupAppearanceSettings = (appearance) => {
    this.setState({
      theme: {
        ...defaultTheme,
        ...this.state.theme,
        ...appearance
      }
    })
  }
  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
      <Global styles={globalStyles} />
      <Router>
      <Layout>
        <Switch>
            {routes.map(routeDetails => <Route {...routeDetails} />)}
        </Switch>
      </Layout>
      </Router>
      </ThemeProvider>
    )
  }
}
