namespace Task9;

public static class Solution
{
    public static int[] Solve(int[] input)
    {
        if (input.Length == 0)
        {
            return Array.Empty<int>();
        }
        var result = new int[input.Length];
        var current = input[0];
        result[0] = current;
        for (var i = 1; i < input.Length; i++)
        {
            result[i] = result[i - 1] * input[i];
        }

        return result;
    }
}