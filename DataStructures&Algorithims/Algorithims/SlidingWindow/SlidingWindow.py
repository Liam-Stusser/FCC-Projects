def maxSum(arr, k):
    #Get the length of the array
    n = len(arr)

    #n must be greater than k
    if(n <= k):
        print('Invalid')
        return -1
    
    #Get sum of first window size (index 0)
    window_sum = sum(arr[:k])
    #initialize max_sum so we can compare it later 
    max_sum = window_sum

    for i in range(n-k):
        window_sum = window_sum - arr[i] + arr[i + k] #Computes current sum by taking first element of previous window and 
        max_sum = max(window_sum, max_sum) #last element in current window, and subtracting/adding them to the current window sum

    return max_sum

if __name__ == "__main__":
    arr = [5, 2, -1, 0, 3]
    k = 3
    print(maxSum(arr, k))