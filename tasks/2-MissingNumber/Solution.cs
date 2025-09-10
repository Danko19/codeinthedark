using System.Text;

namespace Task2;

public static class Solution
{
    public static int Solve(int[] input)
    {
        if (input.Length == 0)
        {
            return -1;
        }

        for (var i = 1; i < input.Length; ++i)
        {
            if (input[i] - input[i - 1] > 1)
            {
                return input[i] - 1;
            }
        }

        return -1;
    }
}