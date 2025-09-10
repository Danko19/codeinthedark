namespace Task6;

public static class Solution
{
    public static string Solve(int input)
    {
        if (input % 15 == 0)
        {
            return "FizzBuzz";
        }

        if (input % 3 == 0)
        {
            return "Fizz";
        }

        if (input % 5 == 0)
        {
            return "Buzz";
        }

        return input.ToString();
    }
}