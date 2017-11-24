import React, { Component } from 'react';
import GridSizer from './admin/GridSizer';
import GridSelector from './admin/GridSelector';
import TileEditor from './admin/TileEditor';
import GenmoJSONCompiler from './admin/GenmoJSONCompiler';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridSize:{rows:1, cols:1},
      currentTile:{row:1, col:1},
      grid:{}
    }
  }

  updateState(key, value) {
    let newState = Object.assign({}, this.state);
    newState[key] = value;
    this.setState(newState);
  }

  updateGridSize(newSize) {
    this.updateState('gridSize', newSize);
  }

  updateCurrentTile(newTile) {
    this.updateState('currentTile', newTile);
  }

  updateCurrentTileData(value) {
    let newState = Object.assign({}, this.state);
    newState.grid[this.currentIndex()] = value;
    this.setState(newState);
  }

  currentCellData() {
    return this.state.grid[this.currentIndex()] || {description:"", type:""};
  }

  currentIndex() {
    const cr = this.state.currentTile.row;
    const cc = this.state.currentTile.col;
    return `r${cr}c${cc}`;
  }

  //TODO: perhaps instead of children having their own state that they pass up to the parent, 
  // have children report events to parent, and parent updates its own state
  // which the children read from directly
  // Currently, there is no single source of truth
  render() {
    return (
      <div className="admin">
        <h1>Admin Area</h1>
        <GridSizer rows={this.state.gridSize.rows} cols={this.state.gridSize.cols} onUpdate={(newSize) => { this.updateGridSize(newSize); }} />
        <GridSelector currentTile={this.state.currentTile} size={this.state.gridSize} onUpdate={(newTile) => { this.updateCurrentTile(newTile); }} />
        <TileEditor tileData={this.currentCellData()} onUpdate={(newTileData) => { this.updateCurrentTileData(newTileData); }} />
        <GenmoJSONCompiler genmoState={this.state} />
      </div>
    );
  }
}

export default Admin;