public class Prim : GraphC
{
    public Prim() : base() { }

    public void PrimsAlgorithm()
    {
        bool[] inMst = Enumerable.Repeat(false, this.size).ToArray();
        double[] keyValues = Enumerable.Repeat(double.PositiveInfinity, this.size).ToArray();
        int[] parents = Enumerable.Repeat(-1, this.size).ToArray();
        keyValues[0] = 0;

        Console.WriteLine("Edge \tWeight");
        for (int _ = 0; _ < this.size; _++)
        {
            int u = Enumerable.Range(0, this.size).Where(v => !inMst[v]).Aggregate((s, v) => keyValues[v] < keyValues[s] ? v : s);

            inMst[u] = true;

            if (parents[u] != -1)
                Console.WriteLine($"{this.vertexData[parents[u]]}-{this.vertexData[u]} \t{this.adjMatrix[u][parents[u]]}");

            for (int v = 0; v < this.size; v++)
            {
                if (0 < this.adjMatrix[u][i] && this.adjMatrix[u][v] < keyValues[v] && !inMst[v])
                {
                    keyValues[v] = this.adjMatrix[u][v];
                    parents[v] = u;
                }
            }
        }
    }
}