public class Dijkstra : GraphC
{
    public Dijkstra() : base() { }

    public (double[] distances, string path) DijkstraMethod(string startVertexData, string endVertexData)
    {
        int startVertex = Array.IndexOf(this.vertexData, startVertexData);
        int endVertex = Array.IndexOf(this.vertexData, endVertexData);
        double[] distances = Enumerable.Repeat(double.PositiveInfinity, this.size).ToArray();
        int?[] predecessors = new int?[this.size];
        distances[startVertex] = 0;
        bool[] visited = Enumerable.Repeat(false, this.size).ToArray();

        for (int _ = 0; _ < this.size; _++)
        {
            double minDistance = double.PositiveInfinity;
            int u = 0;
            for (int i = 0; i < this.size; i++)
            {
                if (!visited[i] && distances[i] < minDistance)
                {
                    minDistance = distances[i];
                    u = i;
                }
            }

            if (u == -1 || u == endVertex)
            {
                Console.WriteLine($"Breaking out of loop. Current vertex {this.vertexData[u]}");
                Console.WriteLine($"Distances: {distances}");
                break;
            }

            visited[u] = true;
            Console.WriteLine($"Visited vertex: {this.vertexData[u]}");

            for (int v = 0; v < this.size; v++)
            {
                if (this.adjMatrix[u][v] != 0 && !visited[v])
                {
                    double alt = distances[u] + this.adjMatrix[u][v];
                    if (alt < distances[v])
                    {
                        distances[v] = alt;
                        predecessors[v] = u;
                    }
                }
            }
        }
        return (distances, GetPath(predecessors, startVertexData, endVertexData));
    }

    public string GetPath(string[] predecessors, string startVertex, string endVertex)
    {
        List<string> path = new List<string>();
        int? current = Array.IndexOf(this.vertexData, endVertex);
        while (current != null)
        {
            path.Insert(0, this.vertexData[current]);
            current = predecessors[current];
            if (current == Array.IndexOf(this.vertexData, startVertex))
            {
                path.Insert(0, startVertex);
                break;
            }
        }
        return string.Join("->", path);
    }
}