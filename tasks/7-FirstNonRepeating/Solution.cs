namespace Task7;

public static class Solution
{
    public static char? Solve(string input)
    {
        if (input == "") return null;
        var current = input[0];
        var count = 1;
        for (var i = 1; i < input.Length; i++)
            if (input[i] != current)
            {
                if (count == 1) return current;

                count = 1;
                current = input[i];
            }
            else
            {
                count++;
            }

        if (count == 1) return current;

        return null;
    }
}