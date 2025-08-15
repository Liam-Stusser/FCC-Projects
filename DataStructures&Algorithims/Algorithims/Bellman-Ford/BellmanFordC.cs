public class BellmanFord : GraphC
{
    public BellmanFord() : base()
    {
    }

    public (bool hasNegativeCycle, double[] distances, int?[] predecessors) BellmanFordAlgorithm(string startVertexData)
    {
        int startVertex = vertexData.IndexOf(startVertexData);
        double[] distances = new double[size];
        int?[] predecessors = new int?[size];

        for (int i = 0; i < size; i++)
        {
            distances[i] = double.PositiveInfinity;
            predecessors[i] = null;
        }

        distances[startVertex] = 0;

        for (int _ = 0; _ < size - 1; _++)
        {
            for (int u = 0; u < size; u++)
            {
                for (int v = 0; v < size; v++)
                {
                    if (adjMatrix[u, v] != 0)
                    {
                        if (distances[u] + adjMatrix[u, v] < distances[v])
                        {
                            distances[v] = distances[u] + adjMatrix[u, v];
                            predecessors[v] = u;
                            Console.WriteLine($"Relaxing edge {vertexData[u]}->{vertexData[v]}, Updated distance to {vertexData[v]}: {distances[v]}");
                        }
                    }
                }
            }

            // Negative cycle detection
            for (int u = 0; u < size; u++)
            {
                for (int v = 0; v < size; v++)
                {
                    if (adjMatrix[u, v] != 0)
                    {
                        if (distances[u] + adjMatrix[u, v] < distances[v])
                        {
                            return (true, null, null); // Indicate there is a negative cycle
                        }
                    }
                }
            }
            return (false, distances, predecessors); // No negative cycle found
        }

        // Just in case loop ends without return
        return (false, distances, predecessors);
    }

    public string GetPath(int?[] predecessors, string startVertex, string endVertex)
    {
        List<string> path = new List<string>();
        int current = vertexData.IndexOf(endVertex);

        while (current != -1 && current != null)
        {
            path.Insert(0, vertexData[current]);
            current = predecessors[current] ?? -1;
            if (current == vertexData.IndexOf(startVertex))
            {
                path.Insert(0, startVertex);
                break;
            }
        }

        return string.Join("->", path);
    }
}