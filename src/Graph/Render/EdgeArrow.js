import React from 'react';

class EdgeArrow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      start: props.start,
      end: props.end,

      shapePoints: [
        {x:0, y:0},
        {x:-7.5, y:18.29},
        {x:-6.79, y:19},
        {x:0, y:16},
        {x:6.79, y:19},
        {x:7.5, y:18.29},
      ],
      rotateDegrees: 0,
    };
  }

  pathTransformations = () => {
    let shapePoints = this.state.shapePoints.slice();
    if(this.state.end !== null){
      // Translation
      shapePoints.map( (point) => {
        point.x += this.state.end.posX;
        point.y += this.state.end.posY;
        return point;
      })
    }
    
    return shapePoints;
  }

  pathRotation = () => {
    let rotation = 0;
    if(this.state.end !== null){

      let negative = -1;
      let opposite = negative*this.state.end.posX - negative*this.state.start.posX
      let adjacent = this.state.end.posY - this.state.start.posY

      rotation = Math.atan2(opposite, adjacent)
    }

    return ( rotation * (180/Math.PI) +180 ) + 'deg'
  }

  pathString = () => {
    let shapePoints = this.pathTransformations()
    return 'M' + shapePoints[0].x  +' '+ shapePoints[0].y +
      ' ' + shapePoints[1].x  +' '+ shapePoints[1].y +
      ' L' + shapePoints[2].x  +' '+ shapePoints[2].y +
      ' L' + shapePoints[3].x  +' '+ shapePoints[3].y +
      ' L' + shapePoints[4].x  +' '+ shapePoints[4].y +
      ' L' + shapePoints[5].x  +' '+ shapePoints[5].y + 'z'
    ;
  }

  pathStyles = () => {
    return {
      transformOrigin: this.state.end.posX + 'px ' + this.state.end.posY + 'px',
      transform: 'rotate(' + this.pathRotation() + ')',
    }
  }

  render() {
    return (
      <path 
        className='edgeArrow vertexDrop vertexDrag'
        vertex-id={this.props.id} 
        d={ this.pathString() } 
        fill="#25ff9a" 
        style={ this.pathStyles() }
      ></path>
    );
  }
}

export default EdgeArrow;


