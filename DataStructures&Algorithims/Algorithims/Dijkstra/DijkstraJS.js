import Graph from './GraphJS.js'

class Dijkstra extends Graph
{
    constructor()
    {
        super();
    }

    dijkstra(startVertexData, endVertexData)
    {
        const startVertex = this.vertexData.indexOf(startVertexData);
        const endVertex = this.vertexData.indexOf(endVertexData);
        let distances = Array(this.size).fill(Infinity);
        let predecessors = Array(this.size).fill(null);
        distances[startVertex] = 0;
        let visited = Array(this.size).fill(false);

        for(let _ = 0; _ < this.size; _++)
        {
            let minDistance = Infinity;
            let u = 0;
            for(let i = 0; i < this.size; i++)
            {
                if(!visited[i] && distances[i] < minDistance)
                {
                    minDistance = distances[i];
                    u = i;
                }
            }

            if(u == null || u == endVertex)
            {
                console.log(`Breaking out of loop. Current vertex ${this.vertexData[u]}`);
                console.log(`Distances: ${distances}`);
                break;
            }

            visited[u] = true;
            console.log(`Visited vertex: ${this.vertexData[u]}`);

            for(let v = 0; v < this.size; v++)
            {
                if(this.adjMatrix[u][v] !== 0 && !visited[v])
                {
                    let alt = distances[u] + this.adjMatrix[u][v];
                    if(alt < distances[v])
                    {
                        distances[v] = alt;
                        predecessors[v] = u;
                    }
                }
            }
        }
        return {distances, path : this.getPath(predecessors, startVertexData, endVertexData)}
    }

    getPath(predecessors, startVertex, endVertex)
    {
        let path = [];
        let current = this.vertexData.indexOf(endVertex);
        while(current !== null)
        {
            path.splice(0,0,this.vertexData[current]);
            current = predecessors[current];
            if(current == this.vertexData.indexOf(startVertex))
            {
                path.splice(0,0,startVertex);
                break;
            }
        }
        return path.join('->');
    }
}

