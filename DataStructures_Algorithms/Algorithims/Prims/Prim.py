from DataStructures.Graphs.Graph import Graph

class Prim(Graph):
    def __init__(self, size):
        super().__init__(size)

    def prims_algorithim(self):
        in_mst = [False] * self.size
        key_values = [float('inf')] * self.size 
        parents = [-1] * self.size 
        key_values[0] = 0

        print("Edge \tWeight")
        for _ in range(self.size):
            u = min((v for v in range(self.size) if not in_mst[v]), key = lambda v: key_values[v])

            in_mst[u] = True

            if parents[u] != -1: #Skip printing for the first vertex since it has no parent
                print(f"{self.vertex_data[parents[u]]}-{self.vertex_data[u]} \t{self.adj_matrix[u][parents[u]]}")

            for v in range(self.size):
                if 0 < self.adj_matrix[u][v] < key_values[v] and not in_mst[v]:
                    key_values[v] = self.adj_matrix[u][v]
                    parents[v] = u
