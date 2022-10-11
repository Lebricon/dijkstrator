import React from 'react';

class Edge extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      start: props.start,
      end: props.end,
      weight: props.weight,
      shortestPath: this.props.shortestPath,
    };
  }

  pathString = () => {
    return 'M' + this.state.start.posX  + ' ' + this.state.start.posY +
      ' L' + this.state.end.posX + ' ' + this.state.end.posY + 'z'
    ;
  }

  pathWeightPosition = () => {
    let halfDeltaTextX = Math.abs(this.state.start.posX - this.state.end.posX)/2;
    let halfDeltaTextY = Math.abs(this.state.start.posY - this.state.end.posY)/2;
    let textPostionMinX = Math.min(this.state.start.posX, this.state.end.posX);
    let textPostionMinY = Math.min(this.state.start.posY, this.state.end.posY);

    return {
      x:textPostionMinX + halfDeltaTextX,
      y:textPostionMinY + halfDeltaTextY
    };
  }

  render() {
    let pathWeightPosition = this.pathWeightPosition();
    let weightRadius = 14;
    return (
      <g> 
        <path d={ this.pathString() } strokeWidth={2} stroke="#25ff9a" strokeLinecap='butt'></path>
        <circle cx={ pathWeightPosition.x } cy={ pathWeightPosition.y } r={weightRadius} fill="#171717" stroke="#25ff9a" strokeWidth={2}/>
        <text 
          textAnchor='middle'
          x={ pathWeightPosition.x } 
          y={ pathWeightPosition.y + 4 }
          className="weightText"
        >
          { this.state.weight }
        </text>
      </g>
    );
  }
}

export default Edge;


