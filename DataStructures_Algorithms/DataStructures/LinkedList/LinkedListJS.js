class Node
{
    constructor(data)
    {
        this.data = data;
        this.next = null;
    }

    traversePrint(head)
    {
        let currentNode = head;

        let result = "";
        while (currentNode) 
        {
            result += currentNode.data + " -> ";
            currentNode = currentNode.next;
        }

        console.log(result + "null");
    }

    insertNodeAt(head, newNode, position)
    {
        if(position === 1)
        {
            newNode.next = head;
            return newNode;
        }

        let currentNode = head;
        for(let i = 0; i < position -2; i++)
        {
            if(currentNode === null)
                break;
            currentNode = currentNode.next;
        }

        newNode.next = currentNode.next;
        currentNode.next = newNode;
        return head;
    }

    deleteNode(head, nodeToDelete)
    {
        if (head === nodeToDelete)
            return head.next;

        let currentNode = head;
        while(currentNode.next && currentNode.next !== nodeToDelete)
            currentNode = currentNode.next;

        if (currentNode.next === null)
            return head;

        currentNode.next = currentNode.next.next;

        return head;
    }
}