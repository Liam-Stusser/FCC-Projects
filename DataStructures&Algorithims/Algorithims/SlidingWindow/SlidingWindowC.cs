class Program
{
    static int MaxSum(int[] arr, int k)
    {
        // Get the length of the array
        int n = arr.Length;

        // n must be greater than k
        if (n <= k)
        {
            Console.WriteLine("Invalid");
            return -1;
        }

        // Get sum of first window size (index 0)
        int window_sum = 0;
        for (int i = 0; i < k; i++)
        {
            window_sum += arr[i];
        }

        // initialize max_sum so we can compare it later
        int max_sum = window_sum;

        for (int i = 0; i < n - k; i++)
        {
            // Computes current sum by sliding the window
            window_sum = window_sum - arr[i] + arr[i + k];
            max_sum = Math.Max(window_sum, max_sum);
        }

        return max_sum;
    }

    static void Main()
    {
        int[] arr = { 5, 2, -1, 0, 3 };
        int k = 3;
        Console.WriteLine(MaxSum(arr, k));
    }
}