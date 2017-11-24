import React, { Component } from 'react';

class DisplayMessage extends Component {
  render() {
    return (
      <div className="message"><pre>{typeof this.props.message === 'string' ? this.props.message : JSON.stringify(this.props.message)}</pre></div>
    )
  }
}

export default DisplayMessage;