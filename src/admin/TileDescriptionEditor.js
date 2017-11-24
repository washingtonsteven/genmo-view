import React, { Component } from 'react';

class TileDescriptionEditor extends Component {
  // this has the data for the whole grid,
  // has a selected state like GridSelector
  // View is a set of fields for
  //   - description
  //   - npcs
  //     - What they respond with

  update(e) {
    this.props.onUpdate({description: e.target.value});
  }

  render() {
    return(
      <div className="tile-description-editor">
        <textarea id="description" value={this.props.tileData.description} placeholder="description" onChange={(e) => this.update(e)} />
      </div>
    );
  }
}

export default TileDescriptionEditor;