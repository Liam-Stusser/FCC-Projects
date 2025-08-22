class HashMap
{
    constructor(size = 1000)
    {
        this.size = size;
        this.buckets = Array.from({length:size}, () => []);
    }

    #hashFunction(key)
    {
        const index = [...key].map(char => char.charCodeAt(0)).reduce((a,b) => a + b, 0);
        return index % this.size;
    }

    put([key,value])
    {
        const index = this.#hashFunction(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value; 
                return;
            }
        }

        bucket.push([key, value]); 
    }

    get(key)
    {
        const index = this.#hashFunction(key);
        const bucket = this.buckets[index];

        for (const [k, v] of bucket) {
            if (k === key) return v;
        }

        return null;
    }
}