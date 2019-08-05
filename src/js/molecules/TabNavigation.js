import React from 'react';


export default class TabNavigation extends React.Component {

  constructor(props){
    super(props);

    this.switchTab = this.switchTab.bind(this);
    this.toogleTab = this.toogleTab.bind(this);

    this.onScreenResizeID = 0;
    this._isMounter = false;

    this.state = {
      currentTab: 0,
      maxChildren: 0,
      mainTabText: "",
      containerClass: ""
    }
  }

  switchTab (event) {
    if(event.target.dataset.index
       && parseInt(event.target.dataset.index) !== this.state.currentTab){

      this.setState({
        currentTab: parseInt(event.target.dataset.index),
        mainTabText: event.target.innerHTML,
        containerClass: ""
      });

    }
  }

  toogleTab (event) {
    if("" === this.state.containerClass){
      this.setState({
        containerClass: "nav-active"
      });
    }
    else{
      this.setState({
        containerClass: ""
      });
    }
  }

  onScreenResize () {
    if(this._isMounter){
      clearTimeout(this.onScreenResizeID);
      this.onScreenResizeID = setTimeout(() => this.setState({containerClass: ""}), 200);
    }
  }

  componentDidMount() {
    this._isMounter = true;
    window.addEventListener("resize", this.onScreenResize.bind(this));
  }

  componentWillUnmount () {
    this._isMounter = false;
    clearTimeout(this.resizeHandlerId);
  }

  componentWillMount() {
    if(this.props.children && this.props.navNames[0]){
      this.setState({
        maxChildren: this.props.children.length,
        mainTabText: this.props.navNames[0]
      });
    }
    else{
      console.log("No children for TabNavigation.js!")
    }
  }

  render () {

    const { currentTab, containerClass, mainTabText } = this.state;

    return (
      <div className={`tab-navigation ${this.props.modifier}`}>

        <div className="tab-navigation-navigation">
          <div className="tab-navigation-navigation-head" onClick={this.toogleTab}>
            {mainTabText}
          </div>

          <div className={`tab-navigation-navigation-children ${containerClass}`}>
            { this.props.navNames.map( (value, index) => {
              if(value !== mainTabText || "nav-active" !== containerClass){
                if(index === parseInt(currentTab)){
                  return <div className="tab-navigation-navigation-children-button btn-active" key={index} onClick={this.switchTab} data-index={index}>{value}</div>
                }
                else{
                  return <div className="tab-navigation-navigation-children-button" key={index} onClick={this.switchTab} data-index={index}>{value}</div>
                }
              }
              else{
                return null;
              }
            })}
          </div>
        </div>

        <div className={`tab-navigation-content `}>
          {this.props.children[currentTab]}
        </div>

      </div>
    )
  }


}