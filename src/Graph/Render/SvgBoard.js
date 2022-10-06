import React from 'react';
import Graph from './Graph'

class SvgBoard extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      graphs: this.props.graphs,
      linking: this.props.linking,
      draggedTarget: this.props.draggedTarget,
      draggedCoordX: this.props.draggedCoordX,
      draggedCoordY: this.props.draggedCoordY,
      dragCount: this.props.dragCount,
    };
  }

  renderDragLine = () => {
    if(this.state.draggedTarget !== null && this.state.linking !== true) {

      // Offset 1px from real target to prevent onMouseDown to target the drag line
      let offsetX = this.state.draggedTarget.cx.baseVal.value > this.state.draggedCoordX ? 1 : -1
      let offsetY = this.state.draggedTarget.cy.baseVal.value > this.state.draggedCoordY ? 1 : -1

      return (
        <path d={ 
          'M' + this.state.draggedTarget.cx.baseVal.value + ' ' + this.state.draggedTarget.cy.baseVal.value +
          ' L' + (this.state.draggedCoordX + offsetX) + ' ' + (this.state.draggedCoordY + offsetY)
          }
          strokeWidth={2}
          stroke="#FFF"
        />
      )
    }
  }

  render() {
    return (
      <svg
        className="svgBoard"
        preserveAspectRatio="none"
        onMouseDown={ (e) => { this.props.handleMouseDown(e) } }
        onMouseMove={ (e) => { this.props.handleMouseMove(e) } }
        onMouseUp={ (e) => { this.props.handleMouseUp(e) } }
      >
        { this.state.graphs.map( (graph, index) => <Graph key={ 'graph-' + this.state.dragCount} dragCount={this.state.dragCount} vertices={graph.vertices}/> ) }
        { this.renderDragLine() }
      </svg>
    );
  }
}

export default SvgBoard;
