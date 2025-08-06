public class Node<TValue>
{
    public TValue data;
    public Node<TValue> left;
    public Node<TValue> right;
    public int height;

    public Node(TValue data)
    {
        this.data = data;
        left = null;
        right = null;
        height = 1;
    }
}

public class AVL<TValue> where TValue : IComparable<TValue>
{
    private Node<TValue> root;

    public AVL()
    {
        root = null;
    }

    private static int GetHeight(Node<TValue> node)
    {
        if (node == null)
            return 0;

        return node.height;
    }

    private int GetBalance(Node<TValue> node)
    {
        if (node == null)
            return 0;

        return GetHeight(node.left) - GetHeight(node.right);
    }

    private Node<TValue> RightRotate(Node<TValue> y)
    {
        Console.WriteLine($"Rotate right on node {y.data}");
        Node<TValue> x = y.left;
        Node<TValue> T2 = x.right;
        x.right = y;
        y.left = T2;
        x.height = 1 + Math.Max(GetHeight(x.left), GetHeight(x.right));
        y.height = 1 + Math.Max(GetHeight(y.left), GetHeight(y.right));
        return x;
    }

    private Node<TValue> LeftRotate(Node<TValue> x)
    {
        Console.WriteLine($"Rotate left on node {x.data}");
        Node<TValue> y = x.right;
        Node<TValue> T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = 1 + Math.Max(GetHeight(x.left), GetHeight(x.right));
        y.height = 1 + Math.Max(GetHeight(y.left), GetHeight(y.right));
        return y;
    }

    private Node<TValue> Insert(Node<TValue> node, TValue data)
    {
        if (node == null)
            return new Node<TValue>(data);

        if (data.CompareTo(node.data) < 0)
            node.left = Insert(node.left, data);
        else if (data.CompareTo(node.data) > 0)
            node.right = Insert(node.right, data);

        node.height = 1 + Math.Max(GetHeight(node.left), GetHeight(node.right));
        int balance = GetBalance(node);

        //LL
        if (balance > 1 && GetBalance(node.left) >= 0)
            return RightRotate(node);
        //LR
        if (balance > 1 && GetBalance(node.left) < 0)
        {
            node.left = LeftRotate(node.left);
            return RightRotate(node);
        }
        //RR
        if (balance < -1 && GetBalance(node.right) <= 0)
            return LeftRotate(node);
        //RL
        if (balance < -1 && GetBalance(node.right) > 0)
        {
            node.right = RightRotate(node.right);
            return LeftRotate(node);
        }

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

    public void PreOrderTraversal()
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

        if (target.CompareTo(node.data) == 0)
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
            return node;

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

            Node<TValue> temp = MinValueNode(node.right);
            node.data = temp.data;
            node.right = Delete(node.right, temp.data);
        }

        if (node == null)
            return node;

        node.height = 1 + Math.Max(GetHeight(node.left), GetHeight(node.right));
        int balance = GetBalance(node);

        //LL
        if (balance > 1 && GetBalance(node.left) >= 0)
            return RightRotate(node);
        //LR
        if (balance > 1 && GetBalance(node.left) < 0)
        {
            node.left = LeftRotate(node.left);
            return RightRotate(node);
        }
        //RR
        if (balance < -1 && GetBalance(node.right) <= 0)
            return LeftRotate(node);
        //RL
        if (balance < -1 && GetBalance(node.right) > 0)
        {
            node.right = RightRotate(node.right);
            return LeftRotate(node);
        }

        return node;
    }

    public void Delete(TValue data)
    {
        root = Delete(root, data);
    }
}