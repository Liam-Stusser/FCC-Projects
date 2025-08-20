function maxSum(arr, k) 
{
    // Get the length of the array
    let n = arr.length;

    // n must be greater than k
    if (n <= k) 
    {
        console.log("Invalid");
        return -1;
    }

    // Get sum of first window size (index 0)
    let window_sum = 0;
    for (let i = 0; i < k; i++) 
    {
        window_sum += arr[i];
    }

    // initialize max_sum so we can compare it later
    let max_sum = window_sum;

    for (let i = 0; i < n - k; i++) 
    {
        // Computes current sum by sliding the window
        window_sum = window_sum - arr[i] + arr[i + k];
        max_sum = Math.max(window_sum, max_sum);
    }

    return max_sum;
}

// Example usage
let arr = [5, 2, -1, 0, 3];
let k = 3;
console.log(maxSum(arr, k));