import React, { Component } from 'react';
import Routing from './Routing'
import { ThemeProvider } from 'emotion-theming'
import { Subject } from 'rxjs'
import { UpdaterProvider, UpdaterContext } from './updater'
import Layout from './components/Layout'
import routes from './Routing';
import defaultTheme from './utils/defaultTheme'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { onActiveThemeChange, getActiveTheme } from './utils/theme';
import { onAppearanceSettingsChange, getAppearanceConfigObj } from './utils/appearanceSettings';

const App = props => (
  <UpdaterProvider value={new Subject()}>
    <InnerApp />
  </UpdaterProvider>
);
class InnerApp extends Component {
  static contextType = UpdaterContext
  constructor(props){
    super(props)
    this.state = {
      theme: defaultTheme
    }
    onActiveThemeChange(theme => {
      console.log(theme)
      this.setState({
          theme: {
            appearance: this.state.theme.appearance,
            ...theme.details.colors
          }
      })
  })
  getActiveTheme().then(theme => {
    console.log('active', theme)
    this.setState({
      theme: {
        ...this.state.theme,
        ...theme.details.colors
      }
    })
  })
  onAppearanceSettingsChange(appearance => {
    console.log(appearance)
    this.setState({
      theme: {
        ...this.state.theme,
        appearance
      }
    })
  })
  getAppearanceConfigObj().then(appearance => {
    this.setState({
      theme: {
        ...this.state.theme,
        appearance
      }
    })
  })
  }
  render() {
    return (
    
      <ThemeProvider theme={this.state.theme}>
      <Router>
      <Layout>
      
        <Switch>
            {routes.map(routeDetails => <Route {...routeDetails} />)}
        </Switch>
    
      </Layout>
      </Router>
      </ThemeProvider>
   
    );
  }
}

export default InnerApp;
