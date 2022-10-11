import { Box, Stack } from '@mui/system';
import React from 'react';
import MouseIcon from '@mui/icons-material/Mouse';
import TimelineIcon from '@mui/icons-material/Timeline';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

class SvgLegend extends React.Component {
  render() {
    return (
      <Box className="legendBloc">
        <Stack direction="row" alignItems="center" spacing={1} justifyContent="left" m={1}>
          <MouseIcon fontSize='small' />
          <Box>
            Click to add a vertex
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
