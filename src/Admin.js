import React, { Component } from 'react';

class GridSizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows:this.props.startSize.rows,
      cols:this.props.startSize.cols
    };
  }

  //TODO: condense to single function?
  updateRows(e) {
    const rows = +e.target.value;
    const cols = this.state.cols;
    this.setState({ rows, cols }, () => { this.update(); }); //setState isn't synchronus, use a callback
  }

  updateCols(e) {
    const cols = +e.target.value;
    const rows = this.state.rows;
    this.setState({ rows, cols }, () => { this.update(); });
  }

  update() {
    if (this.props.onUpdate && typeof this.props.onUpdate === "function") {
      this.props.onUpdate(this.state);
    }
  }

  //TODO: instead of internal state, value=this.props.rows/cols, and onChange is this.props.onUpdate, to update parent state directly instead of having its own internal one
  render() {
    return(
      <div id="grid-sizer">
        <input type="number" maxLength="2" id="grid-sizer-rows" value={this.state.rows} onChange={(e) => { this.updateRows(e) }} /> x
        <input type="number" maxLength="2" id="grid-sizer-cols" value={this.state.cols} onChange={(e) => { this.updateCols(e) }} />
      </div>
    )
  }
}

class GridSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTile:{
        row:this.props.startTile.row,
        col:this.props.startTile.col
      }
    }
  }

  updateCurrent(e) {
    const row = +e.target.dataset.coordsRow;
    const col = +e.target.dataset.coordsCol;
    this.setState({ currentTile:{ row, col } }, () => { this.update(); });
  }

  update() {
    if (this.props.onUpdate && typeof this.props.onUpdate === "function") {
      this.props.onUpdate(this.state.currentTile);
    }
  }

  render() {
    //TODO: how to print out a grid?
    let grid = [];
    for (let i = 0; i < this.props.size.rows; i++) {
      let cells = [];
      for(let j = 0; j < this.props.size.cols; j++) {
        let className = "cell";
        if (i+1 === this.state.currentTile.row && j+1 === this.state.currentTile.col)
          className += " current";
        cells.push(<div className={className} data-coords-row={i+1} data-coords-col={j+1} key={`cell_${i}x${j}`} onClick={(e) => { this.updateCurrent(e) }}></div>);
      }
      grid.push(<div className="row" key={`row_${i}`}>{cells}</div>);
    }

    return grid;
  }
}

class TileDescriptionEditor extends Component {
  // this has the data for the whole grid,
  // has a selected state like GridSelector
  // View is a set of fields for
  //   - description
  //   - npcs
  //     - What they respond with
  constructor(props) {
    super(props);

    this.state = {
      grid:this.props.grid
    };
  }

  updateTile(e) {
    let newState = Object.assign({}, this.state);
    newState.grid[this.currentIndex()] = { description:e.target.value };
    this.setState(newState, () => { this.update() });
  }

  update() {
    if (this.props.onUpdate && typeof this.props.onUpdate === "function") {
      this.props.onUpdate(this.state.grid);
    }
  }

  currentItem() {
    return this.state.grid[this.currentIndex()] || {description:""};
  }

  currentIndex() {
    const cr = this.props.currentTile.row;
    const cc = this.props.currentTile.col;
    return `${cr}x${cc}`;
  }

  render() {
    return(
      <div className="tile-description-editor">
        <textarea id="description" value={this.currentItem().description} placeholder="description" onChange={(e) => this.updateTile(e)} />
      </div>
    );
  }
}

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

  //TODO: perhaps instead of children having their own state that they pass up to the parent, 
  // have children report events to parent, and parent updates its own state
  // which the children read from directly
  // Currently, there is no single source of truth
  render() {
    return (
      <div className="admin">
        <h1>Admin Area</h1>
        <GridSizer startSize={this.state.gridSize} onUpdate={(newSize) => { this.updateState('gridSize', newSize); }} />
        <GridSelector startTile={this.state.currentTile} size={this.state.gridSize} onUpdate={(newCurrent) => { this.updateState('currentTile', newCurrent); }} />
        <TileDescriptionEditor currentTile={this.state.currentTile} grid={this.state.grid} onUpdate={(newGrid) => { this.updateState('grid', newGrid); }} />
      </div>
    );
  }
}

export default Admin;