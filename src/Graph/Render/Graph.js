import React from 'react';
import Edge from './Edge';
import EdgeArrow from './EdgeArrow';
import Vertex from './Vertex'
import ShortestPathDots from './ShortestPathDots';
import ShortestPathEdges from './ShortestPathEdges';

class Graph extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      vertices: props.vertices,
      dragCount: this.props.dragCount,
      shortestPath: this.props.shortestPath,
    };
  }

  renderShortestPathDots = () => {
    if(this.state.shortestPath.length > 0) {
      return (
        <ShortestPathDots key={ 'shortest-path-dots-' + this.state.dragCount} shortestPath={ this.state.shortestPath } dragCount={this.state.dragCount} />
      )
    }
  }

  renderShortestPathEdges = () => {
    if(this.state.shortestPath.length > 0) {
      return (
        <ShortestPathEdges key={ 'shortest-path-edges-' + this.state.dragCount} shortestPath={ this.state.shortestPath } dragCount={this.state.dragCount} />
      )
    }
  }

  render() {
    return (
      <g>
        { this.state.vertices.map( (vertex, index) => (
              vertex.adjacentVertices.map( (adjacentVertex, index2) => (
                <Edge 
                  key={'edge-' + this.state.dragCount + '-' + index2} 
                  shortestPath={ this.state.shortestPath }
                  start={vertex} 
                  end={adjacentVertex.vertex} 
                  weight={adjacentVertex.weight}
                />
              )
            )
          )
        )}
        { this.state.vertices.map( (vertex, index) => (
              vertex.adjacentVertices.map( (adjacentVertex, index2) => (
                <Edge 
                  key={'edge-' + this.state.dragCount + '-' + index2} 
                  shortestPath={ this.state.shortestPath }
                  start={vertex} 
                  end={adjacentVertex.vertex} 
                  weight={adjacentVertex.weight}
                />
              )
            )
          )
        )}
        { this.state.vertices.map( (vertex, index) => <Vertex key={'vertex-' + this.state.dragCount + '-' + index} id={index} vertex={vertex} /> ) }
        { this.renderShortestPathDots() }
        { this.state.vertices.map( (vertex, index) => (
              vertex.adjacentVertices.map( (adjacentVertex, index2) => (
                <EdgeArrow 
                  key={'edge-arrow-' + this.state.dragCount + '-' + index2} 
                  id={ this.state.vertices.indexOf(adjacentVertex.vertex) } 
                  start={vertex} 
                  end={adjacentVertex.vertex} 
                  color="#25ff9a"
                />
              )
            )
          )
        )}
        { this.renderShortestPathEdges() }
      </g>
    );
  }
}

export default Graph;
