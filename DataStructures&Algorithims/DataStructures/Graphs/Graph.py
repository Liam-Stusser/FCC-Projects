class Graph:
    def __init__(self, size):
        self.adj_matrix = [[None] * size for _ in range(size)]
        self.size = size
        self.vertex_data = [''] * size
        self.parent = [i for i in range(size)] #Union-Find array

    def add_edge(self, u, v, weight):
        if 0 <= u < self.size and 0 <= v < self.size:
            self.adj_matrix[u][v] = weight

    def add_vertex_data(self, vertex, data):
        if 0 <= vertex < self.size:
            self.vertex_data[vertex] = data

    def find(self, i):
        if self.parent[i] != i:
            self.parent[i] = self.find(self.parent[i])  
        return self.parent[i]

    def print_graph(self):
        print("Adjacency Matrix")
        for row in self.adj_matrix:
            print(''.join(map(lambda x: str(x) if x is not None else '0', row)))
        print("\nVertex Data:")
        for vertex, data in enumerate(self.vertex_data):
            print(f"Vertex {vertex}: {data}")
    
    #Search methods
    def dfs_util(self, v, visited):
        visited[v] = True
        print(self.vertex_data[v], end = ' ')

        for i in range(self.size):
            if self.adj_matrix[v][i] == 1 and not visited[i]:
                self.dfs_util(i, visited)
    
    def cyclic_util(self, v, visited, recStack):
        visited[v] = True
        recStack[v] = True
        print("Current vertex:",self.vertex_data[v])

        for i in range(self.size):
            if self.adj_matrix[v][i] == 1:
                if not visited[i]:
                    if self.cyclic_util(i, visited, recStack):
                        return True
                elif recStack[i]:
                    return True
        
        recStack[v] = False
        return False
    
    def dfs_cyclic(self):
        visited = [False] * self.size
        recStack = [False] * self.size
        for i in range(self.size):
            if not visited[i]:
                print()
                if self.cyclic_util(i, visited, recStack):
                    return True
        return False

    def dfs(self, start_vertex_data):
        visited = [False] * self.size
        start_vertex = self.vertex_data.index(start_vertex_data)
        self.dfs_util(start_vertex, visited)

    def bfs(self, start_vertex_data):
        queue = [self.vertex_data.index(start_vertex_data)]
        visited = [False] * self.size
        visited[queue[0]] = True

        while queue:
            current_vertex = queue.pop(0)
            print(self.vertex_data[current_vertex], end = ' ')

            for i in range(self.size):
                if self.adj_matrix[current_vertex][i] == 1 and not visited[i]:
                    queue.append(i)
                    visited[i] = True
    
    #These methods apply only to undirected graphs for Union-Find below, which this graph is directed but added here for educational purposes
    def union(self, x, y):
        x_root = self.find(x)
        y_root = self.find(y)
        print('Union', self.vertex_data[x], '+', self.vertex_data[y])
        self.parent[x_root] = y_root
        print(self.parent, '\n')

    def union_cyclic(self):
        for i in range(self.size):
            for j in range(i, self.size):
                if self.adj_matrix[i][j]:
                    x = self.find(i)
                    y = self.find(j)
                    if x == y:
                        return True
                    self.union(x, y)
        return False
    
g = Graph(4)
g.add_vertex_data(0,'A')
g.add_vertex_data(1,'B')
g.add_vertex_data(2,'C')
g.add_vertex_data(3,'D')
g.add_edge(0, 1, 3) # A -> B with weight 3
g.add_edge(0, 2, 2) # A -> C with weight 2
g.add_edge(3, 0, 4) # D -> A with weight 4
g.add_edge(2, 1, 1) # C -> B with weight 1