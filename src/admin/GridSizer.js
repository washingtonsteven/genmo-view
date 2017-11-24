import React, { Component } from 'react';

class GridSizer extends Component {
  update(e) {
    const stateProp = e.target.dataset.stateProp;
    const size = { rows:this.props.rows, cols:this.props.cols };
    size[stateProp] = e.target.value;
    this.props.onUpdate(size)
  }
  render() {
    return(
      <div id="grid-sizer">
        <input type="number" maxLength="2" id="grid-sizer-rows" data-state-prop="rows" value={this.props.rows} onChange={(e) => { this.update(e) }} /> x
        <input type="number" maxLength="2" id="grid-sizer-cols" data-state-prop="cols" value={this.props.cols} onChange={(e) => { this.update(e) }} />
      </div>
    )
  }
}

export default GridSizer;