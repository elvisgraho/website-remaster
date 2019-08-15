import React, { Component } from 'react';
import {Route, BrowserRouter} from "react-router-dom";

import Header from './organisms/Header';
import Resume from './templates/Resume';
import Blog from './templates/Blog'

import favIcon from '../images/png/favicon.png';

let docHead = document.getElementsByTagName('head')[0];       
let newLink = document.createElement('link');
newLink.rel = 'shortcut icon';
newLink.type = 'image/png';
newLink.href = favIcon;
docHead.appendChild(newLink);


class App extends Component {

  constructor() {
    super();

    this.onRouteChange = this.onRouteChange.bind(this);

    this.state = {
      route: "/"
    }
  }

  onRouteChange() {
    this.setState({route: window.location.pathname});
  }

  componentWillMount() {
    this.setState({route: window.location.pathname});
  }

  render() {

    return (
      <React.Fragment>
        <BrowserRouter basename={process.env.PUBLIC_URL}>

          {(this.state.route !== "/" && this.state.route !=="/favicon.png") && (
            <Route path="/" render={() => <Header route={this.state.route} /> }/>
          )}

          <Route exact path="/" render={() => <Resume onRouteChange={this.onRouteChange}/> }/>
          <Route exact path="/blog" render={() => <Blog onRouteChange={this.onRouteChange}/> } />

        </BrowserRouter>
      </React.Fragment>
    );
  } 
}

export default App;