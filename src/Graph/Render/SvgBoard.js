import React from 'react';
import Graph from './Graph'
import SvgBackgroundPattern from './SvgBackgroundPattern';

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
      shortestPath: this.props.shortestPath,
    };
  }

  renderDragLine = () => {
    if(this.state.draggedTarget !== null && this.state.linking !== true) {

      // Offset 1px from real target to prevent onMouseDown to target the drag line
      let offsetX = this.state.draggedTarget.cx.baseVal.value > this.state.draggedCoordX ? 1 : -1
      let offsetY = this.state.draggedTarget.cy.baseVal.value > this.state.draggedCoordY ? 1 : -1

      return (
        <g>
          <path d={ 
            'M' + this.state.draggedTarget.cx.baseVal.value + ' ' + this.state.draggedTarget.cy.baseVal.value +
            ' L' + (this.state.draggedCoordX + offsetX) + ' ' + (this.state.draggedCoordY + offsetY)
            }
            strokeWidth={2}
            stroke="#FFF"
          />
          <circle 
            fillOpacity={1} 
            stroke="#FFFFFF" 
            strokeWidth="1" 
            cx={ this.state.draggedTarget.cx.baseVal.value } 
            cy={ this.state.draggedTarget.cy.baseVal.value } 
            r={ 3 } 
          />
        </g>
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
        <SvgBackgroundPattern
          handleMouseDown={ (e) => { this.props.handleMouseDown(e) } }
          handleMouseMove={ (e) => { this.props.handleMouseMove(e) } }
          handleMouseUp={ (e) => { this.props.handleMouseUp(e) } }
        />
        { this.state.graphs.map( (graph) => 
          <Graph 
            key={ 'graph-' + this.state.dragCount} 
            shortestPath={ this.state.shortestPath } 
            dragCount={this.state.dragCount} 
            vertices={graph.vertices}
          /> 
        )}
        { this.renderDragLine() }
      </svg>
    );
  }
}

export default SvgBoard;
