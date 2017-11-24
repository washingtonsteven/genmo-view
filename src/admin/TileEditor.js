import React, { Component } from 'react';
import NPCEditor from './NPCEditor';

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

  displayNPCEditors() {
    const editors = [];
    if (!this.props.tileData.npcs) this.props.tileData.npcs = [];
    for(let i = 0; i <= this.props.tileData.npcs.length; i++) {
      const npcData = i < this.props.tileData.npcs.length ? this.props.tileData.npcs[i] : { npcName:"", npcResponse:"" };
      editors.push(<NPCEditor npcName={npcData.npcName} npcResponse={npcData.npcResponse} npcIndex={i} key={i} onUpdate={(newNPCData) => this.updateNPC(newNPCData)} />);
    }

    return editors;
  }

  updateNPC(newNPCData) {
    const currentData = Object.assign({}, this.props.tileData);
    currentData.npcs[newNPCData.npcIndex] = {
      npcName: newNPCData.npcName,
      npcResponse: newNPCData.npcResponse
    }
    this.props.onUpdate(currentData);
  }

  render() {
    return(
      <div className="tile-editor">
        <textarea id="description" value={this.props.tileData.description} placeholder="description" onChange={(e) => this.update(e)} /><br/>
        NPCs<br/>
        {this.displayNPCEditors()}
      </div>
    );
  }
}

export default TileEditor;