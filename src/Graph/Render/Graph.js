import React from 'react';
import Edge from './Edge';
import EdgeArrow from './EdgeArrow';

import Vertex from './Vertex'

class Graph extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      vertices: props.vertices,
      dragCount: this.props.dragCount,
    };
  }

  render() {
    return (
      <g>
        { this.state.vertices.map( (vertex, index) => (
              vertex.adjacentVertices.map( (adjacentVertex, index2) => (
                <Edge 
                  key={'edge-' + this.state.dragCount + '-' + index2} 
                  start={vertex} 
                  end={adjacentVertex.vertex} 
                  weight={adjacentVertex.weight}
                />
              )
            )
          )
        )}
        { this.state.vertices.map( (vertex, index) => <Vertex key={'vertex-' + this.state.dragCount + '-' + index} id={index} vertex={vertex} /> ) }
        { this.state.vertices.map( (vertex, index) => (
              vertex.adjacentVertices.map( (adjacentVertex, index2) => (
                <EdgeArrow 
                  key={'edge-arrow-' + this.state.dragCount + '-' + index2} 
                  id={ this.state.vertices.indexOf(adjacentVertex.vertex) } 
                  start={vertex} 
                  end={adjacentVertex.vertex} 
                />
              )
            )
          )
        )}
      </g>
    );
  }
}

export default Graph;
