public class HashMap<TKey, TValue>
{
    private struct Entry
    {
        public TKey Key;
        public TValue Value;
        public bool IsOccupied;
    }

    private readonly Entry[] entries;
    private readonly int size;

    public HashMap(int size = 1000)
    {
        this.size = size;
        entries = new Entry[size];
    }

    private int HashFunction(TKey key)
    {
        return (key.GetHashCode() & 0x7fffffff) % size;
    }

    public bool TryGetValue(TKey key, out TValue value)
    {
        int index = HashFunction(key);
        for (int i = 0; i < size; i++)
        {
            int probeIndex = (index + i) % size;
            var entry = entries[probeIndex];

            if (!entry.IsOccupied)
                break;

            if (EqualityComparer<TKey>.Default.Equals(entry.Key, key))
            {
                value = entry.Value;
                return true;
            }
        }

        value = default!;
        return false;
    }

    public void Put(TKey key, TValue value)
    {
        int index = HashFunction(key);
        for (int i = 0; i < size; i++)
        {
            int probeIndex = (index + i) % size;
            ref var entry = ref entries[probeIndex];

            if (!entry.IsOccupied || EqualityComparer<TKey>.Default.Equals(entry.Key, key))
            {
                entry.Key = key;
                entry.Value = value;
                entry.IsOccupied = true;
                return;
            }
        }

        throw new InvalidOperationException("HashMap is full");
    }

    public TValue this[TKey key]
    {
        get
        {
            if (TryGetValue(key, out var value))
                return value;

            throw new KeyNotFoundException($"Key not found: {key}");
        }

        set => Put(key, value);
    }
}