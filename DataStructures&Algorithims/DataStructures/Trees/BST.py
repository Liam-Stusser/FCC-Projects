class Node:

    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

    def __str__(self):
        return str(self.data)
    
class BST:

    def __init__(self):
        self.root = None

    def _insert(self, node, data):
        if node is None:
            return Node(data)
        
        if data < node.data:
            node.left = self._insert(node.left, data)
        elif data > node.data:
            node.right = self._insert(node.right, data)
        
        return node
    
    def insert(self,data):
        self.root = self._insert(self.root, data)

    def preOrderTraversal(self, node):
        if node is None:
            return
        
        print(node.data, end = ', ')
        self.preOrderTraversal(node.left)
        self.preOrderTraversal(node.right)

    def inOrderTraversal(self, node):
        if node is None:
            return
        
        self.inOrderTraversal(node.left)
        print(node.data, end = ', ')
        self.inOrderTraversal(node.right)
    
    def postOrderTraversal(self, node):
        if node is None:
            return
        
        self.postOrderTraversal(node.left)
        self.postOrderTraversal(node.right)
        print(node.data, end = ', ')
    
    def _search(self,node, target):
        if node is None:
            return None
        
        elif node.data == target:
            return node
        elif target < node.data:
            return self._search(node.left, target)
        else:
            return self._search(node.right, target)
    
    def search(self, target):
        return self._search(self.root, target)
    
    def minValueNode(self, node):
        current = node
        while current.left is not None:
            current = current.left
        return current
    
    def maxValueNode(self): #Not necessarily needed but could be a useful search function if you want to see the current max value
        current = self.root
        while current.right is not None:
            current = current.right
        return current
    
    def delete(self, node, data):
        if not node:
            return None
        
        if data < node.data:
            node.left = self.delete(node.left, data)
        elif data > node.data:
            node.right = self.delete(node.right, data)
        
        else: #Node has only 1 child or no children
            if not node.left:
                temp = node.right
                node = None
                return temp
            
            elif not node.right:
                temp = node.left
                node = None
                return temp
            
            node.data = self.minValueNode(node.right).data
            node.right = self.delete(node.right, node.data)

        return node