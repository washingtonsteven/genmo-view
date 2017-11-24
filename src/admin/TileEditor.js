import React, { Component } from 'react';

class TileEditor extends Component {
  // this has the data for the whole grid,
  // has a selected state like GridSelector
  // View is a set of fields for
  //   - description
  //   - npcs
  //     - What they respond with

  update(e) {
    const currentData = Object.assign({}, this.props.tileData);
    currentData[e.target.id] = e.target.value;
    this.props.onUpdate(currentData);
  }

  render() {
    return(
      <div className="tile-editor">
        <textarea id="description" value={this.props.tileData.description} placeholder="description" onChange={(e) => this.update(e)} />
      </div>
    );
  }
}

export default TileEditor;