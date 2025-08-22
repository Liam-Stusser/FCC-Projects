class Graph
{
    constructor(size)
    {
        this.size = size;
        this.edges = [];
        this.vertexData = Array(size).fill('');
    }

    addEdge(u, v, weight)
    {
        if(0 <= this.size && 0 <= v && v < this.size)
        {
            this.edges.push([u,v,weight]);
        }
    }

    addVertexData(vertex, data)
    {
        if(0 <= vertex && vertex < this.size)
        {
            this.vertexData[vertex] = data;
        }
    }

    find(parent, i)
    {
        if(parent[i] == i)
            return i;
        return this.find(parent, parent[i]);
    }

    union(parent, rank, x, y)
    {
        let xRoot = this.find(parent, x);
        let yRoot = this.find(parent, y);
        if(rank[xRoot] < rank[yRoot])
            parent[xRoot] = yRoot;
        else if(rank[xRoot] > rank[yRoot])
            parent[yRoot] = xRoot;
        else
        {
            parent[yRoot] = xRoot;
            rank[xRoot] += 1;
        }
    }

    kruskalsAlgorithm()
    {
        let result = [];
        let i = 0;

        this.edges = this.edges.sort((a,b) => a[2] - b[2]);

        let parent = Array.from({length: this.size}, (_,i) => i);
        let rank = Array(this.size).fill(0);

        while(i < this.edges.length)
        {
            [u, v, weight] = this.edges[i];
            ++i;

            let x = this.find(parent, u);
            let y = this.find(parent, v);
            if(x != y)
            {
                result.push([u,v,weight]);
                this.union(parent,rank,x,y);
            }
        }

        console.log("Edge \tWeight");
        result.forEach(([u,v,weight]) => console.log(`${this.vertexData[u]}-${this.vertexData[v]} \t${weight}`))
    }
}