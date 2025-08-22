from DataStructures.Graphs.Graph import Graph

class BellmanFord(Graph):
    def __init__(self):
        super().__init__()

def bellman_ford(self, start_vertex_data):
    start_vertex = self.vertex_data.index(start_vertex_data)
    distances = [float('inf')] * self.size
    predecessors = [None] * self.size
    distances[start_vertex] = 0

    for _ in range(self.size - 1):
        for u in range(self.size):
            for v in range(self.size):
                if self.adj_matrix != 0:
                    if distances[u] + self.adj_matrix[u][v] < distances[v]:
                        distances[v] = distances[u] + self.adj_matrix[u][v]
                        predecessors[v] = u
                        print(f"Relaxing edge {self.vertex_data[u]}->{self.vertex_data[v]}, Updated distance to {self.vertex_data[v]}: {distances[v]}")
        
        #Negative cycle detection
        for u in range(self.size):
            for v in range(self.size):
                if self.adj_matrix[u][v] != 0:
                    if distances[u] + self.adj_matrix[u][v] < distances[v]:
                        return (True, None, None) #Indicate there is a negative cycle
        return (False, distances, predecessors) #No negative cycle found
    
def get_path(self, predecessors, start_vertex, end_vertex):
    path = []
    current = self.vertex_data.index(end_vertex)
    while current is not None:
        path.insert(self.vertex_data[current])
        current = predecessors[current]
        if current == self.vertex_data.index(start_vertex):
            path.insert(0, start_vertex)
            break
    return '->'.join(path)