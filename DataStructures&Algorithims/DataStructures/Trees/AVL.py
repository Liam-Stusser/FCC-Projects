class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
        self.height = 1

class AVL:
    def getHeight(node):
        if not node:
            return 0
        
        return node.height
    
    def getBalance(self, node):
        if not node:
            return 0
        
        return self.getHeight(node.left) - self.getHeight(node.right)
    
    def rightRotate(self, y):
        print('Rotate right on node', y.data)
        x = y.left
        T2 = x.right
        x.right = y
        y.left = T2
        y.height = 1 + max(self.getHeight(y.left), self.getHeight(y.right))
        x.height = 1 + max(self.getHeight(x.left), self.getHeight(x.right))
        return x
    
    def leftRotate(self, x):
        print('Rotate left on node',x.data)
        y = x.right
        T2 = y.left
        y.left = x
        x.right = T2
        x.height = 1 + max(self.getHeight(x.left), self.getHeight(x.right))
        y.height = 1 + max(self.getHeight(y.left), self.getHeight(y.right))
        return y
    
    def insert(self, node, data):
        if not node:
            return Node(data)
        
        if data < node.data:
            node.left = self.insert(node.left, data)
        elif data > node.data:
            node.right = self.insert(node.right, data)

        #Update balance factor and balance the tree
        node.height = 1 + max(self.getHeight(node.left), self.getHeight(node.right))
        balance = self.getBalance(node)

        #LL
        if balance > 1 and self.getBalance(node.left) >= 0:
            return self.rightRotate(node)
        
        #LR
        if balance > 1 and self.getBalance(node.left) < 0:
            node.left = self.leftRotate(node.left)
            return self.rightRotate(node)
        
        #RR
        if balance < -1 and self.getBalance(node.right) <= 0:
            return self.leftRotate(node)
        
        #RL
        if balance < -1 and self.getBalance(node.right) > 0:
            node.right = self.rightRotate(node.right)
            return self.leftRotate(node)
        
        return node
    
    def inOrderTraversal(self, node):
        if node is None:
            return
        self.inOrderTraversal(node.left)
        print(node.data, end = ', ')
        self.inOrderTraversal(node.right)

    #Delete methods
    def minValueNode(self, node):
        current = node
        while current.left is not None:
            current = current.left
        return current
    
    def delete(self, node, data):
        if not node:
            return node
        
        if data < node.data:
            node.left = self.delete(node.left, data)
        elif data > node.data:
            node.right = self.delete(node.right, data)

        else:
            if node.left is None:
                temp = node.right
                node = None
                return temp
            
            elif node.right is None:
                temp = node.left
                node = None
                return temp
            
            temp = self.minValueNode(node.right)
            node.data = temp.data
            node.right = self.delete(node.right, temp.data)
        
        if node is None:
            return node
        
        #updata balance factors and balance tree
        node.height = 1 + max(self.getHeight(node.left), self.getHeight(node.right))
        balance = self.getBalance(node)

        #LL
        if balance > 1 and self.getBalance(node.left) >= 0:
            return self.rightRotate(node)
        
        #LR
        if balance > 1 and self.getBalance(node.left) < 0:
            node.left = self.leftRotate(node.left)
            return self.rightRotate(node)

        #RR
        if balance < -1 and self.getBalance(node.right) <= 0:
            return self.leftRotate(node)

        #RL
        if balance < -1 and self.getBalance(node.right) > 0:
            node.right = self.rightRotate(node.right)
            return self.leftRotate(node)

        return node 