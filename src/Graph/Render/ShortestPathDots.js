import React from 'react';

class ShortestPathDots extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      radius: 6,
      shortestPath: this.props.shortestPath,
    };
  }

  pathString = (start, end) => {
    return 'M' + start.posX  + ' ' + start.posY +
      ' L' + end.posX + ' ' + end.posY + 'z'
    ;
  }

  render() {
    return (
      <g className='shortestPathDots'>
        { this.state.shortestPath.map( (vertex) => (
              <circle 
                key={ 'vertex-dijkstra-' + vertex.id + this.state.dragCount } 
                id={ 'vertex-dijkstra-' + vertex.id} 
                fillOpacity={1} 
                fill="#ff694f" 
                cx={ vertex.posX } 
                cy={ vertex.posY } 
                r={ this.state.radius } 
              />
            )
          )
        }
      </g>
    );
  }
}

export default ShortestPathDots;
