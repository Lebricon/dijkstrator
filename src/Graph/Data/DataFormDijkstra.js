import React from 'react';
import { Paper, Stack, Box, Chip, Grid } from '@mui/material'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

class DataFormDijkstra extends React.Component {

  idSelectStart = 'dijkstra-input-start';
  idSelectEnd = 'dijkstra-input-end';

  vertices = [];

  constructor(props) {
    super(props);

    this.state = {
      handleChangeStart: this.props.handleChangeStart,
      handleChangeEnd: this.props.handleChangeEnd,
      graphs: this.props.graphs,
    };
  }

  render() {
    return (
      <Paper sx={{ width: 1, p: 2, m: 1 }} elevation={2}>
        <Paper sx={{ width: 1, p: 2 }} elevation={3}>
          <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
            <SettingsSuggestIcon />
            <Box>Dijkstra Shortest path</Box>
          </Stack>
        </Paper>

        <Grid container marginTop={2} w={1} spacing={1}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel className={'dijkstra-label'}>Start vertex</InputLabel>
              <Select
                key={this.idSelectStart}
                className={'dijkstra-input'}
                label="Start vertex"
                defaultValue=""
                onChange={ this.state.handleChangeStart }
              >
                {this.state.graphs[0].vertices.map((vertex) =>
                  <MenuItem key={'start-option-' + vertex.id} value={vertex.id}>{vertex.name}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel className={'dijkstra-label'}>End vertex</InputLabel>
              <Select
                key={this.idSelectEnd}
                className={'dijkstra-input'}
                label="End vertex"
                defaultValue=""
                onChange={ this.state.handleChangeEnd }
              >
                {this.state.graphs[0].vertices.map((vertex) =>
                  <MenuItem key={'end-option-' + vertex.id} value={vertex.id}>{vertex.name}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
      </Paper>
    );
  }
}

export default DataFormDijkstra;
