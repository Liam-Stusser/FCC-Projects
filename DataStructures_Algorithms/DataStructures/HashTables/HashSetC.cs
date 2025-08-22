public class HashSet<TValue>
{
    private int size;
    private readonly List<TValue>[] buckets;

    public HashSet(int size)
    {
        this.size = size;
        this.buckets = new List<TValue>[size];
        for (int i = 0; i < size; i++)
            buckets[i] = new List<TValue>();
    }

    private int GetHash(TValue value)
    {
        return (value.GetHashCode() & 0x7fffffff) % size; //Little bit-masking used here to provide more entropy
    }

    public bool Add(TValue value)
    {
        int index = GetHash(value);
        List<TValue> bucket = buckets[index];
        if (!bucket.Contains(value))
        {
            bucket.Add(value);
            return true;
        }
        throw new ArgumentException($"{value} failed to add"); //You can normally just return false here, but I throw an error here for fun
    }

    public bool Contains(TValue value)
    {
        int index = GetHash(value);
        List<TValue> bucket = buckets[index];
        if (bucket.Contains(value))
            return true;
        return false;
    }

    public bool Remove(TValue value)
    {
        int index = GetHash(value);
        List<TValue> bucket = buckets[index];
        if (bucket.Contains(value))
        {
            bucket.Remove(value);
            return true;
        }
        return false;
    }

    public void PrintSet()
    {
        for (int i = 0; i < buckets.Length; i++)
        {
            var bucket = buckets[i];
            Console.WriteLine($"Bucket {i}: [{string.Join(", ", bucket)}]");
        }
    }
}

public class Program
{
    public static void main(string[] args)
    {
        HashSet<string> table = new HashSet<string>(15);
        table.Add('a');
        table.Add('b');
        table.Add('c');
        table.Add('d');
        table.Add('e');
        table.PrintSet();
        table.Contains('a');
        table.Remove('b');
        table.Contains('b');
        table.PrintSet();
    }
}
