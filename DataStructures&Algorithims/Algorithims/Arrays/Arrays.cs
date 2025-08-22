using System;
using System.Linq;
public class Program
{
    public static void Main(string[] args)
    {
        //Arrays are a type of data strucutre used to store multiple elements
        //int[] array = new int[100] creates a new array in C#, the 100 determines how mnay elements we can store in the array
        //Arrays are indexed, so each element in the array is tied to a numeric value usually starting with index 0 for the first element
        //array = {3,7,8,20,4} sets the first 5 elements, to access one we do array[0] which returns 3
        //The example below will show a basic array algorithm demonstarting how to search through an array for a specfic value
        int[] myArray = { 7, 12, 9, 9, 4, 11, 11, 7, 12, 18, 9 }; //Alternative way to declare an array and usually more accepted in C# this way
        int[] copy;

        copy = (int[])myArray.Clone();
        ArrayAlgorithms.FindMin(copy);
        copy = (int[])myArray.Clone();
        ArrayAlgorithms.BubbleSort(copy);
        copy = (int[])myArray.Clone();
        ArrayAlgorithms.SelectionSort(copy);
        copy = (int[])myArray.Clone();
        ArrayAlgorithms.InsertionSort(copy);
        copy = (int[])myArray.Clone();
        ArrayAlgorithms.QuickSort(copy, 0, copy.Length - 1);
        Console.WriteLine("QuickSort: " + string.Join(", ", copy)); //Due to the recursive calls its best to write to the console here
        copy = (int[])myArray.Clone();
        ArrayAlgorithms.CountingSort(copy);
        copy = (int[])myArray.Clone();
        ArrayAlgorithms.RadixSort(copy);
        copy = (int[])myArray.Clone();
        Console.WriteLine("MergeSort: " + string.Join(", ", ArrayAlgorithms.MergeSort(copy)));
        ArrayAlgorithms.LinearSearch(myArray, 18);
        ArrayAlgorithms.BinarySearch(copy, 18);

        
    }
}

public static class ArrayAlgorithms
{
    // Finds the minimum value in an array
    //The time complexity for something like this would be around O(n) since we have to iterate over every element at least once
    //Where n is the amount of elements in the array, this could range anywhere from 1-infinite items in an array
    public static void FindMin(int[] array)
    {
        int minVal = array[0];

        for (int i = 0; i < array.Length; i++)
        {
            if (minVal > array[i])
                minVal = array[i];
        }
        Console.WriteLine("Minimum value: " + minVal);
    }

    //Bubble Sort
    //The time complexity for this algorithm is O(n^2), we have two for loops that checks one element to every element in front of it
    //moving it up to the other ones spot ahead of it if it is greater.
    public static void BubbleSort(int[] array)
    {
        for (int i = 0; i < array.Length - 1; i++)
        {
            for (int j = 0; j < array.Length - i - 1; j++)
            {
                if (array[j] > array[j + 1])
                {
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        Console.WriteLine("BubbleSort: " + string.Join(", ", array));
    }

    //Selection Sort
    //Similar to bubble sort this algorithm holds the index of where the smallest value is, then scans through the array to see 
    //if there is a smaller value then swap the values. Time complexity is O((n/2) * n) = O(n^2) like Bubble sort
    public static void SelectionSort(int[] array)
    {
        for (int i = 0; i < array.Length - 1; i++)
        {
            int minIndex = i;
            for (int j = i + 1; j < array.Length; j++)
            {
                if (array[j] < array[minIndex])
                    minIndex = j;
            }
            (array[i], array[minIndex]) = (array[minIndex], array[i]); //Tuple swap, if you have not seen before does the same thing 
            //as above with the temp value under the hood but, just looks a little cleaner syntactically
        }
        Console.WriteLine("SelectionSort: " + string.Join(", ", array));
    }

    //Insertion Sort
    //Maintains track of the value we are trying to sort and starts at the value behind it then travels left down the array back to index 0
    //moving any value greater than it to the right of it or up the chain. Time complexity is the same as Selection Sort at O(n^2)
    public static void InsertionSort(int[] array)
    {
        for (int i = 1; i < array.Length; i++)
        {
            int currentValue = array[i];
            int j = i - 1;

            while (j >= 0 && array[j] > currentValue)
            {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = currentValue;
        }
        Console.WriteLine("InsertionSort: " + string.Join(", ", array));
    }

    //Quick Sort
    //This method is more complicated than the other methods as it involves a parition method to help us sort the values but, as its name
    //implies it is faster than the other methods provided above. The partition method can be seen just below the quick sort method.
    //This algorithm takes a value as its pivot point and moves other values to the left or right of it depending on if they are 
    //less than/equal to or greater than the pivot point respectively. We then check if the index of our low point is less than the index 
    //of our high point, and recursively call the quick sort method till low index = high index meaning the array is sorted.
    //Time complexity for this worst case is O(n^2) when the pivot element is the highest or lowest value in the array which leads to alot of
    //recursive calls. On average though we get a time complexity of O(n*log(n)), which is much better than the previous algorithms.
    public static void QuickSort(int[] array, int low, int high)
    {
        if (low < high)
        {
            int pi = Partition(array, low, high);

            QuickSort(array, low, pi - 1); //Recursively sort left side
            QuickSort(array, pi + 1, high); //Recursively sort right side
        }
    }
    //Partition/helper method
    private static int Partition(int[] array, int low, int high)
    {
        int pivot = array[high]; //Choose last element as pivot value
        int i = low - 1;

        for (int j = low; j < high; j++)
        {
            if (array[j] <= pivot)
            {
                i++;//i works as a sort of fence we can move to choose where to pivot values
                (array[i], array[j]) = (array[j], array[i]);
            }
        }
        //Move pivot into the correct place, this runs once
        (array[i + 1], array[high]) = (array[high], array[i + 1]);
        return i + 1; //Return the index of our pivot 
    }

    //Counting Sort
    //This algorithm is used on integers only and only non-negative so x >= 0 where x is any number in the array. It first finds the maximum
    //value in an array and creates a seperate array containing an amount of slots equal to the max number, so if the max number is 100
    //we have a sub-array with 100 slots or index 0-99. We then scan through the array and each instance of a number we find increases the
    //value stored in the subarray at that index by 1. So if we come across the number 11 in our main array we go subArray[11] += 1.
    //Finally we construct one last array an element array and add one instance of the indexs weight for each count increment stored in it.
    //So if subarray[11] = 3 we would add 3 11's to our element array [11,11,11]. 
    //Time complexity for this method depends on the range of possible values k and the number of values n but, in general we get O(n+k) 
    //In a best case scenario if k is small we get O(n) but worst case is O(n^2) or possibly even worse.
    public static void CountingSort(int[] array)
    {
        int maxValue = array.Max();
        int[] subArray = new int[maxValue + 1];
        List<int> elements = new List<int>();

        for (int i = 0; i < array.Length; i++)
            subArray[array[i]] += 1;

        for (int j = 0; j < subArray.Length; j++)
        {
            while (subArray[j] > 0)
            {
                elements.Add(j);
                subArray[j] -= 1;
            }
        }
        Console.WriteLine("CountingSort: " + string.Join(", ", elements));
    }

    //Radix Sort
    //One of the more unique methods involves shifting the values in an array between another 2 dimensional array and back to the original.
    //It looks at the numbers at each decimal position and sorts the numbers based on the first decimal position then, back to the
    //first array and repeats this for each decimal position in the number. This means we do have to find the largest value number in the
    //start array though. Time complexity for this algorithm is similar to counting sort at O(n+k) on average and worst case O(n^2).
    public static void RadixSort(int[] array)
    {
        int maxVal = array.Max();
        int exp = 1;

        while (maxVal / exp > 0)
        {
            //Create "buckets" for each digit 0-9
            List<int>[] buckets = new List<int>[10];
            for (int i = 0; i < 10; i++)
                buckets[i] = new List<int>();

            //place each number into the correct bucket
            foreach (int val in array)
            {
                int radixIndex = (val / exp) % 10;
                buckets[radixIndex].Add(val);
            }

            //Collect numbers back into the array
            int idx = 0;
            for (int i = 0; i < 10; i++)
            {
                foreach (int val in buckets[i])
                {
                    array[idx++] = val;
                }
            }

            exp *= 10;
        }

        Console.WriteLine("RadixSort: " + string.Join(", ", array));
    }

    //Merge Sort
    //Involves splitting the array in half until we get to just one value left then we merge each half and combine them back together
    //until we get a fully sorted array. This is normally done recursively which we do here but can be done wihtout recursion.
    //The time complexity for this algorithm is O(n * log(n)) for any array in all scenarios making it a safe consistent choice for sorting.
    public static int[] MergeSort(int[] array)
    {
        if (array.Length <= 1)
            return array;

        int mid = array.Length / 2;
        int[] left = array[..mid];
        int[] right = array[mid..];

        int[] sortedLeft = MergeSort(left);
        int[] sortedRight = MergeSort(right);

        return Merge(sortedLeft, sortedRight);
    }

    //Merge Sort helper method
    private static int[] Merge(int[] left, int[] right)
    {
        int[] result = new int[left.Length + right.Length];
        int i = 0;
        int j = 0;
        int k = 0;

        while (i < left.Length && j < right.Length)
        {
            if (left[i] < right[j])
                result[k++] = left[i++];
            else
                result[k++] = right[j++];
        }

        while (i < left.Length)
            result[k++] = left[i++];
        while (j < right.Length)
            result[k++] = right[j++];

        return result;
    }

    //Linear Search
    //Perhaps the most basic method, it searches through each value in the array until it finds it, if it is not located it returns -1
    //Time complexity for this search is simply O(n) in all scenarios.
    public static void LinearSearch(int[] array, int target)
    {
        int index = -1;
        for (int i = 0; i < array.Length; i++)
        {
            if (array[i] == target)
                index = i;
        }

        if (index > -1)
            Console.WriteLine($"LinearSearch: value({target}) found at index({index})");
        else
            Console.WriteLine($"LinearSearch: Value not found({index})");
    }

    //Binary Search
    //This searching algorithm only works on arrays that are already sorted but is much faster than linear search, as it involves cutting the
    //array into halves. We pick the middle point of the array, check its value if it is greater than the target we go left and if it is lower
    //than the target we search right, picking the middle point of the left or right side and repeat this till we find our target value.
    //This results in a time complexity of O(log_2(n)), which is a significant improvement over O(n).
    public static void BinarySearch(int[] array, int target)
    {
        int left = 0;
        int right = array.Length - 1;

        while (left <= right)
        {
            int mid = (left + right) / 2;

            if (array[mid] == target)
            {
                Console.WriteLine($"BinarySearch: value({target}) found at index({mid})");
                return;
            }

            else if (array[mid] < target)
                left = mid + 1;

            else
                right = mid - 1;
        }
        Console.WriteLine($"BinarySearch: Value not found(-1)");
    }
}