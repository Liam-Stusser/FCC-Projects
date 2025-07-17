#Data structure that takes in a value and creates a hash code for it-which determines where it should be placed
#in our list, we call each slot in the list a bucket.
#The data structure used to store the values in buckets does not need to be a list you can also create your own
#custom struct or something else to store the values.

#For all the python examples in the DSA section I'll keep the examples basic, while the JS and C# versions
#might contain more complexity.

class HashSet:
    
    def __init__(self,size):
        self.size = size
        self.buckets = [[] for _ in range(size)] #We are creating an array of arrays here, each array inside the parent array
        #is a single bucket, that can store whatever data we need in it.

    def hash_function(self, value):
        return sum(ord(char) for char in value) % len(self.buckets)
    #The hash function creates a numerical value from the data we are trying to add to our hash set, we need to mod it
    #by the length of the size of the set to find which bucket it will go in.
    #this allows us to generate a unique id for every bucket that we search it by, reducing search time to O(1) and O(n) worst case
    
    def add(self, value):
        index = self.hash_function(value)#The hashing algorithim above is a very basic hash function and has low entropy
        bucket = self.buckets[index]#you typically would want to use a more robust hashing algorithim that provides
        if value not in bucket:#high entropy to reduce collisions as your table starts to near capacity.
            bucket.append(value)
    
    def contains(self, value):
        index = self.hash_function(value)#most languages will have built in hash-sets or map, like dictionary in C#,
        bucket = self.buckets[index]#which contains a host of methods. One of the benefits to making your own hash table
        return value in bucket#is being able to make your own methods that might not be provided in the standard hash table.
    #The only thing though is the built in hash tables are highly optomized by a team of very smart developers, and your custom table
    #will most likely not be near as fast as the built in one.

    def remove(self,value):
        index = self.hash_function(value)
        bucket = self.buckets[index]
        if value in bucket:
            bucket.remove(value)

    def print_set(self):
        for index,bucket in enumerate(self.buckets):
            print(f'Bucket{index}: {bucket}')

#This is a very simple hash set example which can add a value into an array of array defined as buckets by getting a hash for our value
#which is known as the key, then storing the value in the bucket that matches the key

table = HashSet(15)

table.add('Frodo')
table.add('Sam')
table.add('Gandalf')
table.add('Pippin')
table.add('Merry')
table.remove('Gandalf')
table.print_set()
print(table.contains('Gandalf'))
table.add('Aragorn')
table.add('Gandalf')
table.add('Legolas')
table.add('Gimli')
table.add('Boromir')
table.add('Balrog')
table.remove('Gandalf')
table.remove('Balrog')
table.remove('Boromir')
table.print_set()

#you can see in the output of this example both Pippin and Aragorn land in the same bucket, this is normally known as a collision
#in open addressed hash tables, but for our hash set its okay since we are later going to implement each bucket to be a linked list.