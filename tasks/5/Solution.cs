namespace Task5;

public static class Solution
{
    public static double Solve(int[] input)
    {
        if (input.Length == 0) return -1;
        var ordered = input.OrderBy(x => x).ToArray();
        return ordered.Length % 2 == 1
            ? ordered[ordered.Length / 2]
            : (double)(ordered[ordered.Length / 2 - 1] + ordered[ordered.Length / 2]) / 2;
    }
}