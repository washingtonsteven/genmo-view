import React, { Component } from 'react';
import DisplayMessage from './app/DisplayMessage';
import ActionBar from './app/ActionBar';
import genmo from './GenmoInstance';
//import world_data from './data/test1.json';

class App extends Component {
  constructor(props) {
    super(props);

    genmo.setOutput(this.output.bind(this));

    const defaultButtons = ['look', 'ls', 'move', 'talk']

    this.state = { 
      messages:[],
      defaultButtons,
      currentButtons:defaultButtons.slice(),
    };
  }

  output(message, opts) {
    const newState = Object.assign({}, this.state);
    
    if (typeof message === "string") {
      newState.messages.push(<DisplayMessage message={message} key={newState.messages.length} />);
      this.setState(newState);
    } else if (message.msg) {
      newState.messages.push(<DisplayMessage message={message.msg} key={newState.messages.length} />);
      this.setState(newState, () => {
        this.updateActionBar(message);
      });
    }

    if (opts && opts.justMoved) {
      this.newArea();
    }
  }

  componentDidMount() {
    genmo.sendCommand('look');
    this.newArea();
  }

  newArea() {
    this.resetActionBar(() => {
      genmo.sendCommand('move');
      genmo.sendCommand('talk');
    })
  }

  resetActionBar(setStateCallback) {
    const newState = Object.assign({}, this.state);
    newState.currentButtons = newState.defaultButtons.slice();
    this.setState(newState, () => { setStateCallback(); });
  }

  updateActionBar(message) {
    const newState = Object.assign({}, this.state);
    let currentButtons = newState.currentButtons;
    const cmdIndex = currentButtons.indexOf(message.command);

    const newButtons = [];
    for (let i = 0; i < message.data.length; i++) {
      if (message.command === 'talk') {
        newButtons.push(`talk ${message.data[i].index}`); //TODO: print name here, need to separate button label and command sent
      } else if (message.command === 'move') {
        newButtons.push(`move ${message.data[i].val}`);
      }
    }

    currentButtons.splice(cmdIndex+1, 0, ...newButtons);
    const uniq = {};
    newState.currentButtons = currentButtons.filter((v,i,a) => {
      return uniq[v] ? false : uniq[v]=true;
    });
    
    this.setState(newState);
  }

  sendCommand(command) {
    genmo.sendCommand(command);
  }

  render() {
    return (
      <div className="App">
        <ActionBar action={(a) => this.sendCommand(a)} buttons={this.state.currentButtons} />
        <div className="messages">
          { this.state.messages }
        </div>
      </div>
    );
  }
}

export default App;
