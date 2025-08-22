class Node
{
    constructor(data)
    {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BST
{
    constructor()
    {
        this.root = null;
    }

    #_insert(node, data)
    {
        if(!node)
            return new Node(data);

        if(data < node.data) 
            this.insert(node.left, data) 
        else if(data > node.data) 
            this.insert(node.right, data);

        return node
    }

    insert(data)
    {
        this.root = this.#_insert(this.root, data);
    }

    preOrderTraversal(node)
    {
        if(!node)
            return

        console.log(`${node.data}, `);
        this.preOrderTraversal(node.left);
        this.preOrderTraversal(node.right);
    }

    inOrderTraversal(node)
    {
        if(!node)
            return

        this.inOrderTraversal(node.left);
        console.log(`${node.data}, `)
        this.inOrderTraversal(node.right);
    }

    postOrderTraversal(node)
    {
        if(!node)
            return

        this.postOrderTraversal(node.left);
        this.postOrderTraversal(node.right);
        console.log(`${node.data}, `);
    }

    #_search(node, target)
    {
        if(node === null)
            return null;

        else if(node === target)
            return node;

        else
            target < node.data? this.#_search(node.left, target) : this.#_search(node.right, target);
    }

    search(target)
    {
        return this.#_search(this.root, target)
    }

    minValueNode(node)
    {
        let current = node;

        while(node.left !== null)
            current = node.left;

        return current;
    }

    maxValueNode(node)
    {
        let current = node;

        while(!node.right)
            current = node.right;

        return current;
    }

    delete(node, data)
    {
        if(!node)
            return null;

        if(data < node.data)
            node.left = this.delete(node.left, data);
        else if(data > node.data)
            node.right = this.delete(node.right, data);
        else
        {
            if(!node.left)
            {
                let temp = node.right;
                node = null
                return temp;
            }
            else if(!node.right)
            {
                let temp = node.left;
                node = null;
                return temp;
            }

            node.data = this.minValueNode(node.right).data
            node.right = this.delete(node.right, node.data);
        }
        return node;
    }
}