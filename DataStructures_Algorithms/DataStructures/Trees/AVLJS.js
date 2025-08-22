class Node
{
    constructor(data)
    {
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVL
{
    getHeight(node)
    {
        if(!node)
            return 0;

        return node.height;
    }

    getBalance(node)
    {
        if(!node)
            return 0;

        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    rightRotate(y)
    {
        console.log("Rotate right on node", y.data);
        let x = y.left;
        let T2 = x.right;
        x.right = y;
        y.left = T2;
        x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
        y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
        return x;
    }

    leftRotate(x)
    {
        console.log("Rotate left on node", x.data);
        let y = x.right;
        let T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
        y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
        return y;
    }

    insert(node, data)
    {
        if(!node)
            return new Node(data);

        if(data < node.data)
            node.left = this.insert(node.left, data);
        else if(data > node.data)
            node.right = this.insert(node.right, data);

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        let balance = this.getBalance(node);

        //LL
        if(balance > 1 && this.getBalance(node.left) >= 0)
            return this.rightRotate(node);

        //LR
        if(balance > 1 && this.getBalance(node.left) < 0)
        {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        //RR
        if(balance < -1 && this.getBalance(node.right) <= 0)
            return this.leftRotate(node);

        //RL
        if(balance < -1 && this.getBalance(node.right) > 0)
        {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        //honestly a switch statement might have been better for this
        return node;
    }

    inOrderTraversal(node)
    {
        if(!node)
            return;

        this.inOrderTraversal(node.left);
        console.log(`${node.data}, `);
        this.inOrderTraversal(node.right);
    }

    minValueNode(node)
    {
        let current = node;
        while(current.left !== null)
            current = current.left;

        return current;
    }

    delete(node, data)
    {
        if(!node)
            return node;

        if(data < node.data)
            node.left = this.delete(node.left, data);
        else if(data > node.data)
            node.right = this.delete(node.right, data);
        else
        {
            if(!node.left)
            {
                let temp = node.right;
                node = null;
                return temp;
            }
            else if(!node.right)
            {
                let temp = node.left;
                node = null;
                return temp;
            }

            let temp = this.minValueNode(node.right);
            node.data = temp.data;
            node.right = this.delete(node.right, temp.data);
        }

        if(!node)
            return node;

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        let balance = this.getBalance(node);

        //LL
        if(balance > 1 && this.getBalance(node.left) >= 0)
            return this.rightRotate(node);

        //LR
        if(balance > 1 && this.getBalance(node.left) < 0)
        {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        //RR
        if(balance < -1 && this.getBalance(node.right) <= 0)
            return this.leftRotate(node);

        //RL
        if(balance < -1 && this.getBalance(node.right) > 0)
        {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        //honestly a switch statement might have been better for this
        return node;
    }
}