import Graph from './GraphJS.js'

class BellmanFord extends Graph
{
    constructor()
    {
        super();
    }

    bellmanFord(startVertexData)
    {
        const startVertex = this.vertexData.indexOf(startVertexData);
        let distances = Array(this.size).fill(Infinity);
        let predecessors = Array(this.size).fill(null);
        distances[startVertex] = 0;

        for(let _ = 0; _ < this.size - 1; _++)
        {
            for(let u = 0; u < this.size; u++)
            {
                for(let v = 0; v < this.size; v++)
                {
                    if(this.adjMatrix[u][v] !== 0)
                    {
                        if(distances[u] + this.adjMatrix[u][v] < distances[v])
                        {
                            distances[v] = distances[u] + this.adjMatrix[u][v];
                            predecessors[v] = u;
                            console.log(`Relaxing edge ${this.vertexData[u]}->${this.vertexData[v]}, Updated distance to ${this.vertexData[v]}: ${distances[v]}`);
                        }
                    }
                }
            }

            // Negative cycle detection
            for(let u = 0; u < this.size; u++)
            {
                for(let v = 0; v < this.size; v++)
                {
                    if(this.adjMatrix[u][v] !== 0)
                    {
                        if(distances[u] + this.adjMatrix[u][v] < distances[v])
                        {
                            return [true, null, null]; // Indicate there is a negative cycle
                        }
                    }
                }
            }
            return [false, distances, predecessors]; // No negative cycle found
        }
    }

    getPath(predecessors, startVertex, endVertex)
    {
        let path = [];
        let current = this.vertexData.indexOf(endVertex);
        while(current !== null && current !== undefined)
        {
            path.splice(0, 0, this.vertexData[current]);
            current = predecessors[current];
            if(current == this.vertexData.indexOf(startVertex))
            {
                path.splice(0, 0, startVertex);
                break;
            }
        }
        return path.join('->');
    }
}

export default BellmanFord;