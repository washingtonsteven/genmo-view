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
    this.setState({ currentTile:{ row, col } }, () => { console.log('new current: '+this.state.currentTile.row+', '+this.state.currentTile.col) });
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
  render() {
    return(
      <div>TDE</div>
    );
  }
}

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridSize:{rows:1, cols:1},
      startTile:{row:1, col:1}
    }
  }

  updateState(key, value) {
    let newState = Object.assign({}, this.state);
    newState[key] = value;
    this.setState(newState);
  }

  render() {
    return (
      <div className="admin">
        <h1>Admin Area</h1>
        <GridSizer startSize={this.state.gridSize} onUpdate={(newSize) => { this.updateState('gridSize', newSize); }} />
        <GridSelector startTile={this.state.startTile} size={this.state.gridSize} />
        <TileDescriptionEditor />
      </div>
    );
  }
}

export default Admin;