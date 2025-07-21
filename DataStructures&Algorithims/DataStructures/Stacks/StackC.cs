/* An unsafe, high-performance implementation of a stack using a singly linked list stored in unmanaged memory.
This stack is optimized for single-threaded use and avoids GC pressure by allocating nodes on the unmanaged heap.
Warning:
- This stack is **not thread-safe**.
- It only supports **unmanaged types (where T : unmanaged)** — using reference types (e.g, string, object) may result
in crashes or undefined behavior due to the garbage collector relocating referenced objects.
- Manual memory management is required, you must call 'Dispose()' to avoid memory leaks.
 */
public unsafe class LinkedStack<T> : IDisposable where T : unmanaged
{
    private Node* top;
    private int count;

    private struct Node
    {
        public T Value;
        public Node* next;
    }

    public LinkedStack()
    {
        top = null;
        count = 0;
    }

    [MethodImpl(MethodimplOptions.AggressiveInlining)]
    public void Push(T value)
    {
        Node* node = (Node*)NativeMemory.AllocZeroed((nuint)sizeof(Node));
        node->Value = value;
        node->next = top;
        top = node;
        count++;
    }

    [MethodImpl(MethodimplOptions.AggressiveInlining)]
    public T Pop()
    {
        if (IsEmpty())
            throw new InvalidOperationException("Stack is empty");

        T value = top->Value;
        Node* next = top->next;
        NativeMemory.Free(top);
        top = next;
        count--;
        return value;
    }

    [MethodImpl(MethodimplOptions.AggressiveInlining)]
    public T Peek()
    {
        if (IsEmpty())
            throw new InvalidOperationException("Stack is empty");
        return top->Value;
    }

    [MethodImpl(MethodimplOptions.AggressiveInlining)]
    public bool IsEmpty() => top == null;

    public int Count => count;

    public void Dispose()
    {
        while (!IsEmpty())
            Pop();
    }
}