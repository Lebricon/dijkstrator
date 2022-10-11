import React from 'react';
import { Paper, Stack, Box, Chip, Grid } from '@mui/material'
import AdjustIcon from '@mui/icons-material/Adjust';
import RouteIcon from '@mui/icons-material/Route';
import TextField from '@mui/material/TextField';

class DataVertex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vertex: this.props.vertex,
      handleWeightChange: this.props.handleWeightChange,
    };
  }

  render() {
    return (
      <Paper sx={{ width: 1, p: 2, m:1 }} elevation={2}>

        <Stack direction="row" alignItems="center" spacing={1} justifyContent="left">
          <AdjustIcon sx={{ color:'#25bcff' }} />
          <Box width="100%">
            <span style={{ color:'#25bcff' }}>
              Vertex : { this.state.vertex.name }
            </span>
            <Chip label={ 'x : ' + this.state.vertex.posX } variant="outlined" sx={{ marginLeft:"10px" }}/>
            <Chip label={ 'y : ' + this.state.vertex.posY } variant="outlined" sx={{ marginLeft:"10px" }}/>
          </Box>
        </Stack>

        <Grid container marginTop={2} w={1}>

          <Grid item xs={4}>
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="left" marginTop={1} w={1}>
              <RouteIcon sx={{ color:'#25ff9a' }} />
              <span  style={{ color:'#25ff9a', paddingLeft:'10px' }}>Adjacent vertices : </span>
            </Stack>
          </Grid>

          <Grid item xs={8}>
            <Box sx={{ color:'#25ff9a' }}>
              { Object.entries(this.state.vertex.adjacentVertices).map(([index, adjacentVertex]) => (
                  <Paper key={index} sx={{ width:'120px', display:'inline-block', margin:'2px' }}>
                    <Stack direction="row" alignItems="center" spacing={1}  m={1}>
                      <Chip label={ adjacentVertex.vertex.name } />
                      <TextField
                        key={ 'weight-input-' + index}
                        id={ 'weight-input-' + index}
                        className={ 'weight-input'}
                        label="weight"
                        defaultValue={ adjacentVertex.weight }
                        size="small"
                        variant='outlined'
                        onChange={ event => this.state.handleWeightChange(event, this.state.vertex.id, index) }
                        onMouseOver={ event => { event.target.focus(); } }
                      />
                    </Stack>
                </Paper>
              ))}
            </Box>
          </Grid>

        </Grid>

      </Paper>
    );
  }
}

export default DataVertex;
