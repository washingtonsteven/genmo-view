import React, { Component } from 'react'

class GenmoJSONCompiler extends Component {
  compileJSON() {
    const map = [];
    const map_tiles = {};
    for (let i = 0; i < this.props.genmoState.gridSize.rows; i++) {
      map[i] = [];
      for (let j = 0; j < this.props.genmoState.gridSize.cols; j++) {
        map[i][j] = "x";
      }
    }

    for(let gridIndex in this.props.genmoState.grid) {
      const row = +gridIndex.substring(gridIndex.indexOf('r')+1, gridIndex.indexOf('c'));
      const col = +gridIndex.substring(gridIndex.indexOf('c')+1);
      const currentTile = this.props.genmoState.grid[gridIndex];
      map[row-1][col-1] = gridIndex;
      
      map_tiles[gridIndex] = {
        type:currentTile.type,
        description: currentTile.description,
        npcs:[]
      };

      for(let n = 0; n < currentTile.npcs.length; n++) {
        const currentNPC = currentTile.npcs[n];
        const npcData = {
          name:currentNPC.npcName,
          responses:{
            default:currentNPC.npcResponse
          }
        };
        map_tiles[gridIndex].npcs.push(npcData);
      }
    }

    return JSON.stringify({ map, map_tiles });
  }

  copyJSON() {
    var jsonElem = document.getElementById('json');
    jsonElem.select();
    document.execCommand('copy');
  }

  render() {
    return(
      <div className="json-compiler">
        <div>
          <pre>
          {this.compileJSON()}
          </pre>
          <textarea id="json" value={this.compileJSON()} style={{opacity:0}} readOnly />
        </div>
        <button onClick={() => { this.copyJSON() }}>Copy</button>
      </div>
    );
  }
}

export default GenmoJSONCompiler;