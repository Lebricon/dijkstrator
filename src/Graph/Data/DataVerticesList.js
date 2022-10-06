import React from 'react';
import { Box } from '@mui/material'
import DataVertex from './DataVertex';

class DataVerticesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graphs: this.props.graphs,
      dragCount: this.props.dragCount,
      handleWeightChange: this.props.handleWeightChange,
    };
  }

  render() {
    return (
        <Box sx={{ 
          height: 1, width:1, p: 1, display: 'flex', 
          flexDirection: 'column', justifyContent: 'flex-start', 
          alignItems: 'center', boxShadow:2, 
          overflowY:'auto', overflowX:'hidden' 
          }}
        >
          { this.state.graphs[0].vertices.map( (vertex, index) => 
            <DataVertex 
              key={ 'data-vertex-' + this.state.dragCount + '-' + index} 
              vertex={vertex}
              handleWeightChange={ this.state.handleWeightChange }
            />
          )}
        </Box>
    );
  }
}

export default DataVerticesList;
