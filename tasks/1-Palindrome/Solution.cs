using System.Text;

namespace Task1;

public static class Solution
{
    public static bool Solve(string input)
    {
        var normalized = new StringBuilder();
        foreach (var c in input.Where(char.IsLetterOrDigit))
        {
            normalized.Append(char.ToLowerInvariant(c));
        }

        var str = normalized.ToString();
        for (var i = 0; i < str.Length / 2; i++)
        {
            if (str[i] != str[str.Length - 1 - i])
            {
                return false;
            }
        }

        return true;
    }
}