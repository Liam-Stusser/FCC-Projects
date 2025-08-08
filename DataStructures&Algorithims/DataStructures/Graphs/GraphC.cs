public class Graph
{
    public readonly int size;
    public int?[,] adjMatrix;
    public string[] vertexData;
    public int[] parent;

    public Graph(int size)
    {
        this.size = size;
        adjMatrix = new int?[size, size];//C# arrays default to fill with null
        vertexData = Enumerable.Repeat("", size).ToArray();//Normally I like to use <TValue> to make the application universal but to 
        parent = Enumerable.Range(0, size).ToArray();//keep with the example of using letters for nodes we will just make data a string here
    }

    public void AddEdge(int u, int v, int weight)
    {
        if (u >= 0 && u < size && v >= 0 && v < size)
            adjMatrix[u, v] = weight;
    }

    public void AddVertexData(int vertex, string data)
    {
        if (vertex >= 0 && vertex < size)
            vertexData[vertex] = data;
    }

    public int Find(int i)
    {
        if (parent[i] != i)
            parent[i] = Find(parent[i]);
        return parent[i];
    }

    public void PrintGraph()
    {
        Console.WriteLine("Adjacency Matrix");
        for (int i = 0; i < adjMatrix.GetLength(0); i++)
        {
            string rowStr = "";
            for (int j = 0; j < adjMatrix.GetLength(1); j++)
            {
                string value = adjMatrix[i, j] == null ? "0" : adjMatrix[i, j]!.ToString();
                if (j > 0)
                    rowStr += " ";

                rowStr += value;
            }
            Console.WriteLine(rowStr);
        }

        Console.WriteLine("\nVertex Data");
        for (int v = 0; v < size; v++)
            Console.WriteLine($"Vertex {v}: {vertexData[v]}");
    }

    private void DfsUtil(int v, bool[] visited)
    {
        visited[v] = true;
        Console.Write(vertexData[v]);

        for (int i = 0; i < size; i++)
        {
            if (adjMatrix[v, i] != null && !visited[i])
                DfsUtil(i, visited);
        }
    }

    private bool CyclicUtil(int v, bool[] visited, bool[] recStack)
    {
        visited[v] = true;
        recStack[v] = true;
        Console.WriteLine($"Current vertex: {vertexData[v]}");

        for (int i = 0; i < size; i++)
        {
            if (adjMatrix[v, i] != null)
            {
                if (!visited[i])
                {
                    if (CyclicUtil(i, visited, recStack))
                        return true;
                    else if (recStack[i])
                        return true;
                }
            }
        }

        recStack[v] = false;
        return false;
    }

    public bool DfsCyclic()
    {
        bool[] visited = Enumerable.Repeat(false, size).ToArray();
        bool[] recStack = Enumerable.Repeat(false, size).ToArray();
        for (int i = 0; i < size; i++)
        {
            if (!visited[i])
            {
                Console.WriteLine();
                if (CyclicUtil(i, visited, recStack))
                    return true;
            }

        }
        return false;
    }

    public void Dfs(string startVertexData)
    {
        bool[] visited = Enumerable.Repeat(false, size).ToArray();
        int startVertex = Array.IndexOf(vertexData, startVertexData);
        DfsUtil(startVertex, visited);
    }

    public void Bfs(string startVertexData)
    {
        Queue<int> queue = new Queue<int>();
        queue.Enqueue(Array.IndexOf(vertexData, startVertexData));
        bool[] visited = Enumerable.Repeat(false, size).ToArray();
        visited[queue.Peek()] = true;

        while (queue.Count > 0)
        {
            int currentVertex = queue.Dequeue();
            Console.WriteLine(vertexData[currentVertex]);

            for (int i = 0; i < size; i++)
            {
                if (adjMatrix[currentVertex, i] != null && !visited[i])
                {
                    queue.Enqueue(i);
                    visited[i] = true;
                }
            }
        }
    }

    //undirected graph methods
    public void Union(int x, int y)
    {
        int xRoot = Find(x);
        int yRoot = Find(y);
        Console.WriteLine($"Union: {vertexData[x]} + {vertexData[y]}");
        parent[xRoot] = yRoot;
        Console.WriteLine(string.Join(", ", parent) + "\n");
    }

    public bool UnionCyclic()
    {
        for (int i = 0; i < size; i++)
        {
            for (int j = 0; j < size; j++)
            {
                if (adjMatrix[i, j] != null)
                {
                    int x = Find(i);
                    int y = Find(j);
                    if (x == y)
                        return true;
                    Union(x, y);
                }

            }
        }
        return false;
    }
}