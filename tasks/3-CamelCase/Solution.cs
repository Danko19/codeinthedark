using System.Text;

namespace Task3;

public static class Solution
{
    public static string Solve(string input)
    {
        if (input == "")
        {
            return "";
        }

        var result = new StringBuilder();
        foreach (var c in input)
        {
            if (char.IsUpper(c))
            {
                result.Append($"_{char.ToLower(c)}");
            }
            else
            {
                result.Append(c);
            }
        }

        return result.ToString();
    }
}