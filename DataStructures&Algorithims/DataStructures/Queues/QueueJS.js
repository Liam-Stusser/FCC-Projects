class Queue
{
    constructor()
    {
        this.queue = [];
    }

    enqueue(element)
    {
        this.queue.push(element);
    }

    dequeue()
    {
        return this.queue.shift();
    }

    peek()
    {
        if(this.isEmpty())
            return "Queue is empty";
        return this.queue[0];
    }

    isEmpty()
    {
        return this.queue.length === 0;
    }

    size()
    {
        return this.queue.length;
    }
}