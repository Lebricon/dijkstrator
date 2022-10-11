import React from 'react';

class SvgBackgroundPattern extends React.Component {
  render() {
    return (
      <g>
        <defs>
          <pattern id="smallGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#569fff" strokeWidth="1" />
          </pattern>
          <pattern id="grid" width="250" height="250" patternUnits="userSpaceOnUse">
            <rect width="250" height="250" fill="url(#smallGrid)" />
            <path d="M 250 0 L 0 0 0 250" fill="none" stroke="#569fff" strokeWidth="1.5" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" opacity={0.3}
          onMouseDown={ (e) => { this.props.handleMouseDown(e) } }
          onMouseMove={ (e) => { this.props.handleMouseMove(e) } }
          onMouseUp={ (e) => { this.props.handleMouseUp(e) } }
        />
      </g>
    );
  }
}

export default SvgBackgroundPattern;
