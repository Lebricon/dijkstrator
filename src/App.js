import React from 'react'
import Grid from '@mui/material/Grid'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import _ from 'lodash';

import SvgBoard from './Graph/Render/SvgBoard'
import DataHeader from './Graph/Data/DataHeader'
import DataVerticesList from './Graph/Data/DataVerticesList'
import SvgLegend from './Graph/Render/SvgLegend'
import DataFormDijkstra from './Graph/Data/DataFormDijkstra'
import DijkstraService from './Graph/Service/DijkstraService'
import DataControls from './Graph/Data/DataControls'

/**
 * Darkmode theme + overriding scrollbars
 */
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    lightBlue: createColor('#9bc7ff'),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
});

class App extends React.Component {

  firstNameChar = 'A';
  graphVersion = 1;
  linking = false;
  dragging = false;

  constructor(props) {
    super(props);

    this.state = {
      firstNameChar: this.firstNameChar,
      graphs: [{
        vertices: [],
      }],
      linking: null,
      draggedTarget: null,
      draggedCoordX: null,
      draggedCoordY: null,
      dragCount: 0,
      linksCount: 0,
      shortestPath: [],
      valueSelectStart:'',
      valueSelectEnd:'',
    };
  }

  /**
   * Reset all graphs & vertices
   */
  resetVertices = () => {
    this.setState({
      firstNameChar: 'A',
      graphs: [{
        vertices: [],
      }],
      dragCount: this.state.dragCount+1,
      linksCount: this.state.linksCount+1,
      linking: null,
      draggedTarget: null,
      draggedCoordX: null,
      draggedCoordY: null,
      shortestPath: [],
      valueSelectStart:'',
      valueSelectEnd:'',
    });
  }

  /**
   * Reset all graphs & vertices
   */
  resetDijkstra = () => {
    this.setState({
      shortestPath: [],
      valueSelectStart:'',
      valueSelectEnd:'',
      linksCount: this.state.linksCount+1,
      dragCount: this.state.dragCount+1,
    });
  }

  /**
   * Add a new vertex to graph
   * @param {*} event 
   * @returns 
   */
  addVertex = (event) => {
    if( 
      event.currentTarget !== event.target || 
      this.dragging === true ||
      this.linking === true
    ) { 
      return; 
    }
    
    let graphs = this.state.graphs.slice()
    let currentGraph = graphs[0]

    currentGraph.vertices.push({
      adjacentVertices: [],
      posX: event.clientX,
      posY: event.clientY,
      name: this.state.firstNameChar,
      id: currentGraph.vertices.length,
      shorterPath: false,
    })

    graphs[0] = currentGraph

    this.setState({
      firstNameChar: this.incrementChar(this.state.firstNameChar),
      graphs: graphs,
        dragCount: this.state.dragCount+1,
    })
  }
  
  /**
   * Increment vertices name like MS Excel column
   * @param {string} c 
   * @returns 
   */
  incrementChar = (c) => {
    let lastChar = String.fromCharCode(c.charCodeAt(c.length - 1));
    if(lastChar === 'Z') {
      return c + 'A';
    }
    
    let newChar = String.fromCharCode(c.charCodeAt(c.length - 1) + 1);
    return c.substring(0, c.length - 1) + newChar;
  }
  
  /**
   * Drag&Drop vertex to move it
   * @param {*} event 
   * @param {*} vertex 
   */
  dragVertex = (event, vertex) => {
    let graphs = this.state.graphs.slice();
    let id = parseInt(vertex.getAttribute('vertex-id'));
    let currentVertex = graphs[0].vertices[id];
    let updatedVertex = {
      adjacentVertices: currentVertex.adjacentVertices,
      posX: event.clientX,
      posY: event.clientY,
      name: currentVertex.name,
      id: currentVertex.id,
      weight: currentVertex.weight,
    };
    
    // Update current vertex when it's in adjacent list of another one
    let updatedVertices = [];
    this.state.graphs[0].vertices.forEach( (vertex, index) => {
      if(index === id){
        vertex = updatedVertex;
      }

      let updatedAdjacentVertices = [];
      vertex.adjacentVertices.forEach( (adjacentVertex) => {
        if(adjacentVertex.vertex.id === id){
          updatedAdjacentVertices.push({
            vertex:updatedVertex, 
            weight:adjacentVertex.weight,
          });
        } else {
          updatedAdjacentVertices.push(adjacentVertex);
        }
      });
      vertex.adjacentVertices = updatedAdjacentVertices;
      updatedVertices.push(vertex);
    });

    let shortestPathVertices = [];
    this.state.shortestPath.forEach( (shortestPathVertex) => {
      if(shortestPathVertex.id === id){
        shortestPathVertices.push(updatedVertex);
      } else {
        shortestPathVertices.push(shortestPathVertex);
      }
    });

    graphs[0].vertices = updatedVertices;

    this.setState({
      graphs: graphs,
      dragCount: this.state.dragCount+1,
      shortestPath: shortestPathVertices,
    })
  }

  /**
   * Connect 2 vertices if they aint already connected
   * @param {*} startId 
   * @param {*} endId 
   */
  connectVertices = (startId, endId) => {
    let graphs = this.state.graphs.slice()
    let currentGraph = graphs[0]

    let alreadyExist = currentGraph.vertices[startId].adjacentVertices.filter(
      v => v.name === currentGraph.vertices[endId].name
    ).length > 0
    if(alreadyExist === false){
      currentGraph.vertices[startId].adjacentVertices.push({
        vertex:currentGraph.vertices[endId],
        weight:1,
      })
      
      graphs[0] = currentGraph
  
      this.setState({
        graphs: graphs,
        dragCount: this.state.dragCount+1,
        linksCount: this.state.linksCount+1,
      })
    }
  }

  /**
   * Handle mouse move event on SVG board
   *  - Dragging
   *  - Connecting
   * @param {*} event 
   */
  handleMouseMove = (event) => {
    if(this.dragging === true){
      this.setState({
        draggedCoordX: event.clientX,
        draggedCoordY: event.clientY,
        dragCount: this.state.dragCount+1,
      })
    }

    if(this.linking === true){
      this.dragVertex(event, this.state.draggedTarget)
    }
  }

  /**
   * Handle mouse up event on SVG board
   *  - Adding new vertex
   *  - End vertices connection
   *  - Stop dragging vertex
   * @param {*} event 
   */
  handleMouseUp = (event) => {
    if(this.dragging === false && this.linking === false){
      this.addVertex(event)
    } else if(this.dragging === true && this.state.draggedTarget!==null ) {
      if(event.target.className.baseVal.match(/\bvertexDrop\b/) !== null){
        this.connectVertices(
          this.state.draggedTarget.getAttribute('vertex-id'),
          event.target.getAttribute('vertex-id')
        )
      }
    }

    this.dragging = false
    this.linking = false
    
    this.setState({
      linking: this.linking,
      draggedTarget: null,
      draggedCoordX: null,
      draggedCoordY: null,
      dragCount: this.state.dragCount+1,
    })
  }

  /**
   * Handle mouse up event on SVG board
   *  - Start connecting vertices
   *  - Start dragging vertex
   * @param {*} event 
   */
  handleMouseDown = (event) => {
    if(event.target.className.baseVal.match(/\bvertexDrag\b/) !== null){

      let target = event.target;
      if(event.target.className.baseVal.match(/\bedgeArrow\b/) !== null){
        let targetId = event.target.getAttribute('vertex-id')
        target = document.getElementById('vertex-' + targetId)
      }

      if(event.ctrlKey === false){
        this.dragging = true
      } else {
        this.linking = true
      }

      this.setState({
        linking: this.linking,
        draggedTarget: target,
        draggedCoordX: event.clientX,
        draggedCoordY: event.clientY,
      })
    }
  }

  /**
   * Handle weight change to update SVG weight text 
   * (500ms debounced event with lodash to avoid spamming)
   * @param {*} event KeyUp event triggered by Edge's weight textfield
   * @param {*} vertexId Owner vertex of this Edge
   * @param {*} adjacentVertexId Pointed vertex of this Edge
   */
  handleWeightChange = _.debounce( (event, vertexId, adjacentVertexId) => {
      let updatedGraps = this.state.graphs.slice();
      let value = String(event.target.value).replace(/\D/g,'');
      value = value === '' ? 0 : parseInt(value.replace(/\D/g,''));
      updatedGraps[0].vertices[vertexId].adjacentVertices[adjacentVertexId].weight = value;

      this.setState({
        graphs: updatedGraps, 
        dragCount: this.state.dragCount+1,
        shortestPath: [],
        linksCount: this.state.linksCount+1,
        valueSelectStart:'',
        valueSelectEnd:'',
      });
    }
  , 500);

  findShortestPath = (startId, endId) => {
    let dijkstraService = new DijkstraService();
    let shortestPath = dijkstraService.compute(
      this.state.graphs[0], 
      this.state.graphs[0].vertices[startId],
      this.state.graphs[0].vertices[endId]
    );
    this.setState({
      shortestPath: shortestPath,
      dragCount: this.state.dragCount+1,
    })
  }

  handleChangeStartDijkstra = (event) => {
    let values = {
      startId: event.target.value,
      endId: this.state.valueSelectEnd,
    };

    this.setState({
      valueSelectStart: event.target.value,
    })

    this.findShortestPath(
      values.startId,
      values.endId
    );
  }

  handleChangeEndDijkstra = (event) => {
    let values = {
      startId: this.state.valueSelectStart,
      endId: event.target.value,
    };

    this.setState({
      valueSelectEnd: event.target.value,
    })

    this.findShortestPath(
      values.startId,
      values.endId
    );
  }

  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Grid container 
          className='graphGlobalContainer'
          spacing={0}
          sx={{ p: 0, m: 0 }}
        >
          <Grid item height={1} xs={8}>
            <SvgLegend />
            <SvgBoard 
              key={this.state.dragCount} 
              graphs={this.state.graphs} 
              linking={this.state.linking} 
              draggedTarget={this.state.draggedTarget} 
              draggedCoordX={this.state.draggedCoordX} 
              draggedCoordY={this.state.draggedCoordY} 
              dragCount={this.state.dragCount} 
              shortestPath={this.state.shortestPath}
              handleMouseDown={ (e) => { this.handleMouseDown(e) } } 
              handleMouseMove={ (e) => { this.handleMouseMove(e) } } 
              handleMouseUp={ (e) => { this.handleMouseUp(e) } } 
            />
          </Grid>

          <Grid className='graphDataWrapper' item height={1} xs={4}>
            <Box sx={{ height: 1, p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', boxShadow:2 }}>
              <DataHeader />

              <DataVerticesList 
                key={ 'data-content-' + this.state.dragCount} 
                dragCount={this.state.dragCount} 
                graphs={ this.state.graphs }
                handleWeightChange={this.handleWeightChange}
              />
              <DataFormDijkstra 
                key={ 'data-form-dijkstra-' + this.state.linksCount} 
                dragCount={this.state.linksCount} 
                graphs={ this.state.graphs }
                handleChangeStart={this.handleChangeStartDijkstra}
                handleChangeEnd={this.handleChangeEndDijkstra}
              />

              <DataControls resetDijkstra={ this.resetDijkstra } resetVertices={ this.resetVertices } />
            </Box>
          </Grid>

        </Grid>

      </ThemeProvider>
    )
  }
}

export default App;
