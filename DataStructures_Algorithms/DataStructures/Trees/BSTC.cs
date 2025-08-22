public class Node<TValue>
{
    public TValue data;
    public Node<TValue> left;
    public Node<TValue> right;

    public Node(TValue data)
    {
        this.data = data;
        left = null;
        right = null;
    }
}

public class BST<TValue> where TValue : IComparable<TValue>
{
    private Node<TValue> root;

    public BST()
    {
        root = null;
    }

    private Node<TValue> Insert(Node<TValue> node, TValue data)
    {
        if (node == null)
            return new Node<TValue>(data);

        if (data.CompareTo(node.data) < 0)
            node.left = Insert(node.left, data);
        else if (data.CompareTo(node.data) > 0)
            node.right = Insert(node.right, data);

        return node;
    }

    public void Insert(TValue data)
    {
        root = Insert(root, data);
    }

    private void PreOrderTraversal(Node<TValue> node)
    {
        if (node == null)
            return;

        Console.Write($"{node.data}, ");
        PreOrderTraversal(node.left);
        PreOrderTraversal(node.right);
    }

    public void PreOrderTraversal() //public override method so user does not have to pass root manually
    {
        PreOrderTraversal(root);
        Console.WriteLine();
    }

    private void InOrderTraversal(Node<TValue> node)
    {
        if (node == null)
            return;

        InOrderTraversal(node.left);
        Console.Write($"{node.data}, ");
        InOrderTraversal(node.right);
    }

    public void InOrderTraversal()
    {
        InOrderTraversal(root);
        Console.WriteLine();
    }

    private void PostOrderTraversal(Node<TValue> node)
    {
        if (node == null)
            return;

        PostOrderTraversal(node.left);
        PostOrderTraversal(node.right);
        Console.Write($"{node.data}, ");
    }

    public void PostOrderTraversal()
    {
        PostOrderTraversal(root);
        Console.WriteLine();
    }

    private Node<TValue> Search(Node<TValue> node, TValue target)
    {
        if (node == null)
            return null;

        if (node.data == target)
            return node;
        else if (target.CompareTo(node.data) < 0)
            return Search(node.left, target);
        else
            return Search(node.right, target);
    }

    public Node<TValue> Search(TValue target)
    {
        return Search(root, target);
    }

    private static Node<TValue> MinValueNode(Node<TValue> node)
    {
        Node<TValue> current = node;

        while (current.left != null)
            current = current.left;

        return current;
    }

    private static Node<TValue> MaxValueNode(Node<TValue> node)
    {
        Node<TValue> current = node;

        while (current.right != null)
            current = current.right;

        return current;
    }

    private Node<TValue> Delete(Node<TValue> node, TValue data)
    {
        if (node == null)
            return null;

        if (data.CompareTo(node.data) < 0)
            node.left = Delete(node.left, data);
        else if (data.CompareTo(node.data) > 0)
            node.right = Delete(node.right, data);
        else
        {
            if (node.left == null)
            {
                Node<TValue> temp = node.right;
                node = null;
                return temp;
            }

            else if (node.right == null)
            {
                Node<TValue> temp = node.left;
                node = null;
                return temp;
            }

            node.data = MinValueNode(node.right).data;
            node.right = Delete(node.right, node.data);
        }

        return node;
    }

    public void Delete(TValue data)
    {
        root = Delete(root, data);
    }
}