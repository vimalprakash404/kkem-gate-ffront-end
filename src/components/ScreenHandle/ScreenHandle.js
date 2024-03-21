import React, { Component } from 'react';
import { withGetScreen } from 'react-getscreen'
import CardHook from '../../hooks/CardHook';

class ScreenHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    }
  }

  
//description toggle 
  toggle_changer(e) {
    this.setState({ toggle: this.state.toggle ? false : true })
  }
  
  // componentDidMount() {
  //   var myCollapse = document.getElementById('collapseTarget')
  //   var bsCollapse = new Collapse(myCollapse, { toggle: this.state.toggle })
  //   this.state.toggle ? bsCollapse.show() : bsCollapse.hide()
  // }
  // componentDidUpdate() {
  //   var myCollapse = document.getElementById('collapseTarget')
  //   var bsCollapse = new Collapse(myCollapse, { toggle: this.state.toggle })
  //   this.state.toggle ? bsCollapse.show() : bsCollapse.hide()
  // }
  render() {
    return (
      <div className="container-fluid">
        <CardHook isMobile={this.props.isMobile()} ob={this} hider={this.state.toggle}></CardHook>
      </div>
    )
  }
}


export default withGetScreen(ScreenHandle);

