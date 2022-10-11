import React from 'react';
import EdgeArrow from './EdgeArrow';

class ShortestPathEdges extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      radius: 6,
      shortestPath: this.props.shortestPath,
      dragCount: this.props.dragCount,
    };
  }

  pathString = (start, end) => {
    return 'M' + start.posX  + ' ' + start.posY +
      ' L' + end.posX + ' ' + end.posY + 'z'
    ;
  }

  pathWeightPosition = (start, end) => {
    let halfDeltaTextX = Math.abs(start.posX - end.posX)/2;
    let halfDeltaTextY = Math.abs(start.posY - end.posY)/2;

    let textPostionMinX = Math.min(start.posX, end.posX);
    let textPostionMinY = Math.min(start.posY, end.posY);

    return {
      x:textPostionMinX + halfDeltaTextX,
      y:textPostionMinY + halfDeltaTextY
    };
  }

  renderWeight = (vertex, pathWeightPosition) => {
    if(vertex.weight) {
      return(
        <text 
          textAnchor='middle'
          x={ pathWeightPosition.x } 
          y={ pathWeightPosition.y + 4 }
          className="weightTextDijkstra"
        >
          { vertex.weight }
        </text>
      );
    } else {
      return(
        <path 
          fill="#ffffff"
          transform={ 'translate(' + (pathWeightPosition.x - 8) + ' ' + (pathWeightPosition.y - 8) + ') scale(0.65)' }
          d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"
        ></path>
      );
    }
  }

  renderEdges = () => {
    let listEdges = [];
    let previousVertex = null;
    this.state.shortestPath.forEach( (vertex, index) => {
      if(previousVertex !== null){
        let pathWeightPosition = this.pathWeightPosition(previousVertex, vertex)
        listEdges.push(
          <g key={ 'edge-dijkstra-' + vertex.id + this.state.dragCount }>
            <path d={ this.pathString(previousVertex, vertex) } strokeWidth={3} stroke="#ff694f"></path>
            <circle cx={ pathWeightPosition.x } cy={ pathWeightPosition.y } r={10} fill="#ff694f" stroke="#ff694f" strokeWidth={2}/>
            { this.renderWeight(vertex, pathWeightPosition) }
            <EdgeArrow 
              key={'edge-arrow-' + vertex.id + this.state.dragCount}
              start={previousVertex} 
              end={vertex} 
              color="#ff694f"
              stroke="#992713"
              strokeLocation="outside"
            />
          </g>
        )
      }
      previousVertex = vertex;
    });

    return listEdges;
  }

  render() {
    return (
      <g className='shortestPathEdges'>
        { this.renderEdges() }
      </g>
    );
  }
}

export default ShortestPathEdges;
