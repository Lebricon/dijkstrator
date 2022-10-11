
/**
 * Dijkstra Algorith service, find the shortest path
 */
class DijkstraService {

  distances = [];
  parents = [];  
  weights = [];  
  visited = new Set();

  /**
   * Dijkstra algorithm inialisation
   * @param {*} graph 
   * @param {*} startVertex 
   */
  initialize = (graph, startVertex) => {
    graph.vertices.forEach( (vertex) => {
      this.distances[vertex.id] = Infinity;
      this.parents[vertex.id] = null;
    });
    this.distances[startVertex.id] = 0;
  }

  /**
   * @returns The closest vertex ID
   */
  findClosestVertex = () => {
    let minDistance = Infinity, 
        closestVertex = null;

    this.distances.forEach( (distance, vertexId) => {
      if (distance < minDistance && !this.visited.has(vertexId)) {
          minDistance = distance;
          closestVertex = vertexId;
      }
    });

    return closestVertex;
  }

  /**
   * Compute Dijkstra shortest path algorithm
   * @param {*} graph 
   */
  compute = (graph, startVertex, endVertex) => {

    let orderedShortestPath = [];

    if(startVertex !== undefined && endVertex !== undefined) {
      this.initialize(graph, startVertex);
  
      let currentVertex = this.findClosestVertex();
      
      while (currentVertex !== null) {
  
          let distance = this.distances[currentVertex];
          let adjacentVertices = graph.vertices[currentVertex].adjacentVertices;
          
          adjacentVertices.forEach( (adjacentVertex) => {
  
            let newDistance = distance + adjacentVertex.weight;
            if (this.distances[adjacentVertex.vertex.id] > newDistance) {
                this.distances[adjacentVertex.vertex.id] = newDistance;
                this.parents[adjacentVertex.vertex.id] = currentVertex;
                this.weights[adjacentVertex.vertex.id] = adjacentVertex.weight;
            }
          });
  
          this.visited.add(currentVertex);
          currentVertex = this.findClosestVertex();
      }
  
      if(this.parents.length > 1) {
        let currentParentId = endVertex.id;
        while( currentParentId !== startVertex.id && graph.vertices[currentParentId] !== undefined) {
          let vertex = graph.vertices[currentParentId];
            vertex.weight = this.weights[currentParentId];
            orderedShortestPath.unshift(vertex);
            
            currentParentId = this.parents[currentParentId];
        }
        
        orderedShortestPath.unshift(graph.vertices[startVertex.id]);
      }
    }
    
    return orderedShortestPath;
  }
}

export default DijkstraService;
