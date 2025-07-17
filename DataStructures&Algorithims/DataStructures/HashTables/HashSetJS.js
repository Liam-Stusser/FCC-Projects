class HashSet
{
    constructor(size)
    {
        this.size = size;
        this.buckets = Array.from({length: size}, () => []);
    }

    hashFunction(value)
    {
        const index = [...value].map(char => char.charCodeAt(0)).reduce((a,b) => a + b,0);
        return index % this.size;
    }

    add(value)
    {
        const index = this.hashFunction(value);
        const bucket = this.buckets[index];

        if (!bucket.includes(value)) 
        {
            bucket.push(value);
            return true;
        }

        return false 
    }

    contains(value)
    {
        const index = this.hashFunction(value);
        const bucket = this.buckets[index];

        return bucket.includes(value)? true:false;
    }

    remove(value)
    {
        const index = this.hashFunction(value);
        const bucket = this.buckets[index];
        const i = bucket.indexOf(value)

        if(i === -1) return 'Value not found'

        bucket.splice(i,1)
        return true
    }

    printSet()
    {
        this.buckets.forEach((bucket, i) => {
            console.log(`Bucket ${i}: [${bucket.join(', ')}]`);
        });
    }
 }

 const table = new HashSet(15)

 table.add('a')
 table.add('b')
 table.add('c')
 table.add('d')
 table.add('e')
 table.add('f')
 table.add('g')
 console.log(table.remove('c'))
 console.log(table.contains('c'))
 console.log(table.contains('a'))
 console.log(table.remove('a'))
 console.log(table.contains('a'))
 table.printSet()