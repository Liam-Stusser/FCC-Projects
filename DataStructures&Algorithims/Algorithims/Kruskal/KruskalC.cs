public class Graph
{
    private List<(int u, int v, int weight)> edges;
    private string[] vertexData;

    public Graph(int size)
    {
        this.size = size;
        edges = new List<(int, int, int)>();
        vertexData = Enumerable.Repeat("", size).ToArray();
    }

    public void AddEdge(int u, int v, int weight)
    {
        if (0 <= u && 0 <= v && v < this.size)
            edges.Add((u, v, weight));
    }

    public void AddVertexData(int vertex, string data)
    {
        if (0 <= vertex && vertex < this.size)
            vertexData[vertex] = data;
    }

    public int Find(int[] parent, int i)
    {
        if (parent[i] == i)
            return i;
        return Find(parent, parent[i]);
    }

    public void Union(int[] parent, int[] rank, int x, int y)
    {
        int xRoot = Find(parent, x);
        int yRoot = Find(parent, y);
        if (rank[xRoot] < rank[yRoot])
            parent[xRoot] = yRoot;
        else if (rank[xRoot] > rank[yRoot])
            parent[yRoot] = xRoot;
        else
        {
            parent[yRoot] = xRoot;
            rank[xRoot] += 1;
        }
    }

    public void Kruskals_Algorithm()
    {
        List<(int u, int v, int weight)> result = new List<(int, int, int)>();
        int i = 0;

        edges.Sort((a, b) => a.weight.CompareTo(b.weight));

        int[] parent = Enumerable.Range(0, size).ToArray();
        int[] rank = Enumerable.Repeat(0, size).ToArray();

        while (i < edges.Count)
        {
            var (u, v, weight) = edges[i];
            ++i;

            int x = Find(parent, u);
            int y = Find(parent, v);
            if (x != y)
            {
                result.Add((u, v, weight));
                Union(parent, rank, x, y);
            }
        }

        Console.WriteLine("Edge \tWeight");
        foreach (var (u, v, weight) in result)
        {
            Console.WriteLine($"{vertexData[u]}-{vertexData[v]} \t{weight}");
        }
    }
}