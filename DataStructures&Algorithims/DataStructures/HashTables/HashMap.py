#Hash maps while similar to a hash set contain a key value pair in which we hash the key and use that to find our index
#then store the key and the value in our bucket in the form of a tuple, object, or custom struct or whatever we want.

class HashMap:
    
    def __init__(self, size = 1000):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def hash_function(self,key):
        return sum(ord(char) for char in key) % len(self.buckets)
    
    def put(self, key, value):
        index = self.hash_function(key)
        bucket = self.buckets[index]

        for i, (k,_) in enumerate(self.buckets):

            if k == key:
                bucket[i] = (key,value)
                return
            
            bucket.append((key,value))
        
    def get(self,key):
        index = self.hash_function(key)
        bucket = self.buckets[index]

        for k,v in bucket:
            if k == key:
                return v
            return None #Key not found
        
#Keep in mind these tables do not handle collisions, which is when the key of one value returns the same index as the key for
#a different value. If we hashed a key of 'Rob' and it came to equal 5 but then hashed a different key called 'Dale' and it
#also came to 5 we would get a collision. This happens because of the mod in the hash_function, eventually as our table fills up
#we will start to run into more and more collisions. This is why its important to have more robust hashing functions to provide 
#more entorpy or more randomness in our hashing to prevent more collisions, as the less collisions there are the faster our
#insert and retrival times will be. This only applys to open-addressed hash tables where we do not want to store multiple
#values in one bucket and do not want to reorder the values inside the table.