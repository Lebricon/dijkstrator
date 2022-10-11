import React from 'react';
import { Paper, Stack, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import LoopIcon from '@mui/icons-material/Loop';
import DeleteIcon from '@mui/icons-material/Delete';

class DataControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resetDijkstra: this.props.resetDijkstra,
      resetVertices: this.props.resetVertices,      
    };
  }

  render() {
    return (
      <Paper sx={{ width: 1, p: 1, m: 1 }} elevation={2}>
        <Grid container spacing={0}>
          <Grid item xs={12} p={1}>
            <Button fullWidth sx={{ paddingBottom:1 }} variant="outlined" color="lightBlue" onClick={ this.state.resetDijkstra }>
              <Stack direction="row" alignItems="center" spacing={1} justifyContent="left" marginTop={1}>
                <LoopIcon />
                Reset Dijkstra result
              </Stack>
            </Button>
          </Grid>
          <Grid item xs={12} p={1}>
            <Button fullWidth sx={{ paddingBottom:1 }} variant="outlined" color="error" onClick={ this.state.resetVertices }>
              <Stack direction="row" alignItems="center" spacing={1} justifyContent="left" marginTop={1}>
                <DeleteIcon />
                Reset Graph
              </Stack>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default DataControls;
