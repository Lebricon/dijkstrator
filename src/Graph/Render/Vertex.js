import React from 'react';

class Vertex extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      radius: 16,
      vertex: props.vertex,
    };
  }

  render() {
    return (
      <g>
        <circle 
          id={ 'vertex-' + this.props.id} 
          vertex-id={this.props.id} 
          className='vertex vertexDrop vertexDrag' 
          fillOpacity={1} 
          stroke="#25bcff" 
          strokeWidth="3" 
          cx={ this.state.vertex.posX } 
          cy={ this.state.vertex.posY } 
          r={ this.state.radius } 
        />
        <text 
          x={ this.state.vertex.posX - this.state.radius*2 } 
          y={ this.state.vertex.posY - this.state.radius*1.5 } 
          fill="#25bcff"
          className="vertexText"
        >
          { this.state.vertex.name }
        </text>
      </g>
    );
  }
}

export default Vertex;
