import React, { Component } from 'react';
import Genmo from './genmo';
//import world_data from './genmo/data/data.json';
import world_data from './data/test1.json';

class DisplayMessage extends Component {
  render() {
    return (
      <div className="message"><pre>{this.props.message}</pre></div>
    )
  }
}

class ActionBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons:[
        'look',
        'ls',
        'move n', 
        'move s',
        'move e',
        'move w',
        'talk'
      ]
    }
  }

  actionButtons() {
    let buttons = [];
    for (let i = 0; i < this.state.buttons.length; i++) {
      buttons.push(<button onClick={() => this.doAction(this.state.buttons[i])} key={i}>{this.state.buttons[i]}</button>);
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

class App extends Component {
  constructor(props) {
    super(props);

    this.genmo = new Genmo({
      world_data,
      output:(message, opts) => {
        // this.state.messages.push(message);
      }
    });

    this.state = { genmoState:this.genmo.currentState() };
  }

  allMessages() {
    let displayMessages = [];
    
    for(let i = 0; i < this.state.genmoState.length(); i++) {
      const currentFrame = this.state.genmoState.get(i);
      if (currentFrame.action === 'output')
        displayMessages.push(<DisplayMessage message={currentFrame.value} key={currentFrame.key} />);
    }

    return displayMessages;
  }

  updateState() {
    this.setState({ genmoState:this.genmo.currentState() });
  }

  sendCommand(command) {
    this.genmo.sendCommand(command);
    this.updateState();
  }

  render() {
    return (
      <div className="App">
        <ActionBar action={(a) => this.sendCommand(a)} />
        <div className="messages">
          { this.allMessages() }
        </div>
      </div>
    );
  }
}

export default App;
