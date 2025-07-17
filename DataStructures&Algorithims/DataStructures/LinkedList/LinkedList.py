class Node:

    def __init__(self,data):
        self.data = data
        self.next = None

    def traversePrint(head):
        currentNode = head
        while currentNode:
            print(currentNode.data, end =" -> ")
            currentNode = currentNode.next
        print("null")

    def insertNodeAt(head, newNode, position):

        if position == 1:
            newNode.next = head
            return newNode
        
        currentNode = head
        for _ in range(position - 2): #finds what node we need to insert next to based on the given position
            if currentNode is None:
                break
            currentNode = currentNode.next
        
        newNode.next = currentNode.next
        currentNode.next = newNode
        return head
    
    def deleteNode(self, head, nodeToDelete):

        if head == nodeToDelete:
            return head.next
        
        currentNode = head
        while currentNode.next and currentNode.next != nodeToDelete:
            currentNode = currentNode.next
        
        if currentNode.next is None:
            return head
        
        currentNode.next = currentNode.next.next

        return head