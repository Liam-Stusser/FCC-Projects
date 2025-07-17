public class Node<TValue>
{
    public TValue data;
    public Node<TValue> next;

    public Node(TValue data)
    {
        this.data = data;
        this.next = null;
    }
}

public class LinkedList<TValue>
{
    private Node<TValue> head;

    public LinkedList(Node<TValue> head)
    {
        this.head = head;
    }

    public string TraversePrint()
    {
        string result = "";
        Node<TValue> currentNode = head;

        while (currentNode != null)
        {
            result += currentNode.data + " -> ";
            currentNode = currentNode.next;
        }

        result += "null";
        return result;
    }

    public bool InsertNode(Node<TValue> node, int position)
    {
        if (position < 1)
            return false;

        if (position == 1)
        {
            node.next = head;
            head = node;
            return true;
        }

        Node<TValue> currentNode = head;
        for (int i = 0; i < position - 2; i++)
        {
            if (currentNode == null)
                return false;
            currentNode = currentNode.next;
        }

        if (currentNode == null)
            return false;

        node.next = currentNode.next;
        currentNode.next = node;

        return true;
    }

    public bool DeleteNode(Node<TValue> node)
    {
        if (node == null || head == null)
            return false;

        if (head == node)
        {
            head = head.next;
            return true;
        }

        Node<TValue> currentNode = head;
        while (currentNode.next != null && currentNode.next != node)
        {
            currentNode = currentNode.next;
        }

        if (currentNode.next == null)
            return false;

        currentNode.next = currentNode.next.next;
        return true;
    }
}
