import React from 'react';
import { Paper, Stack, Box } from '@mui/material'
import DeviceHubSharpIcon from '@mui/icons-material/DeviceHubSharp';

class DataHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Paper sx={{ width: 1, p: 2 }} elevation={3}>
        <Stack sx={{ marginBottom:2 }} direction="row" alignItems="center" spacing={1} justifyContent="center">
          <DeviceHubSharpIcon />
          <Box>DijkstraTor</Box>
        </Stack>
        <Box sx={{ fontSize:'smaller', textAlign:'center', color:'#9bc7ff' }}>Directed & Weighted graph editor to compute and display Dijkstra algorithm results</Box>
      </Paper>
    );
  }
}

export default DataHeader;
