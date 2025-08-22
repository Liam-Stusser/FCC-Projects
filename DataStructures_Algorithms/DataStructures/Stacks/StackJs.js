class Stack
{
    constructor()
    {
        this.stack = [];
    }

    push(element)
    {
        this.stack.push(element);
    }

    pop()
    {
        this.isEmpty()? "Stack is empty" : this.stack.pop();
    }

    peek()
    {
        return this.isEmpty()? "Stack is empty" : this.stack[this.stack.length - 1];
    }

    isEmpty()
    {
        return this.stack.length === 0;
    }

    length()
    {
        return this.stack.length;
    }
}
