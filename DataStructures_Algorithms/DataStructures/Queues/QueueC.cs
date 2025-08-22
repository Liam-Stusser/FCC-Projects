public class Queue<T>
{
    private readonly T[] _queue;
    private int _front;
    private int _rear;
    private int _count;

    public Queue(int size)
    {
        _queue = new T[size];
        _front = 0;
        _rear = 0;
        _count = 0;
    }

    public bool Enqueue(T element)
    {
        if (_count == _queue.Length)
            return false;

        _queue[rear] = element;
        _rear = (_rear + 1) % _queue.Length;
        _count++;
        return true;
    }

    public T Dequeue()
    {
        if (IsEmpty())
            throw new InvalidOperationException("Queue is empty");

        T element = _queue[_front];
        _queue[_front] = default;
        _front = (_front + 1) % _queue.Length;
        _count--;

        return element;
        
    }

    public T Peek()
    {
        if (IsEmpty())
            throw new InvalidOperationException("Queue is empty");

        return _queue[_front];
    }

    public bool IsEmpty() => _count == 0;
    public bool IsFull() => _count == _queue.Length;
    public int Size() => _count;
}