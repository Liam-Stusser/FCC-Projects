class Graph
{
    constructor(size)
    {
        this.size = size;
        this.adjMatrix = [];
        this.vertexData = Array(size).fill('');
        this.parent = Array.from({length:size}, (_,i) => i);

        for(let i = 0; i < size; i++)
        {
            this.adjMatrix[i] = Array(size).fill(null);
        }
    }

    addEdge(u, v, weight)
    {
        if (u >= 0 && u < this.size && v >= 0 && v < this.size)
            this.adjMatrix[u][v] = weight;
    }

    addVertexData(vertex, data)
    {
        if(vertex >= 0 && vertex < this.size)
            this.vertexData[vertex] = data;
    }

    find(i)
    {
        if(this.parent[i] !== i)
            this.parent[i] = this.find(this.parent[i]);
        return this.parent[i];
    }

    printGraph()
    {
        console.log("Adjacency Matrix");
        for(let i = 0; i < this.adjMatrix.length; i++)
        {
            const row = this.adjMatrix[i]
            const rowStr = row.map(x => x == null? '0': String(x)).join(' ');
            console.log(rowStr);
        }
        
        console.log("Vertex Data");
        this.vertexData.forEach((data, vertex) => {
            console.log(`Vertex ${vertex}: ${data}`);
        });
    }

    dfsUtil(v, visited)
    {
        visited[v] = true;
        console.log(this.vertexData[v])

        for(let i = 0; i < this.size; i++)
        {
            if(this.adjMatrix[v][i] != null && !visited[i])
                this.dfsUtil(i, visited);
        }
    }

    cyclicUtil(v, visited, recStack)
    {
        visited[v] = true;
        recStack[v] = true;
        console.log(`Current vertex:`,this.vertexData[v]);

        for(let i = 0; i < this.size; i++)
        {
            if(this.adjMatrix[v][i] != null)
            {
                if(!visited[i])
                {
                    if(this.cyclicUtil(i, visited, recStack))
                        return true;
                }
                else if(recStack[i])
                    return true;
            }
        }

        recStack[v] = false;
        return false;
    }

    dfsCyclic()
    {
        let visited = Array(this.size).fill(false);
        let recStack = Array(this.size).fill(false);
        for(let i = 0; i < this.size; i++)
        {
            if(!visited[i])
            {
                console.log("\n")
                if(this.cyclicUtil(i, visited, recStack))
                    return true;
            }
        }
        return false;
    }

    dfs(startVertexData)
    {
        let visited = Array(this.size).fill(false);
        let startVertex = this.vertexData.indexOf(startVertexData);
        this.dfsUtil(startVertex, visited);
    }

    bfs(startVertexData)
    {
        let queue = [this.vertexData.indexOf(startVertexData)];
        let visited = Array(this.size).fill(false);
        visited[queue[0]] = true;

        while(queue.length > 0)
        {
            let currentVertex = queue.shift()
            console.log(this.vertexData[currentVertex])

            for(let i = 0; i<this.size; i++)
            {
                if(this.adjMatrix[currentVertex][i] != null && !visited[i])
                {
                    queue.push(i);
                    visited[i] = true;
                }
            }
        }
    }

    //undirected graph methods
    union(x,y)
    {
        let xRoot = this.find(x);
        let yRoot = this.find(y);
        console.log(`Union ${this.vertexData[x]} + ${this.vertexData[y]}`);
        this.parent[xRoot] = yRoot;
        console.log(`${this.parent} \n`)
    }

    unionCyclic()
    {
        for(let i = 0; i < this.size; i++)
        {
            for(let j = 0; j < this.size; j++)
            {
                if(this.adjMatrix[i][j])
                {
                    let x = this.find(i);
                    let y = this.find(j);
                    if(x==y)
                        return true;
                    this.union(x,y);
                }
            }
        }
        return false;
    }
}