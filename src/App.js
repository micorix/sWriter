import React, { Component } from 'react';
import Routing from './Routing'
import { ThemeProvider } from 'emotion-theming'
import { Subject } from 'rxjs'
import { UpdaterProvider, UpdaterContext } from './updater'
import Layout from './components/Layout'
import routes from './Routing';
import defaultTheme from './utils/defaultTheme'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { onActiveThemeChange } from './utils/theme';
const theme = {
  'activityBar.background': 'red',
  'activityBar.foreground': 'green',
  'activityBar.foregroundInactive': 'blue',
}
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
          theme: theme.details.colors
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
