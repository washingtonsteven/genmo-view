import React, { Component } from 'react';

class ActionBar extends Component {
  actionButtons() {
    let buttons = [];
    for (let i = 0; i < this.props.buttons.length; i++) {
      buttons.push(<button onClick={() => this.doAction(this.props.buttons[i])} key={i}>{this.props.buttons[i]}</button>);
    }
    return buttons;
  }

  doAction(action) {
    if (this.props.action && typeof this.props.action === 'function') {
      this.props.action(action);
    }
  }

  render() {
    return(
      <div className="actionBar">
        { this.actionButtons() }
      </div>
    )
  }
}

export default ActionBar;