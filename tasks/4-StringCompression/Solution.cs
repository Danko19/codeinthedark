using System.Text;

namespace Task4;

public static class Solution
{
    public static string Solve(string input)
    {
        if (input == "")
        {
            return "";
        }
        var currentSymbol = input[0];
        var count = 1;
        var result = new StringBuilder();
        for (var i = 1; i < input.Length; i++)
        {
            if (input[i] == currentSymbol)
            {
                count++;
            }
            else
            {
                result.Append($"{currentSymbol}{Compress(count)}");
                currentSymbol = input[i];
                count = 1;
            }
        }
        result.Append($"{currentSymbol}{Compress(count)}");
        return result.ToString();
    }

    private static string Compress(int count) => count > 1 ? count.ToString() : string.Empty;
}