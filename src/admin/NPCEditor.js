import React, { Component } from 'react';

class NPCEditor extends Component {
  update(e) {
    const newData = {
      npcName:this.props.npcName,
      npcResponse:this.props.npcResponse,
      npcIndex:this.props.npcIndex
    }

    newData[e.target.id] = e.target.value;

    this.props.onUpdate(newData);
  }

  render() {
    return(
      <div className="npc">
        <input type="text" id="npcName" value={this.props.npcName} onChange={(e) => this.update(e)} placeholder="NPC Name" /><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<textarea id="npcResponse" value={this.props.npcResponse} onChange={(e) => this.update(e)} placeholder="NPC Response" />
      </div>
    );
  }
}

export default NPCEditor;