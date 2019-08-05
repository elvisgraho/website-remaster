import React, { Component } from 'react';
import Stage from '../organisms/Stage';

import TabNavigation from '../molecules/TabNavigation';
import TextMedia from '../molecules/TextMedia';

import navJson from '../../json/mainPage.json';

class MainPage extends Component {

  componentWillUnmount() {
    this.props.onRouteChange();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <Stage />

        <TabNavigation navNames={["About", "Blog", "Relax"]} modifier={""}>
          {navJson.navigationTabs.map( (tab, index) => {
            return <TextMedia key={index}
            headline={tab.headline} 
            text={tab.text} 
            src={tab.image} 
            btnText={tab.btnText}
            btnClass={tab.btnClass}
            route={tab.route}
            url={tab.url}
            />
          })}
        </TabNavigation>
        
      </React.Fragment>

    );
  }
}

export default MainPage;
