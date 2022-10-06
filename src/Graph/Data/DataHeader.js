import React from 'react';
import { Paper, Stack, Box } from '@mui/material'
import HubIcon from '@mui/icons-material/Hub';

class DataHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Paper sx={{ width: 1, p: 2 }} elevation={3}>
        <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
          <HubIcon />
          <Box>GRAPH DATAS</Box>
        </Stack>
      </Paper>
    );
  }
}

export default DataHeader;
