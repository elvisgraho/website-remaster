import React, { Component } from 'react';

/*
  Example use:

  const AsyncBox = asyncLoad( () => import('./assets/components/Box'));
  <AsyncBox propsExample = {this.props.propsExample} />
*/

export default function asyncComponent(importComponent){
  //This function takes in a js import (can be require) as a argument
  //It then returns new react component that loads our component and renders it after the load
  //that way we import component only when we use it

  class AsyncComponent extends Component {
    constructor(props){
      super(props);

      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.state({component: component});
    }

    render () {
      const Component = this.state.component;

      return Component ? <Component {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}