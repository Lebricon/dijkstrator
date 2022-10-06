import { Box, Stack } from '@mui/system';
import React from 'react';
import MouseIcon from '@mui/icons-material/Mouse';
import TimelineIcon from '@mui/icons-material/Timeline';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

class SvgLegend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Box className="legendBloc">
        <Stack direction="row" alignItems="center" spacing={1} justifyContent="left" m={1}>
          <MouseIcon fontSize='small' />
          <Box>
            Click to add vertex
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} justifyContent="left" m={1}>
          <TimelineIcon fontSize='small' />
          <Box>
          Drag vertex onto another one to connect them
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} justifyContent="left" m={1}>
          <MultipleStopIcon fontSize='small' />
          <Box>
            [Ctrl] + Drag to move vertices
          </Box>
        </Stack>
      </Box>
    );
  }
}

export default SvgLegend;
