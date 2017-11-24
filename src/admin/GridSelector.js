import React, { Component } from 'react';

class GridSelector extends Component {
  updateCurrent(e) {
    const row = +e.target.dataset.coordsRow;
    const col = +e.target.dataset.coordsCol;
    this.props.onUpdate({row, col});
  }

  render() {
    //TODO: how to print out a grid?
    let grid = [];
    for (let i = 0; i < this.props.size.rows; i++) {
      let cells = [];
      for(let j = 0; j < this.props.size.cols; j++) {
        let className = "cell";
        if (i+1 === this.props.currentTile.row && j+1 === this.props.currentTile.col)
          className += " current";
        cells.push(<div className={className} data-coords-row={i+1} data-coords-col={j+1} key={`cell_${i}x${j}`} onClick={(e) => { this.updateCurrent(e) }}></div>);
      }
      grid.push(<div className="row" key={`row_${i}`}>{cells}</div>);
    }

    return grid;
  }
}

export default GridSelector;